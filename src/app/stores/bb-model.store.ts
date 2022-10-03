import { Injectable } from '@angular/core';
import { ModelService } from '../services/model.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class BbModelStore {

  bbFullMesh : THREE.Object3D = new THREE.Group()
  bbHeadMesh : THREE.Group = new THREE.Group()
  bbBodyMesh : THREE.Group = new THREE.Group()

  constructor(private modelService: ModelService) { }

  initiateStore(scene: THREE.Scene) {
    //Load Model
    this.modelService.modelMesh.subscribe( (meshArray) => {
      this.computeBBParts(meshArray, scene)
    })
  }

  private computeBBParts(meshArray: THREE.Object3D[], scene: THREE.Scene) {
    const bodyRegex = new RegExp('^b-')
  
    if(meshArray[0].name != 'empty') {
      for(const mesh of meshArray as Array<THREE.Mesh>){
        this.bbHeadMesh.add(mesh)
        if(bodyRegex.test(mesh.name)){
          this.bbBodyMesh.add(mesh)
        }
      }
      this.bbFullMesh.add(this.bbBodyMesh, this.bbHeadMesh)
      this.bbFullMesh.rotateY(Math.PI)
      scene.add(this.bbFullMesh)
    }
  }
}
