import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-bb-overlay',
  templateUrl: './bb-overlay.component.html',
  styleUrls: ['./bb-overlay.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1}))
      ])
    ]),

    trigger('enterView', [
      state('show', style({ opacity: 1, transform: 'translateY(0px)' })),
      state('hide', style({ opacity: 0, transform: 'translateY(50px)'})),
      transition('show => hide', animate('1000ms ease-in')),
      transition('hide => show', animate('600ms ease-out'))
    ]),

  ]
})
export class BbOverlayComponent implements OnInit {

  @ViewChild("layoutOne") layout1: ElementRef
  @ViewChild("layoutTwo") layout2: ElementRef

  showLayout1 = false;
  showLayout2 = false;

  get layoutOneState() {
    return this.showLayout1 ? 'show' : 'hide'
  }
  get layoutTwoState() {
    return this.showLayout2 ? 'show' : 'hide'
  }

  constructor() { }

  ngOnInit(): void {
    addEventListener('scroll', () => {
      this.showLayout1 = this.isElementOnScreen(this.layout1.nativeElement.getBoundingClientRect().top)
      this.showLayout2 = this.isElementOnScreen(this.layout2.nativeElement.getBoundingClientRect().top)
    })
    
  }

  private isElementOnScreen(posY: number):boolean {
    return posY > 0 && posY < window.innerHeight
  }

}
