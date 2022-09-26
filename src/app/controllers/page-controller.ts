import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PageController {

  public sectionsNumber : number = 3;

  public activeSectionObservalbe : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _activeSection : number;

  set activeSection(value: number){
    value < 0 ? value = 1 : value;
    value >= this.sectionsNumber ? value = this.sectionsNumber : value;
    if(value != this._activeSection){
      this.activeSectionObservalbe.next(Math.round(value))
      this._activeSection = Math.round(value);
    }
  }
  get activeSection(){
    return this._activeSection
  }

  constructor() {
    this.activeSection = 1
  }

  public computeActiveSection(sectionRatio: number) {
    if(sectionRatio < 0.6){
      this.activeSection = 1;
    } else if ( sectionRatio > 0.9 && sectionRatio < 1.1 ) {
      this.activeSection = 2;
    } else if ( sectionRatio > 1.1) {
      this.activeSection = 3
    } else {
      this.activeSection = 0
    }

  }
}
