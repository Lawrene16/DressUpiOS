import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
// import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { TwitterConnect } from '@ionic-native/twitter-connect';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  errorMessage: string = '';
  listCardsAdventure = [{'title':'mytitle1'}, {'title':'mytitle1'}, {'title':'mytitle1'}, {'title':'mytitle1'}];
  galleryitems = [];
  collectionurls = [];


  firedata = firebase.database().ref('/Users').child(firebase.auth().
  currentUser.uid).child('gallery');



bottomimages=["https://media.vogue.in/wp-content/uploads/2017/12/2017-01-2-disha-patani-hairstyles-makeup-vogue-india.jpg",
"https://spiderimg.amarujala.com/assets/images/2017/11/06/750x506/anushka-shetty_1509948439.jpeg",
 "http://static.dnaindia.com/sites/default/files/styles/full/public/2018/02/04/648069-rakul-preet-singh.jpg",
"https://pbs.twimg.com/profile_images/928946397436506113/6QE6iLb7.jpg",
"https://pbs.twimg.com/media/DUFbk2cV4AAwl2v.jpg",
"https://qph.fs.quoracdn.net/main-qimg-980a13410f56739c66864b89c4466263-c",
"http://starsvilla.com/wp-content/uploads/2017/09/19425346_145774522639533_5306252787913326592_n.jpg",
"https://i1.wp.com/akmatter.com/wp-content/uploads/2018/01/Rakul-Preet-Singh.jpg",
"https://data1.ibtimes.co.in/cache-img-600-450/en/full/571296/1494666323_anushka-shetty-baahubali.jpg"
]

  constructor(public navCtrl: NavController,
    // public facebook: Facebook,
    public authData: AuthProvider,
    public loadingCtrl: LoadingController,
    public tw: TwitterConnect,
    public actionSheetCtrl: ActionSheetController) {


      this.collectionurls = this.bottomimages;
        // load.dismiss();

        // console.log(this.collectionurls);
  
    // });


  }




  

  openModal(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to logout',
      buttons: [
        {
          text: 'Logout',
          role: 'destructive',
          handler: () => {
            // this.logoutFacebook();
            this.logoutEmail();
            // this.logoutTwitter();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();

  }

  // logoutFacebook(){
  //   this.facebook.getLoginStatus().then( data=>{
  //     if (data.status =='connected'){
  //       this.facebook.logout();
  //     }
  //     else{
  //       console.log("Not connected");
  //     }
  //   }
  // )
  // }

  logoutEmail(){
    this.authData.logoutUser().then((res) =>{
      this.navCtrl.setRoot(LoginPage);
    }),(err) =>{
      this.errorMessage = err.message;
    };
  }

  logoutTwitter(){
    this.tw.logout().then((res) =>{
      this.navCtrl.setRoot(LoginPage);
    }),((err) =>{
      this.errorMessage = err.message;
      console.log(this.errorMessage);
    });
  }

}
