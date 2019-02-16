import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the CollectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CollectionProvider {

  firedata = firebase.database().ref('/Users').child(firebase.auth().
  currentUser.uid).child('gallery');
  
  constructor() {
    console.log("");
  }

  getallusers(){
    return new Promise((resolve, reject) =>{
      this.firedata.orderByChild('mjbmmn').once('value', (snapshot) => {
        let result = snapshot.val();
        let temparr = [];
        for (var key in result){
          temparr.push(result[key]);
        }
        resolve(temparr);

        console.log(temparr.length);
    }).catch((err) =>{
      reject(err);
    });
    })
  }
}
