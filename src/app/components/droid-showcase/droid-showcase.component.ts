import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageController } from 'src/app/controllers/page-controller';
import { ModelService } from 'src/app/services/model.service';
import { LoadStatus } from 'src/app/models/enums/loadStatus';

@Component({
  selector: 'app-droid-showcase',
  templateUrl: './droid-showcase.component.html',
  styleUrls: ['./droid-showcase.component.css']
})
export class DroidShowcaseComponent implements AfterViewInit, OnInit {

  scrollCount : number;
  scrollCountLimit : number;

  modelLoadStatus : LoadStatus;

  constructor(private pageController: PageController,
              private modelService: ModelService) { }

  ngOnInit() {
    this.modelService.loadStatus.subscribe( (status) => {
      this.modelLoadStatus = status;
    })
    this.modelService.loadModel('assets/models/lala/untitled.gltf')
  }

  ngAfterViewInit():void {
    this.pageController.activeSection = (window.scrollY / window.innerHeight) + 1;

    this.scrollCount = 0;
    this.scrollCountLimit = 5;
    
    window.addEventListener('wheel', (event) => {
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
