import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { File } from '@ionic-native/file';
// import { FilePath } from '@ionic-native/file-path';
import {ToastController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';




@Injectable()
export class ImghandlerProvider {
 
  nativepath: any;
  firestore = firebase.storage();
  imgsource: any;
   
  constructor(public filechooser: FileChooser, public toastCtrl: ToastController) {
  }


  uploadimage(dressType, imageuid){
    var promise = new Promise((resolve, reject) =>{
      this.filechooser.open().then((url) =>{
        (<any>window).FilePath.resolveNativePath(url, (result) =>{
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) =>{
            res.file((resFile) =>{
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) =>{
                var imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'});
                var imageStore = this.firestore.ref('/'+firebase.auth().currentUser.uid).
                child('collection').child(dressType).child(imageuid+'.jpg');
                // this.presentToast('Image getting success');
                imageStore.put(imgBlob).then((res) =>{
                  this.presentToast('blob putting success');
                  this.firestore.ref('/'+firebase.auth().currentUser.uid).child('collection').child(dressType).child(imageuid+'.jpg').getDownloadURL().then((url) =>{
                    resolve(url);
                  }).catch((err) =>{
                    this.presentToast(err);
                    reject(err);
                  });
                }).catch((err) =>{
                  this.presentToast('Upload failed' + err)  ;
                  reject(err);
                })
              }
            })
          })
        })
      })
    })
    return promise;
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
