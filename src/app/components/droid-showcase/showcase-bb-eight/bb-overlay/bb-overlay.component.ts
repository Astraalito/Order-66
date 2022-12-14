import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { trigger, state, style, transition, animate } from '@angular/animations'
import { PageController } from 'src/app/controllers/page-controller';
import { DeviceService } from 'src/app/services/device.service';

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
export class BbOverlayComponent implements AfterViewInit {

  @ViewChild("overlay") overlayElement: ElementRef;

  @ViewChild("layoutOne") layout1: ElementRef
  @ViewChild("layoutTwo") layout2: ElementRef

  isControlsEnabled : boolean = false;

  showLayout1 = false;
  showLayout2 = false;

  get layoutOneState() {
    return this.showLayout1 ? 'show' : 'hide'
  }
  get layoutTwoState() {
    return this.showLayout2 ? 'show' : 'hide'
  }

  constructor(private pageController : PageController,
              public deviceService : DeviceService) { }

  ngAfterViewInit(): void {
    const overlay = this.overlayElement.nativeElement
    this.pageController.computeActiveSection(overlay)
    overlay.addEventListener('scroll', () => {
      this.pageController.computeActiveSection(overlay)
      this.showLayout1 = this.isOnScreen(this.layout1.nativeElement.getBoundingClientRect().top)
      this.showLayout2 = this.isOnScreen(this.layout2.nativeElement.getBoundingClientRect().top)
    })
    this.checkPhoneUsage()
  }

  private isOnScreen(posY: number):boolean {
    return posY > 0 && posY < window.innerHeight
  }

  toggleControls():void {    
    this.isControlsEnabled = !this.isControlsEnabled
  }

  checkPhoneUsage() {
    if ( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
      this.deviceService.isOnMobile = true;
      window.addEventListener("deviceorientation", (event) => {
        if(event.alpha && event.alpha <= 45){
          this.deviceService.deviceOrientation = -(event.alpha / 45)
        } else if(event.alpha && event.alpha >= 315) {
          this.deviceService.deviceOrientation = 1 - (event.alpha - 315) / 45
        }
      })
      window.addEventListener("devicemotion", (event) => {
        console.log(event.rotationRate?.alpha);
      })
    }
  }

}
