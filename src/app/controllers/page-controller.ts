import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PageController {

  public sectionsNumber : number = 3;

  public activeSectionObservalbe : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _activeSection : number

  set activeSection(value: number){
    value < 0 ? value = 1 : value;
    value >= this.sectionsNumber ? value = this.sectionsNumber : value;
    this.activeSectionObservalbe.next(Math.round(value))
    this._activeSection = Math.round(value);
  }
  get activeSection(){
    return this._activeSection
  }

  constructor() {
  }
}
