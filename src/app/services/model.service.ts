import * as THREE from 'three';
import { Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadStatus } from '../models/enums/loadStatus';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  loadStatus : BehaviorSubject<LoadStatus> = new BehaviorSubject<LoadStatus>(LoadStatus.NULL);
  gltfLoader: GLTFLoader = new GLTFLoader();

  public modelMesh: BehaviorSubject<Object3D[]> = new BehaviorSubject<Object3D[]>( [new THREE.Object3D()]);

  constructor() { 
    this.modelMesh.value[0].name = 'empty';
  }

  public loadModel(src : string): void {
    this.gltfLoader.load(
      src,
      (gltf) => {
        this.loadStatus.next(LoadStatus.DONE);
        const modelObjects = [...gltf.scene.children]
        this.modelMesh.next(modelObjects);
      },
      () => {
        this.loadStatus.next(LoadStatus.PROGRESS);
      }
    )}
}
