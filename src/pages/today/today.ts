import { Component, EventEmitter } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

@Component({
  selector: 'page-today',
  templateUrl: 'today.html'
})
export class TodayPage {
firedata = firebase.database().ref('/Users').child(firebase.auth().
  currentUser.uid).child('gallery');
  galleryitems = [];
  options : GeolocationOptions;
  currentPos : Geoposition;

  allurls = [];
  topurls = [];
  bottomurls = [];
  topready = false;
  bottomready = false;
  errorMessage: string = '';
  topattendants = [];
  bottomattendants = [];
  topcardDirection = "xy";
  bottomcardDirection = "xy";
  topcardOverlay: any = {
      like: {
          backgroundColor: '#28e93b'
      },
      dislike: {
          backgroundColor: '#e92828'
      }
  };
  bottomcardOverlay: any = {
    like: {
        backgroundColor: '#28e93b'
    },
    dislike: {
        backgroundColor: '#e92828'
    }
};

  topimages=["https://media.vogue.in/wp-content/uploads/2017/12/2017-01-2-disha-patani-hairstyles-makeup-vogue-india.jpg",
 "https://spiderimg.amarujala.com/assets/images/2017/11/06/750x506/anushka-shetty_1509948439.jpeg",
  "http://static.dnaindia.com/sites/default/files/styles/full/public/2018/02/04/648069-rakul-preet-singh.jpg",
"https://pbs.twimg.com/profile_images/928946397436506113/6QE6iLb7.jpg",
"https://pbs.twimg.com/media/DUFbk2cV4AAwl2v.jpg",
"https://qph.fs.quoracdn.net/main-qimg-980a13410f56739c66864b89c4466263-c",
"http://starsvilla.com/wp-content/uploads/2017/09/19425346_145774522639533_5306252787913326592_n.jpg",
"https://i1.wp.com/akmatter.com/wp-content/uploads/2018/01/Rakul-Preet-Singh.jpg",
"https://data1.ibtimes.co.in/cache-img-600-450/en/full/571296/1494666323_anushka-shetty-baahubali.jpg"
]

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
  
constructor(private sanitizer: DomSanitizer,
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public authData: AuthProvider,
    private geolocation : Geolocation,
    // public gLocation: GeolocationOriginal,
    public loadingCtrl: LoadingController) {
    // start the loader



    this.getLocation();



    let load = this.loadingCtrl.create({
        content:'Suggesting clothes for today....',
      });
      load.present();

    //   Fetch them from firebase
    this.firedata.orderByChild('uid').on('value', (snapshot) => {
        let result = snapshot.val();
        for (var key in result){
          this.galleryitems.push(result[key]);
        }
        for(var i in this.galleryitems){
            if(this.galleryitems[i].clothType == "T-Shirts" || 
            this.galleryitems[i].clothType == "Shirts" || 
            this.galleryitems[i].clothType == "Coats" || 
            this.galleryitems[i].clothType == "Jackets"){
            this.topurls.push(this.galleryitems[i].url);
            }
            else{
                this.bottomurls.push(this.galleryitems[i].url); 
            }
        }
        load.dismiss();

        // Load them into the frontend
        for (let i = 0; i < this.topurls.length; i++) {
            this.topattendants.push({
                id: i + 1,
                likeEvent: new EventEmitter(),
                destroyEvent: new EventEmitter(),
                asBg: sanitizer.bypassSecurityTrustStyle('url('+this.topurls[i]+')')
            });
        }
        for (let i = 0; i < this.bottomurls.length; i++) {
          this.bottomattendants.push({
              id: i + 1,
              likeEvent: new EventEmitter(),
              destroyEvent: new EventEmitter(),
              asBg: sanitizer.bypassSecurityTrustStyle('url('+this.bottomurls[i]+')')
          });
      }
        this.topready = true;
        this.bottomready = true;

    });
  }

  getUserPosition(){
    this.options = {
        enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;      
        console.log(pos);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });
}


  onCardInteract(event) {
    console.log(event);
  }

  refreshOptions(){
      
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


}