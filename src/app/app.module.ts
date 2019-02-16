import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SwipeCardsModule } from 'ng2-swipe-cards';
import { FileChooser } from '@ionic-native/file-chooser';
import { HomePage } from '../pages/home/home';
import { TodayPage } from '../pages/today/today';
import { UploadPage } from '../pages/upload/upload';
import { GalleryPage } from '../pages/gallery/gallery';
import { TabsPage } from '../pages/tabs/tabs';
import { GooglePlus } from '@ionic-native/google-plus';
// import { Facebook } from '@ionic-native/facebook';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { CollectionProvider } from '../providers/collection/collection';


var firebaseconfig = {
  apiKey: "AIzaSyDymoC3gqeLLnuBvcCABg-YM8qLl94V5f4",
  authDomain: "dressup-102d1.firebaseapp.com",
  databaseURL: "https://dressup-102d1.firebaseio.com",
  projectId: "dressup-102d1",
  storageBucket: "dressup-102d1.appspot.com",
  messagingSenderId: "186608457698"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TodayPage,
    LoginPage,
    UploadPage,
    GalleryPage,
    TabsPage
  ],
  
  imports: [
    BrowserModule,
    SwipeCardsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TodayPage,
    UploadPage,
    GalleryPage,
    HomePage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    FileChooser,
    TwitterConnect,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ImghandlerProvider,
    CollectionProvider,
  ]
})
export class AppModule {}
