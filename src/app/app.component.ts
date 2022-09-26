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

  constructor(private translateService: TranslateService) {}

  toggleMenu():void {
    this.isMenuEnabled = !this.isMenuEnabled
  }

  setLanguage(lang: string) {    
    this.translateService.use(lang)
    this.selectedLanguage = lang;
    this.toggleMenu()
  }
}
