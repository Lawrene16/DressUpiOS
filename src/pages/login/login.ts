import { Component } from '@angular/core';
import { IonicPage, NavController, 
  NavParams,LoadingController,
  ToastController,
  Loading,
  AlertController, } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = "";
  password: string = "";
  public loading:Loading;
  errorMessage: string = '';


  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public authData: AuthProvider,
    public afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logUserIn(){
    this.authData.loginUser(this.email, this.password)
    .then( authData => {
      this.navCtrl.setRoot(TabsPage);
    }, error => {
      alert(error.message);
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }


  signUpUser(){
    this.authData.signupUser(this.email, this.password)
    .then(() => {
      this.navCtrl.setRoot(TabsPage);
    }, (error) => {
      this.loading.dismiss().then( () => {
        var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

  tryGoogleLogin(){
    this.authData.doGoogleLogin()
    .then((res) => {
      this.navCtrl.push(TabsPage);
    }, (err) => {
      this.errorMessage = err.message;
      this.presentToast(this.errorMessage);
    });
  }

  // tryFacebookLogin(){
  //   this.authData.doFacebookLogin()
  //   .then((res) => {
  //     this.navCtrl.push(TabsPage);
  //   }, (err) => {
  //     this.errorMessage = err.message;
  //     this.presentToast(this.errorMessage);
  //   });
  // }

  tryTwitterLogin(){
    this.authData.doTwitterLogin()
    .then((res) => {
      this.navCtrl.push(TabsPage);
    }, (err) => {
      this.errorMessage = err.message;
      this.presentToast(this.errorMessage);
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}