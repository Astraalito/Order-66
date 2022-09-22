import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMenuEnabled : boolean = false;
  title = 'droid-shop';
  selectedLanguage = 'fr';

  constructor() {}

  toggleMenu():void {
    console.log('lala');
    this.isMenuEnabled = !this.isMenuEnabled
  }

  setLanguage(lang: string) {    
    this.selectedLanguage = lang;
    this.toggleMenu()
  }
}
