import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Material, Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  gltfLoader: GLTFLoader = new GLTFLoader();
  bb8Mesh : Object3D;
  bb8HeadGroup : Object3D;

  constructor() { }

  public loadModel(src : string, scene : THREE.Scene) {
    const bb8Group = new THREE.Group();
    const headGroup = new THREE.Group();
    this.gltfLoader.load(
      src,
      (gltf) => {
        const modelObjects = [...gltf.scene.children]
        for(const object of modelObjects){
          bb8Group.add(object)   
          if(object.name != 'body-sphere') {headGroup.add(object)}       
        }
        this.bb8HeadGroup = headGroup;
        bb8Group.add(headGroup)
        this.bb8Mesh = bb8Group;
        console.log(this.bb8Mesh);
        
        this.bb8Mesh.rotateY(Math.PI)
        scene.add(this.bb8Mesh)
      },
      () => {
        console.log('progress');
        
      }
    )}
}
