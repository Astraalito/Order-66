import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-droid-showcase',
  templateUrl: './droid-showcase.component.html',
  styleUrls: ['./droid-showcase.component.css']
})
export class DroidShowcaseComponent implements OnInit, AfterViewInit {

  @ViewChild('sections') sectionsWrapper: ElementRef;

  scrollCount : number = 0;
  sectionsNumber : number = 0;
  activeSection : number = 0;

  constructor() { }

  ngOnInit(): void {    
    this.activeSection = (window.scrollY / window.innerHeight);
  }

  ngAfterViewInit():void {
    const scrollCountLimit = 5;
    this.sectionsNumber = this.sectionsWrapper.nativeElement.children.length;
    
    window.addEventListener('wheel', (event) => {
      this.scrollCount += event.deltaY > 0 ? 1 : -1;
      if(this.scrollCount >= scrollCountLimit) {
        this.scrollSection(window.innerHeight);
      } else if (this.scrollCount <= -scrollCountLimit){
        this.scrollSection(-window.innerHeight);
      }
    })
  }

  private scrollSection(scrollOffset:number) {
    window.scrollBy(0, scrollOffset)
    this.scrollCount = 0
  }

}
