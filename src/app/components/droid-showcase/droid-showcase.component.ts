import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PageController } from 'src/app/controllers/page-controller';

@Component({
  selector: 'app-droid-showcase',
  templateUrl: './droid-showcase.component.html',
  styleUrls: ['./droid-showcase.component.css']
})
export class DroidShowcaseComponent implements AfterViewInit {

  @ViewChild('sections') sectionsWrapper: ElementRef;

  scrollCount : number;
  scrollCountLimit : number;

  constructor(private pageController: PageController) { }

  ngAfterViewInit():void {
    this.pageController.activeSection = (window.scrollY / window.innerHeight);
    this.pageController.sectionsNumber = this.sectionsWrapper.nativeElement.children.length;

    this.scrollCount = 0;
    this.scrollCountLimit = 5;
    
    window.addEventListener('wheel', (event) => {
      console.log(this.scrollCount)
      this.scrollCount += event.deltaY > 0 ? 1 : -1;
      if(this.scrollCount >= this.scrollCountLimit) {
        this.scrollSection(window.innerHeight);
        this.pageController.activeSection += 1
      } else if (this.scrollCount <= -this.scrollCountLimit){
        this.scrollSection(-window.innerHeight);
        this.pageController.activeSection -= 1
      }
    })
  }

  private scrollSection(scrollOffset:number) {
    window.scrollBy({
      top: scrollOffset,
      behavior: 'smooth'
    })
    this.scrollCount = 0
  }

}
