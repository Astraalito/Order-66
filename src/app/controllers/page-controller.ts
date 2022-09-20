import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageController {

  public sectionsNumber : number;

  private _activeSection : number

  set activeSection(value: number){
    value < 0 ? value = 0 : value;
    value > this.sectionsNumber ? value = this.sectionsNumber : value;
    this._activeSection = Math.round(value);
  }
  get activeSection(){
    return this._activeSection
  }

  constructor() { }
}
