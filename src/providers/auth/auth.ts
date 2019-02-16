import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
//import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth,
     public googlePlus: GooglePlus,
     //public fb: Facebook,
     public tw: TwitterConnect,
     public platform: Platform) {
    console.log('Hello AuthProvider Provider');
  }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

  doGoogleLogin(){
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.googlePlus.login({
          'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          'webClientId': '186608457698-eadrse8j8upa331edgf7cgqtak4m7vo9.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': true
        }).then((response) => {
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(response.idToken);
          firebase.auth().signInWithCredential(googleCredential)
          .then((user) => {
            resolve();
          });
        },(err) => {
          reject(err);
        });
      }
      else{
        this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((user) => {
           resolve()
        },(err) => {
         reject(err);
       })
      }
    })
  }

//  doFacebookLogin(){
  //  return new Promise((resolve, reject) => {
    //  if (this.platform.is('cordova')) {
        //["public_profile"] is the array of permissions, you can add more if you need
      //  this.fb.login(["public_profile"])
        //.then((response) => {
          //const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
          //firebase.auth().signInWithCredential(facebookCredential)
            //.then(user => resolve());
 //       }, err => reject(err)
   //     );
     // }
//      else {
  //      this.afAuth.auth
    //    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      //  .then((user) => {
   //       resolve()
     //  },(err) => {
       //   reject(err);
       // });

     // }
    //})
  //}

  doTwitterLogin(){
    return new Promise((resolve, reject) => {
      // if we are in a mobile device we use the twitter native plugin

      if (this.platform.is('cordova')) {
        this.tw.login()
          .then((response) => {
            const twitterCredential = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);
            firebase.auth().signInWithCredential(twitterCredential)
            .then(
              user => resolve(),
              error => reject(error)
            );
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
      }
      else {
        this.afAuth.auth
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then((user) => {
          resolve()
       },(err) => {
          reject(err);
        })
      }
    })
  }

}
