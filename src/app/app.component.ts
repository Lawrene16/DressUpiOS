import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { UploadPage } from '../pages/upload/upload';
import { LoginPage } from '../pages/login/login';
import { GalleryPage } from '../pages/gallery/gallery';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar,
    afAuth: AngularFireAuth,
     splashScreen: SplashScreen) {

      const authObserver = afAuth.authState.subscribe( user => {
        if (user) {
          // this.rootPage = UploadPage;
          this.rootPage = TabsPage;
          authObserver.unsubscribe();
        } else {
          this.rootPage = LoginPage;
          authObserver.unsubscribe();
        }
      });
      

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
