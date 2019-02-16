webpackJsonp([4],{

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__today_today__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__upload_upload__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gallery_gallery__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__today_today__["a" /* TodayPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__upload_upload__["a" /* UploadPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__gallery_gallery__["a" /* GalleryPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/lawrene/DressUpiOs/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Today" tabIcon="ios-timer"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Upload" tabIcon="ios-camera"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Gallery" tabIcon="ios-images"></ion-tab>\n</ion-tabs>\n                       '/*ion-inline-end:"/home/lawrene/DressUpiOs/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GalleryPage = /** @class */ (function () {
    // firestore = firebase.database().ref('/Users').child(firebase.auth().
    // currentUser.uid).child('gallery');
    function GalleryPage(navCtrl, loadingCtrl, authData, actionSheetCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authData = authData;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navParams = navParams;
        this.galleryitems = [];
        this.errorMessage = '';
        this.tempgalleryitems = [];
        this.firedata = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/Users').child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().
            currentUser.uid).child('gallery');
        this.getGallery();
    }
    GalleryPage.prototype.deleteCloth = function (i) {
        var _this = this;
        this.tempgalleryitems = [];
        this.firedata.once('value', function (snapshot) {
            var eachitem = snapshot.val();
            for (var item in eachitem) {
                _this.tempgalleryitems.push(eachitem[item]);
            }
            console.log(_this.tempgalleryitems[i].imageuid);
            _this.firedata.child(_this.tempgalleryitems[i].imageuid).remove().then(function (res) {
                _this.galleryitems.splice(i, 1);
                _this.firestore = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.storage().ref().child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().
                    currentUser.uid).child('collection').child(_this.tempgalleryitems[i].clothType)
                    .child(_this.tempgalleryitems[i].imageuid + '.jpg').delete().then(function (res) {
                    console.log("Removal complete");
                }).catch(function (err) {
                    _this.errorMessage = err.message;
                    console.log(_this.errorMessage);
                });
            }).catch(function (err) {
                _this.errorMessage = err.message;
                console.log(_this.errorMessage);
            });
        });
        console.log(i);
    };
    GalleryPage.prototype.openModal = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Are you sure you want to logout',
            buttons: [
                {
                    text: 'Logout',
                    role: 'destructive',
                    handler: function () {
                        // this.logoutFacebook();
                        _this.logoutEmail();
                        // this.logoutTwitter();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    GalleryPage.prototype.logoutEmail = function () {
        var _this = this;
        this.authData.logoutUser().then(function (res) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        }), function (err) {
            _this.errorMessage = err.message;
        };
    };
    GalleryPage.prototype.getGallery = function () {
        var _this = this;
        var load = this.loadingCtrl.create({
            content: 'Loading your gallery....',
        });
        load.present();
        this.firedata.orderByChild('uid').once('value', function (snapshot) {
            var result = snapshot.val();
            for (var key in result) {
                _this.galleryitems.push(result[key]);
            }
            load.dismiss();
            // console.log(this.galleryitems);
        });
    };
    GalleryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-gallery',template:/*ion-inline-start:"/home/lawrene/DressUpiOs/src/pages/gallery/gallery.html"*/'<ion-header>\n  <ion-navbar>\n    <p align="center"><ion-title>DressUp!</ion-title></p> \n    <ion-buttons end>\n        <button ion-button icon-only (click)="openModal()">\n          <ion-icon name="options" color="light"></ion-icon>\n        </button>\n\n      </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="appbody">\n  <br>\n  <br>\n  <br>\n\n  <ion-list>\n      <ion-card class="gallerycard" *ngFor="let cloth of galleryitems; let i= index">\n            <div>\n                <div class="galleryimagestyle">\n                    <img class="imageof" src="{{cloth.url}}">                    \n                </div>\n\n                <div class="seconddiv">\n\n                    <div class="toptextdiv">\n                        <b style="font-size:16px; margin-top: 20px;">{{cloth.clothType}}</b>\n                        <br>\n                        <br>\n\n                        <p>Added : {{cloth.timestamp}}</p>\n                    </div>\n\n                    <div class="bottomButtonDiv">\n                       <button class="gallerybutton" ion-button (click)="deleteCloth(i)">Delete</button>\n                    </div>\n                </div>\n            </div>\n      </ion-card>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/lawrene/DressUpiOs/src/pages/gallery/gallery.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], GalleryPage);
    return GalleryPage;
}());

//# sourceMappingURL=gallery.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_chooser__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_imghandler_imghandler__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UploadPage = /** @class */ (function () {
    function UploadPage(navCtrl, imgHandler, actionSheetCtrl, filechooser, toastCtrl, loadingCtrl, authData, navParams) {
        this.navCtrl = navCtrl;
        this.imgHandler = imgHandler;
        this.actionSheetCtrl = actionSheetCtrl;
        this.filechooser = filechooser;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authData = authData;
        this.navParams = navParams;
        this.firestore = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.storage();
        this.errorMessage = '';
        this.firedata = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.database().ref('/Users').child(__WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth().
            currentUser.uid).child('gallery');
        this.dressType = "T-Shirts";
        this.myDate = new Date().toISOString();
        this.imgurl = "";
        this.forSunny = "no";
        this.forCloudy = "no";
        this.forRainy = "no";
        this.forSnowy = "no";
        this.sunnyiconsize = '35px';
        this.cloudyiconsize = '35px';
        this.rainyiconsize = '35px';
        this.snowyiconsize = '35px';
        console.log(this.myDate);
        this.seconddate = this.myDate.replace("T", " ");
    }
    UploadPage.prototype.changeiconsize = function (icon) {
        if (icon == 0) {
            if (this.sunnyiconsize == '16px') {
                this.forSunny = "no";
                this.sunnyiconsize = '35px';
            }
            else {
                this.forSunny = "yes";
                this.sunnyiconsize = '16px';
            }
        }
        else if (icon == 1) {
            if (this.rainyiconsize == '16px') {
                this.forRainy = "no";
                this.rainyiconsize = '35px';
            }
            else {
                this.forRainy = "yes";
                this.rainyiconsize = '16px';
            }
        }
        else if (icon == 2) {
            if (this.cloudyiconsize == '16px') {
                this.forCloudy = "no";
                this.cloudyiconsize = '35px';
            }
            else {
                this.forCloudy = "yes";
                this.cloudyiconsize = '16px';
            }
        }
        else if (icon == 3) {
            if (this.snowyiconsize == '16px') {
                this.forSnowy = "no";
                this.snowyiconsize = '35px';
            }
            else {
                this.forSnowy = "yes";
                this.snowyiconsize = '16px';
            }
        }
    };
    UploadPage.prototype.openModal = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Are you sure you want to logout',
            buttons: [
                {
                    text: 'Logout',
                    role: 'destructive',
                    handler: function () {
                        // this.logoutFacebook();
                        _this.logoutEmail();
                        // this.logoutTwitter();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    UploadPage.prototype.logoutEmail = function () {
        var _this = this;
        this.authData.logoutUser().then(function (res) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
        }), function (err) {
            _this.errorMessage = err.message;
        };
    };
    UploadPage.prototype.peformUpload = function () {
        var _this = this;
        if (this.dressType == null) {
            console.log(this.dressType);
            this.presentToast('Please select cloth category');
        }
        else if (this.forSunny == "no" && this.forRainy == "no" && this.forCloudy == "no" && this.forSnowy == "no") {
            this, this.presentToast('Please select preffered weather');
        }
        else {
            var load_1 = this.loadingCtrl.create({
                content: 'Loading your gallery....',
            });
            load_1.present();
            this.uidforimage = this.firedata.child(this.dressType).push().key;
            var imageStore = this.firestore.ref('/' + __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth().currentUser.uid).
                child('collection').child(this.dressType).child(this.uidforimage + '.jpg');
            imageStore.put(this.imageblob).then(function (res) {
                _this.firestore.ref('/' + __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth().currentUser.uid).child('collection').child(_this.dressType).child(_this.uidforimage + '.jpg').getDownloadURL().then(function (url) {
                    _this.presentToast(url);
                    _this.firedata.child(_this.uidforimage).set({
                        clothType: _this.dressType,
                        forCloudy: _this.forCloudy,
                        forRainy: _this.forRainy,
                        forSnowy: _this.forSnowy,
                        forSunny: _this.forSunny,
                        imageuid: _this.uidforimage,
                        url: url,
                        timestamp: _this.seconddate
                    }).then(function (res) {
                        load_1.dismiss();
                        console.log('updated');
                    }).catch(function (err) {
                        _this.errorMessage = err.message;
                        console.log(_this.errorMessage);
                    });
                }).catch(function (err) {
                    _this.presentToast(err);
                });
            }).catch(function (err) {
                _this.presentToast('Upload failed' + err);
            });
        }
    };
    UploadPage.prototype.choosefromgallery = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.filechooser.open().then(function (url) {
                window.FilePath.resolveNativePath(url, function (result) {
                    _this.nativepath = result;
                    window.resolveLocalFileSystemURL(_this.nativepath, function (res) {
                        res.file(function (resFile) {
                            var reader = new FileReader();
                            reader.readAsArrayBuffer(resFile);
                            reader.onloadend = function (evt) {
                                _this.imgurl = "https://pbs.twimg.com/media/DUFbk2cV4AAwl2v.jpg";
                                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                                _this.imageblob = imgBlob;
                            };
                        });
                    });
                });
            });
        });
        return promise;
    };
    UploadPage.prototype.presentToast = function (mess) {
        var toast = this.toastCtrl.create({
            message: mess,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    UploadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upload',template:/*ion-inline-start:"/home/lawrene/DressUpiOs/src/pages/upload/upload.html"*/'<ion-header>\n    <ion-navbar>\n      <p align="center"><ion-title>DressUp!</ion-title></p> \n      <ion-buttons end>\n          <button ion-button icon-only (click)="openModal()">\n            <ion-icon name="options" color="light"></ion-icon>\n          </button>\n        </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n\n\n<ion-content padding class="appbody">\n\n  <br>\n  <br>\n\n  <ion-card class="uploadcard">\n\n    <img style="padding: 5px;" src="{{imgurl}}">\n\n  </ion-card>\n  \n  <div text-center="">\n      <button class="mybutton" (click)="choosefromcamera()" ion-button>\n        Camera\n      </button>\n  \n      <button class="mybutton" (click)="choosefromgallery()" ion-button>\n        Gallery\n      </button>\n  </div>\n\n  <br>\n  <p style="font-size: 16px;">What part of your collection  will you like to add  this to?</p>\n  <ion-item>\n      <ion-label >Select</ion-label>\n      <ion-select [(ngModel)]="dressType">\n        <ion-option >T-Shirts</ion-option>\n        <ion-option >Shirts</ion-option>\n        <ion-option >Trousers</ion-option>\n        <ion-option >Shorts</ion-option>\n        <ion-option >Gowns</ion-option>\n        <ion-option >Coats</ion-option>\n        <ion-option >Jackets</ion-option>\n        <ion-option >Shoes</ion-option>\n      </ion-select>\n  </ion-item>\n\n  <br>\n\n  <p align="center" style="font-size: 16px;">Preffered weather for wearing this cloth</p>\n\n  <ion-grid>\n      <ion-row>\n        <ion-col>\n            <p align="center">\n                    <ion-icon  (click)="changeiconsize(0)" \n                    [ngStyle]="{\'font-size\': sunnyiconsize}"\n                     name="ios-sunny">\n            </ion-icon><br><p>Sunny</p>\n            </p>\n        </ion-col>\n\n        <ion-col>\n            <p align="center">\n                    <ion-icon  (click)="changeiconsize(1)" \n                    [ngStyle]="{\'font-size\': rainyiconsize}"\n                    name="ios-rainy">\n                   </ion-icon><br><p>Rainy</p>\n            </p>\n        </ion-col>\n\n        <ion-col>\n                <p align="center">\n                    <ion-icon  (click)="changeiconsize(2)"\n                    [ngStyle]="{\'font-size\': cloudyiconsize}"\n                    name="ios-cloudy">\n                    </ion-icon><br><p>Cloudy</p>\n                </p>\n        </ion-col>\n\n        <ion-col>\n                <p align="center">\n            <ion-icon  (click)="changeiconsize(3)" \n            [ngStyle]="{\'font-size\': snowyiconsize}"\n             name="ios-snow">\n            </ion-icon><br><p>Snowy</p>\n                 </p>\n        </ion-col>\n      </ion-row>\n  </ion-grid>\n\n\n\n  <div text-center>\n      <button ion-button class="mybutton"\n       (click)="peformUpload()">Save</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/lawrene/DressUpiOs/src/pages/upload/upload.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_imghandler_imghandler__["a" /* ImghandlerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], UploadPage);
    return UploadPage;
}());

//# sourceMappingURL=upload.js.map

/***/ }),

/***/ 211:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 211;

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/gallery/gallery.module": [
		810,
		3
	],
	"../pages/login/login.module": [
		811,
		2
	],
	"../pages/register/register.module": [
		812,
		0
	],
	"../pages/upload/upload.module": [
		813,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 256;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_twitter_connect__ = __webpack_require__(174);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { Facebook } from '@ionic-native/facebook';


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, 
        // public facebook: Facebook,
        authData, loadingCtrl, tw, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.authData = authData;
        this.loadingCtrl = loadingCtrl;
        this.tw = tw;
        this.actionSheetCtrl = actionSheetCtrl;
        this.errorMessage = '';
        this.listCardsAdventure = [{ 'title': 'mytitle1' }, { 'title': 'mytitle1' }, { 'title': 'mytitle1' }, { 'title': 'mytitle1' }];
        this.galleryitems = [];
        this.collectionurls = [];
        this.firedata = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/Users').child(__WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().
            currentUser.uid).child('gallery');
        this.bottomimages = ["https://media.vogue.in/wp-content/uploads/2017/12/2017-01-2-disha-patani-hairstyles-makeup-vogue-india.jpg",
            "https://spiderimg.amarujala.com/assets/images/2017/11/06/750x506/anushka-shetty_1509948439.jpeg",
            "http://static.dnaindia.com/sites/default/files/styles/full/public/2018/02/04/648069-rakul-preet-singh.jpg",
            "https://pbs.twimg.com/profile_images/928946397436506113/6QE6iLb7.jpg",
            "https://pbs.twimg.com/media/DUFbk2cV4AAwl2v.jpg",
            "https://qph.fs.quoracdn.net/main-qimg-980a13410f56739c66864b89c4466263-c",
            "http://starsvilla.com/wp-content/uploads/2017/09/19425346_145774522639533_5306252787913326592_n.jpg",
            "https://i1.wp.com/akmatter.com/wp-content/uploads/2018/01/Rakul-Preet-Singh.jpg",
            "https://data1.ibtimes.co.in/cache-img-600-450/en/full/571296/1494666323_anushka-shetty-baahubali.jpg"
        ];
        this.collectionurls = this.bottomimages;
        // load.dismiss();
        // console.log(this.collectionurls);
        // });
    }
    HomePage.prototype.openModal = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Are you sure you want to logout',
            buttons: [
                {
                    text: 'Logout',
                    role: 'destructive',
                    handler: function () {
                        // this.logoutFacebook();
                        _this.logoutEmail();
                        // this.logoutTwitter();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
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
    HomePage.prototype.logoutEmail = function () {
        var _this = this;
        this.authData.logoutUser().then(function (res) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        }), function (err) {
            _this.errorMessage = err.message;
        };
    };
    HomePage.prototype.logoutTwitter = function () {
        var _this = this;
        this.tw.logout().then(function (res) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        }), (function (err) {
            _this.errorMessage = err.message;
            console.log(_this.errorMessage);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/lawrene/DressUpiOs/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <p align="center"><ion-title>DressUp!</ion-title></p> \n    <ion-buttons end>\n        <button ion-button icon-only (click)="openModal()">\n          <ion-icon name="options" color="light"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="appbody">\n\n    <br>\n    <br>\n    <br>\n    <br>\n\n\n    <p align="center" style="font-size:16px; color: white"><img style="zoom:14%;" src="../../assets/imgs/handshake.png"><br>Shake!!</p>\n    \n      <ion-scroll scrollX="true" direction="x">\n        <ion-card style="border-radius: 5px;" *ngFor="let item of collectionurls">\n             <br>\n             <p align="center"> <img class="imageof" src="{{item}}"></p>\n         \n        </ion-card>\n      </ion-scroll>\n\n\n  </ion-content>\n\n\n\n\n              <!-- <button ion-item (click)="openDetailActivity(item)">            \n              More info\n              <ion-icon name="arrow-forward" item-right color="primary"></ion-icon>\n            </button> -->\n'/*ion-inline-end:"/home/lawrene/DressUpiOs/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_twitter_connect__["a" /* TwitterConnect */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(815);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TodayPage = /** @class */ (function () {
    function TodayPage(sanitizer, actionSheetCtrl, navCtrl, authData, geolocation, 
        // public gLocation: GeolocationOriginal,
        loadingCtrl) {
        // start the loader
        var _this = this;
        this.sanitizer = sanitizer;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.authData = authData;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.firedata = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('/Users').child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().
            currentUser.uid).child('gallery');
        this.galleryitems = [];
        this.allurls = [];
        this.topurls = [];
        this.bottomurls = [];
        this.topready = false;
        this.bottomready = false;
        this.errorMessage = '';
        this.topattendants = [];
        this.bottomattendants = [];
        this.topcardDirection = "xy";
        this.bottomcardDirection = "xy";
        this.topcardOverlay = {
            like: {
                backgroundColor: '#28e93b'
            },
            dislike: {
                backgroundColor: '#e92828'
            }
        };
        this.bottomcardOverlay = {
            like: {
                backgroundColor: '#28e93b'
            },
            dislike: {
                backgroundColor: '#e92828'
            }
        };
        this.topimages = ["https://media.vogue.in/wp-content/uploads/2017/12/2017-01-2-disha-patani-hairstyles-makeup-vogue-india.jpg",
            "https://spiderimg.amarujala.com/assets/images/2017/11/06/750x506/anushka-shetty_1509948439.jpeg",
            "http://static.dnaindia.com/sites/default/files/styles/full/public/2018/02/04/648069-rakul-preet-singh.jpg",
            "https://pbs.twimg.com/profile_images/928946397436506113/6QE6iLb7.jpg",
            "https://pbs.twimg.com/media/DUFbk2cV4AAwl2v.jpg",
            "https://qph.fs.quoracdn.net/main-qimg-980a13410f56739c66864b89c4466263-c",
            "http://starsvilla.com/wp-content/uploads/2017/09/19425346_145774522639533_5306252787913326592_n.jpg",
            "https://i1.wp.com/akmatter.com/wp-content/uploads/2018/01/Rakul-Preet-Singh.jpg",
            "https://data1.ibtimes.co.in/cache-img-600-450/en/full/571296/1494666323_anushka-shetty-baahubali.jpg"
        ];
        this.bottomimages = ["https://media.vogue.in/wp-content/uploads/2017/12/2017-01-2-disha-patani-hairstyles-makeup-vogue-india.jpg",
            "https://spiderimg.amarujala.com/assets/images/2017/11/06/750x506/anushka-shetty_1509948439.jpeg",
            "http://static.dnaindia.com/sites/default/files/styles/full/public/2018/02/04/648069-rakul-preet-singh.jpg",
            "https://pbs.twimg.com/profile_images/928946397436506113/6QE6iLb7.jpg",
            "https://pbs.twimg.com/media/DUFbk2cV4AAwl2v.jpg",
            "https://qph.fs.quoracdn.net/main-qimg-980a13410f56739c66864b89c4466263-c",
            "http://starsvilla.com/wp-content/uploads/2017/09/19425346_145774522639533_5306252787913326592_n.jpg",
            "https://i1.wp.com/akmatter.com/wp-content/uploads/2018/01/Rakul-Preet-Singh.jpg",
            "https://data1.ibtimes.co.in/cache-img-600-450/en/full/571296/1494666323_anushka-shetty-baahubali.jpg"
        ];
        this.getLocation();
        var load = this.loadingCtrl.create({
            content: 'Suggesting clothes for today....',
        });
        load.present();
        //   Fetch them from firebase
        this.firedata.orderByChild('uid').on('value', function (snapshot) {
            var result = snapshot.val();
            for (var key in result) {
                _this.galleryitems.push(result[key]);
            }
            for (var i in _this.galleryitems) {
                if (_this.galleryitems[i].clothType == "T-Shirts" ||
                    _this.galleryitems[i].clothType == "Shirts" ||
                    _this.galleryitems[i].clothType == "Coats" ||
                    _this.galleryitems[i].clothType == "Jackets") {
                    _this.topurls.push(_this.galleryitems[i].url);
                }
                else {
                    _this.bottomurls.push(_this.galleryitems[i].url);
                }
            }
            load.dismiss();
            // Load them into the frontend
            for (var i_1 = 0; i_1 < _this.topurls.length; i_1++) {
                _this.topattendants.push({
                    id: i_1 + 1,
                    likeEvent: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */](),
                    destroyEvent: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */](),
                    asBg: sanitizer.bypassSecurityTrustStyle('url(' + _this.topurls[i_1] + ')')
                });
            }
            for (var i_2 = 0; i_2 < _this.bottomurls.length; i_2++) {
                _this.bottomattendants.push({
                    id: i_2 + 1,
                    likeEvent: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */](),
                    destroyEvent: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */](),
                    asBg: sanitizer.bypassSecurityTrustStyle('url(' + _this.bottomurls[i_2] + ')')
                });
            }
            _this.topready = true;
            _this.bottomready = true;
        });
    }
    TodayPage.prototype.getUserPosition = function () {
        var _this = this;
        this.options = {
            enableHighAccuracy: true
        };
        this.geolocation.getCurrentPosition(this.options).then(function (pos) {
            _this.currentPos = pos;
            console.log(pos);
        }, function (err) {
            console.log("error : " + err.message);
        });
    };
    TodayPage.prototype.onCardInteract = function (event) {
        console.log(event);
    };
    TodayPage.prototype.refreshOptions = function () {
    };
    TodayPage.prototype.openModal = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Are you sure you want to logout',
            buttons: [
                {
                    text: 'Logout',
                    role: 'destructive',
                    handler: function () {
                        // this.logoutFacebook();
                        _this.logoutEmail();
                        // this.logoutTwitter();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    TodayPage.prototype.logoutEmail = function () {
        var _this = this;
        this.authData.logoutUser().then(function (res) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
        }), function (err) {
            _this.errorMessage = err.message;
        };
    };
    TodayPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-today',template:/*ion-inline-start:"/home/lawrene/DressUpiOs/src/pages/today/today.html"*/'<ion-header>\n\n  <ion-navbar>\n    <p align="center"><ion-title>DressUp!</ion-title></p> \n    <ion-buttons end>\n        <button ion-button icon-only (click)="refreshOptions()">\n            <ion-icon name="refresh" color="light"></ion-icon>\n          </button>\n        <button ion-button icon-only (click)="openModal()">\n            <ion-icon name="options" color="light"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="appbody">\n  <br>\n  <br>\n  <br>\n  <div class="card-container" *ngIf="topready">\n    <sc-card padding *ngFor="let topattendant of topattendants" \n        [orientation]="topcardDirection" \n        [tinder-card]="topcardOverlay" \n        [callDestroy]="topattendant.destroyEvent" \n        [callLike]="topattendant.likeEvent" \n        (onLike)="onCardInteract($event)">\n\n  <div class="user_img" [style.background-image]="topattendant.asBg"></div>\n      </sc-card>\n  </div>\n\n  <br>\n  <br>\n  <br>\n\n\n\n  <div class="card-container" *ngIf="bottomready">\n    <sc-card padding *ngFor="let bottomattendant of bottomattendants" \n        [orientation]="bottomcardDirection" \n        [tinder-card]="bottomcardOverlay" \n        [callDestroy]="bottomattendant.destroyEvent" \n        [callLike]="bottomattendant.likeEvent" \n        (onLike)="onCardInteract($event)">\n\n  <div class="user_img" [style.background-image]="bottomattendant.asBg"></div>\n      </sc-card>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/lawrene/DressUpiOs/src/pages/today/today.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _f || Object])
    ], TodayPage);
    return TodayPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=today.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImghandlerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_chooser__ = __webpack_require__(176);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { FilePath } from '@ionic-native/file-path';


var ImghandlerProvider = /** @class */ (function () {
    function ImghandlerProvider(filechooser, toastCtrl) {
        this.filechooser = filechooser;
        this.toastCtrl = toastCtrl;
        this.firestore = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.storage();
    }
    ImghandlerProvider.prototype.uploadimage = function (dressType, imageuid) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.filechooser.open().then(function (url) {
                window.FilePath.resolveNativePath(url, function (result) {
                    _this.nativepath = result;
                    window.resolveLocalFileSystemURL(_this.nativepath, function (res) {
                        res.file(function (resFile) {
                            var reader = new FileReader();
                            reader.readAsArrayBuffer(resFile);
                            reader.onloadend = function (evt) {
                                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                                var imageStore = _this.firestore.ref('/' + __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid).
                                    child('collection').child(dressType).child(imageuid + '.jpg');
                                // this.presentToast('Image getting success');
                                imageStore.put(imgBlob).then(function (res) {
                                    _this.presentToast('blob putting success');
                                    _this.firestore.ref('/' + __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid).child('collection').child(dressType).child(imageuid + '.jpg').getDownloadURL().then(function (url) {
                                        resolve(url);
                                    }).catch(function (err) {
                                        _this.presentToast(err);
                                        reject(err);
                                    });
                                }).catch(function (err) {
                                    _this.presentToast('Upload failed' + err);
                                    reject(err);
                                });
                            };
                        });
                    });
                });
            });
        });
        return promise;
    };
    ImghandlerProvider.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ImghandlerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_chooser__["a" /* FileChooser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_chooser__["a" /* FileChooser */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ToastController */]) === "function" && _b || Object])
    ], ImghandlerProvider);
    return ImghandlerProvider;
    var _a, _b;
}());

//# sourceMappingURL=imghandler.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(421);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(797);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_swipe_cards__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_chooser__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_today_today__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_upload_upload__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_gallery_gallery__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_google_plus__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_auth_auth__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2__ = __webpack_require__(799);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_database__ = __webpack_require__(800);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_twitter_connect__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_imghandler_imghandler__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_collection_collection__ = __webpack_require__(809);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












// import { Facebook } from '@ionic-native/facebook';










var firebaseconfig = {
    apiKey: "AIzaSyDymoC3gqeLLnuBvcCABg-YM8qLl94V5f4",
    authDomain: "dressup-102d1.firebaseapp.com",
    databaseURL: "https://dressup-102d1.firebaseio.com",
    projectId: "dressup-102d1",
    storageBucket: "dressup-102d1.appspot.com",
    messagingSenderId: "186608457698"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_today_today__["a" /* TodayPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_upload_upload__["a" /* UploadPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_gallery_gallery__["a" /* GalleryPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4_ng2_swipe_cards__["a" /* SwipeCardsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/gallery/gallery.module#GalleryPageModule', name: 'GalleryPage', segment: 'gallery', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/upload/upload.module#UploadPageModule', name: 'UploadPage', segment: 'upload', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_13_angularfire2__["AngularFireModule"].initializeApp(firebaseconfig),
                __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__["AngularFireAuthModule"],
                __WEBPACK_IMPORTED_MODULE_15_angularfire2_database__["AngularFireDatabaseModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_today_today__["a" /* TodayPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_upload_upload__["a" /* UploadPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_gallery_gallery__["a" /* GalleryPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_chooser__["a" /* FileChooser */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_twitter_connect__["a" /* TwitterConnect */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_20__providers_imghandler_imghandler__["a" /* ImghandlerProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_collection_collection__["a" /* CollectionProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, alertCtrl, toastCtrl, authData, afAuth, loadingCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.authData = authData;
        this.afAuth = afAuth;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.email = "";
        this.password = "";
        this.errorMessage = '';
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.logUserIn = function () {
        var _this = this;
        this.authData.loginUser(this.email, this.password)
            .then(function (authData) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
        }, function (error) {
            alert(error.message);
            _this.loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
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
    };
    LoginPage.prototype.signUpUser = function () {
        var _this = this;
        this.authData.signupUser(this.email, this.password)
            .then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
        }, function (error) {
            _this.loading.dismiss().then(function () {
                var errorMessage = error.message;
                var alert = _this.alertCtrl.create({
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
    };
    LoginPage.prototype.tryGoogleLogin = function () {
        var _this = this;
        this.authData.doGoogleLogin()
            .then(function (res) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
        }, function (err) {
            _this.errorMessage = err.message;
            _this.presentToast(_this.errorMessage);
        });
    };
    // tryFacebookLogin(){
    //   this.authData.doFacebookLogin()
    //   .then((res) => {
    //     this.navCtrl.push(TabsPage);
    //   }, (err) => {
    //     this.errorMessage = err.message;
    //     this.presentToast(this.errorMessage);
    //   });
    // }
    LoginPage.prototype.tryTwitterLogin = function () {
        var _this = this;
        this.authData.doTwitterLogin()
            .then(function (res) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
        }, function (err) {
            _this.errorMessage = err.message;
            _this.presentToast(_this.errorMessage);
        });
    };
    LoginPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/lawrene/DressUpiOs/src/pages/login/login.html"*/'\n<ion-content padding class="appbody">\n  \n    <p align="center"><img style="zoom:50%;" src="../../assets/imgs/login_icon.png"></p>\n  \n    <ion-list>  \n      <ion-item>\n        <ion-label floating>E-mail</ion-label>\n        <ion-input type="email" [(ngModel)]="email"></ion-input>\n      </ion-item>\n  \n      <ion-item>\n          <ion-label floating>Password</ion-label>\n          <ion-input type="password" [(ngModel)]="password"></ion-input>\n      </ion-item>\n    </ion-list>\n  \n    <div padding>\n      <button block ion-button class="loginbtns" (click)="logUserIn()">Log In</button>\n    </div>\n\n    <button ion-button full type="submit" class="facebook-button" (click)="tryFacebookLogin()">Login with Facebook</button>\n    <button ion-button full type="submit" class="twitter-button" (click)="tryTwitterLogin()">Log in with twitter</button>\n    <button ion-button full type="submit" class="google-button"  (click)="tryGoogleLogin()">Google Login</button>\n    \n</ion-content>\n'/*ion-inline-end:"/home/lawrene/DressUpiOs/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_twitter_connect__ = __webpack_require__(174);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { Facebook } from '@ionic-native/facebook';



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = /** @class */ (function () {
    function AuthProvider(afAuth, googlePlus, 
        //public fb: Facebook,
        tw, platform) {
        this.afAuth = afAuth;
        this.googlePlus = googlePlus;
        this.tw = tw;
        this.platform = platform;
        console.log('Hello AuthProvider Provider');
    }
    AuthProvider.prototype.loginUser = function (newEmail, newPassword) {
        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
    };
    AuthProvider.prototype.logoutUser = function () {
        return this.afAuth.auth.signOut();
    };
    AuthProvider.prototype.signupUser = function (newEmail, newPassword) {
        return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
    };
    AuthProvider.prototype.doGoogleLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.googlePlus.login({
                    'scopes': '',
                    'webClientId': '186608457698-eadrse8j8upa331edgf7cgqtak4m7vo9.apps.googleusercontent.com',
                    'offline': true
                }).then(function (response) {
                    var googleCredential = __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.auth.GoogleAuthProvider.credential(response.idToken);
                    __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.auth().signInWithCredential(googleCredential)
                        .then(function (user) {
                        resolve();
                    });
                }, function (err) {
                    reject(err);
                });
            }
            else {
                _this.afAuth.auth
                    .signInWithPopup(new __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.auth.GoogleAuthProvider())
                    .then(function (user) {
                    resolve();
                }, function (err) {
                    reject(err);
                });
            }
        });
    };
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
    AuthProvider.prototype.doTwitterLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // if we are in a mobile device we use the twitter native plugin
            if (_this.platform.is('cordova')) {
                _this.tw.login()
                    .then(function (response) {
                    var twitterCredential = __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.auth.TwitterAuthProvider.credential(response.token, response.secret);
                    __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.auth().signInWithCredential(twitterCredential)
                        .then(function (user) { return resolve(); }, function (error) { return reject(error); });
                }, function (err) {
                    console.log(err);
                    reject(err);
                });
            }
            else {
                _this.afAuth.auth
                    .signInWithPopup(new __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.auth.TwitterAuthProvider())
                    .then(function (user) {
                    resolve();
                }, function (err) {
                    reject(err);
                });
            }
        });
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_twitter_connect__["a" /* TwitterConnect */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 797:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, afAuth, splashScreen) {
        var _this = this;
        var authObserver = afAuth.authState.subscribe(function (user) {
            if (user) {
                // this.rootPage = UploadPage;
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */];
                authObserver.unsubscribe();
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
                authObserver.unsubscribe();
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/lawrene/DressUpiOs/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/lawrene/DressUpiOs/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 809:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the CollectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CollectionProvider = /** @class */ (function () {
    function CollectionProvider() {
        this.firedata = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/Users').child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().
            currentUser.uid).child('gallery');
        console.log("");
    }
    CollectionProvider.prototype.getallusers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.firedata.orderByChild('mjbmmn').once('value', function (snapshot) {
                var result = snapshot.val();
                var temparr = [];
                for (var key in result) {
                    temparr.push(result[key]);
                }
                resolve(temparr);
                console.log(temparr.length);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    CollectionProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], CollectionProvider);
    return CollectionProvider;
}());

//# sourceMappingURL=collection.js.map

/***/ })

},[416]);
//# sourceMappingURL=main.js.map                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               