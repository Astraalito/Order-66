import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PageController {

  public sectionsNumber : number = 4;

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

  public computeActiveSection(overlay: HTMLElement){
    const scrollMod = overlay.scrollTop % window.innerHeight  
    if(scrollMod >= -1 && scrollMod <= 1) {
      const activeSection = Math.round(overlay.scrollTop/window.innerHeight)
      this.activeSection = activeSection + 1
    } else {
      this.activeSection = 0
    }
    
  }
}
