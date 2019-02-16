import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FileChooser } from '@ionic-native/file-chooser';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { LoginPage } from '../login/login';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {


  nativepath: any;
  firestore = firebase.storage();
  imgsource: any;
  errorMessage: string = '';
  firedata = firebase.database().ref('/Users').child(firebase.auth().
  currentUser.uid).child('gallery');
  uidforimage;
  // dressType;
  seconddate;
  dressType = "T-Shirts";
  myDate: String = new Date().toISOString();
  imgurl = "";
  imageblob;
  forSunny = "no";
  forCloudy = "no";
  forRainy = "no";
  forSnowy = "no";
  sunnyiconsize: string = '35px';
  cloudyiconsize: string = '35px';
  rainyiconsize: string = '35px';
  snowyiconsize: string = '35px';



  constructor(public navCtrl: NavController, 
    public imgHandler: ImghandlerProvider,
    public actionSheetCtrl: ActionSheetController,
    public filechooser: FileChooser,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public authData: AuthProvider,
    public navParams: NavParams) {

      console.log(this.myDate);
      this.seconddate = this.myDate.replace("T", " ");

  }

  changeiconsize(icon){
    if(icon == 0){
      if(this.sunnyiconsize == '16px'){
        this.forSunny = "no";
        this.sunnyiconsize = '35px';
      }else{
        this.forSunny = "yes";
        this.sunnyiconsize = '16px';
      }
    }
    else if(icon == 1){
      if(this.rainyiconsize == '16px'){
        this.forRainy = "no";
        this.rainyiconsize = '35px';
      }else{
        this.forRainy = "yes";
        this.rainyiconsize = '16px';
      }
    }
    else if(icon == 2){
      if(this.cloudyiconsize == '16px'){
        this.forCloudy = "no";
        this.cloudyiconsize = '35px';
      }else{
        this.forCloudy = "yes";
        this.cloudyiconsize = '16px';
      }
    }
    else if(icon == 3){
      if(this.snowyiconsize == '16px'){
        this.forSnowy = "no";
        this.snowyiconsize = '35px';
      }else{
        this.forSnowy = "yes";
        this.snowyiconsize = '16px';
      }
    }
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

  peformUpload(){
    if(this.dressType == null){
      console.log(this.dressType);
      this.presentToast('Please select cloth category');
    }else if(this.forSunny == "no" && this.forRainy == "no" && this.forCloudy == "no" && this.forSnowy == "no"){
      this,this.presentToast('Please select preffered weather');
    }

    else{

      let load = this.loadingCtrl.create({
        content:'Loading your gallery....',
      });
      load.present();
  

      this.uidforimage = this.firedata.child(this.dressType).push().key;


      var imageStore = this.firestore.ref('/'+firebase.auth().currentUser.uid).
      child('collection').child(this.dressType).child(this.uidforimage+'.jpg');

      imageStore.put(this.imageblob).then((res) =>{
        this.firestore.ref('/'+firebase.auth().currentUser.uid).child('collection').child(this.dressType).child(this.uidforimage+'.jpg').getDownloadURL().then((url) =>{
          this.presentToast(url);


          
          this.firedata.child(this.uidforimage).set(
            {
              clothType: this.dressType,
              forCloudy: this.forCloudy,
              forRainy: this.forRainy,
              forSnowy: this.forSnowy,
              forSunny: this.forSunny,
              imageuid: this.uidforimage,
              url: url,
              timestamp: this.seconddate
            }

            
          ).then((res) =>{
            load.dismiss();
            console.log('updated');
          }).catch((err) =>{
            this.errorMessage = err.message;
            console.log(this.errorMessage);
          });


        }).catch((err) =>{
          this.presentToast(err);
        });
      }).catch((err) =>{
        this.presentToast('Upload failed' + err)  ;
      })

    }
    
  }


  choosefromgallery(){
      var promise = new Promise((resolve, reject) =>{
        this.filechooser.open().then((url) =>{
          (<any>window).FilePath.resolveNativePath(url, (result) =>{
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) =>{
              res.file((resFile) =>{
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) =>{


                  this.imgurl = "https://pbs.twimg.com/media/DUFbk2cV4AAwl2v.jpg";

                  var imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'});


                  this.imageblob = imgBlob;
                }
              })
            })
          })
        })
      })
      return promise;
  
  }


  presentToast(mess) {
    let toast = this.toastCtrl.create({
      message: mess,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


}
