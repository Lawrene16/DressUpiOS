import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  galleryitems = [];
  errorMessage: string = '';
  tempgalleryitems = [];
  firestore;
  



  firedata = firebase.database().ref('/Users').child(firebase.auth().
  currentUser.uid).child('gallery');


  // firestore = firebase.database().ref('/Users').child(firebase.auth().
  // currentUser.uid).child('gallery');

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public authData: AuthProvider,
    public actionSheetCtrl: ActionSheetController,
     public navParams: NavParams) {

    this.getGallery();

  }

  deleteCloth(i){
    this.tempgalleryitems = [];

    this.firedata.once('value', (snapshot) => {
      let eachitem = snapshot.val();

      for (var item in eachitem){
        this.tempgalleryitems.push(eachitem[item]);
      }

      console.log(this.tempgalleryitems[i].imageuid);

      this.firedata.child(this.tempgalleryitems[i].imageuid).remove().then((res) =>{

        this.galleryitems.splice(i, 1);

        this.firestore = firebase.storage().ref().child(firebase.auth().
        currentUser.uid).child('collection').child(this.tempgalleryitems[i].clothType)
        .child(this.tempgalleryitems[i].imageuid+'.jpg').delete().then((res) =>{
          
          console.log("Removal complete");

        }).catch((err) =>{
          this.errorMessage = err.message;
          console.log(this.errorMessage);
        });

      }).catch((err) =>{
          this.errorMessage = err.message;
          console.log(this.errorMessage);
      });
  });

  console.log(i);

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


  logoutEmail(){
    this.authData.logoutUser().then((res) =>{
      this.navCtrl.setRoot(LoginPage);
    }),(err) =>{
      this.errorMessage = err.message;
    };
  }

  getGallery(){

    let load = this.loadingCtrl.create({
      content:'Loading your gallery....',
    });
    load.present();

    this.firedata.orderByChild('uid').once('value', (snapshot) => {
      let result = snapshot.val();
      for (var key in result){
        this.galleryitems.push(result[key]);
      }

      load.dismiss();

      // console.log(this.galleryitems);

  });

  }
}
