import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ThreeCustomOperationsService {

  constructor() { }

  public rotateAround(target : THREE.Object3D, pivot : THREE.Vector3, rotationValues : THREE.Vector3){
    let moveDir = new THREE.Vector3(
      pivot.x - target.position.x,
      pivot.y - target.position.y,
      pivot.z - target.position.z
    );
    moveDir.normalize();
    let moveDist = target.position.distanceTo(pivot);
    target.translateOnAxis(moveDir, moveDist);
    target.rotateX(rotationValues.x);
    target.rotateY(rotationValues.y);
    target.rotateZ(rotationValues.z);
    moveDir.multiplyScalar(-1);
    target.translateOnAxis(moveDir, moveDist);
  }

  public computeWheelRotation(distance: number, diameter: number): number{
    const circumference = diameter * Math.PI;
    const revolutionRatio = distance / circumference;
    return revolutionRatio * (2 * Math.PI);
  }

  public getZposUnderMouse(cursorX : number, camera: THREE.Camera): THREE.Vector3{
    var vec = new THREE.Vector3(cursorX * 0.75, 0, 0);
    var pos = new THREE.Vector3();

    vec.unproject(camera);
    vec.sub( camera.position ).normalize();

    var distance = - camera.position.z / vec.z;
    pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
    return pos;
  }
}
