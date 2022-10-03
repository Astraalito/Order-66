import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations'
import { ModelService } from 'src/app/services/model.service';
import { LoadStatus } from 'src/app/models/enums/loadStatus';
import { PageController } from 'src/app/controllers/page-controller';

@Component({
  selector: 'app-droid-showcase',
  templateUrl: './droid-showcase.component.html',
  styleUrls: ['./droid-showcase.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1}))
      ])
    ]),
  ]
})
export class DroidShowcaseComponent implements OnInit {

  modelLoadStatus: LoadStatus

  constructor(private modelService: ModelService, private pageController : PageController) { }

  ngOnInit() : void{
    this.modelService.loadStatus.subscribe((status) => {
      this.modelLoadStatus = status;
    })
    this.modelService.loadModel('assets/models/bb8-final/bb8.gltf')
  }

}
