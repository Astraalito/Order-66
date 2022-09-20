import { Injectable } from '@angular/core';
import { ModelService } from '../services/model.service';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class BbModelStore {

  bbFullMesh : THREE.Object3D
  bbHeadMesh : THREE.Group
  bbBodyMesh : THREE.Object3D

  constructor(private modelService: ModelService) { }

  initiateStore(scene: THREE.Scene) {
    //Load Model
    this.modelService.modelMesh.subscribe( (meshArray) => {
      this.computeBBParts(meshArray, scene)
    })
    this.modelService.loadModel('assets/models/lala/untitled.gltf')
  }

  private computeBBParts(meshArray: THREE.Object3D[], scene: THREE.Scene) {
    const bb8Head = new THREE.Group();
    const bb8Group = new THREE.Group();
  
    if(meshArray[0].name != 'empty') {
      for(const mesh of meshArray){
        bb8Group.add(mesh)   
        if(mesh.name != 'body-sphere') {bb8Head.add(mesh)} 
      }
      this.bbHeadMesh = bb8Head
      bb8Group.add(bb8Head)
      this.bbFullMesh = bb8Group
  
      this.bbFullMesh.rotateY(Math.PI)
      scene.add(this.bbFullMesh)
    }
  }
}
