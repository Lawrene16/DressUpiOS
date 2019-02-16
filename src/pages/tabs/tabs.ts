import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { TodayPage } from '../today/today';
import { UploadPage } from '../upload/upload';
import { GalleryPage } from '../gallery/gallery';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TodayPage;
  tab3Root = UploadPage;
  tab4Root = GalleryPage;

  constructor() {

  }
}
