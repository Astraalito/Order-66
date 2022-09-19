import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMenuEnabled : boolean = false;
  title = 'droid-shop';

  toggleMenu():void {
    console.log('lala');
    this.isMenuEnabled = !this.isMenuEnabled
  }
}
