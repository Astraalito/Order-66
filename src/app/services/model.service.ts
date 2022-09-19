import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Material, Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  gltfLoader: GLTFLoader = new GLTFLoader();
  modelMesh : Object3D;

  constructor() { }

  public loadModel(src : string, scene : THREE.Scene) {
    const group = new THREE.Group();
    this.gltfLoader.load(
      src,
      (gltf) => {
        const modelObjects = [...gltf.scene.children]
        for(const object of modelObjects){
          group.add(object)
        }
        this.modelMesh = group;
        this.modelMesh.rotateY(Math.PI)
        
        scene.add(this.modelMesh)
      },
      () => {
        console.log('progress');
        
      }
    )}
}
