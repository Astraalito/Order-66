import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModelService } from 'src/app/services/model.service';
import * as THREE from 'three'
import { Object3D, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

@Component({
  selector: 'app-three-widget',
  templateUrl: './three-widget.component.html',
  styleUrls: ['./three-widget.component.css']
})
export class ThreeWidgetComponent implements OnInit {

  @ViewChild('widget') canvasElement : ElementRef;
  gltfLoader: GLTFLoader = new GLTFLoader();

  windowSizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  constructor(private modelService: ModelService) { }

  ngOnInit(): void {   
  }

  ngAfterViewInit() {

    const canvas = this.canvasElement.nativeElement;

    //Scene
    const scene = new THREE.Scene()

    //Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.set(1024, 1024)
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.camera.left = - 7
    directionalLight.shadow.camera.top = 7
    directionalLight.shadow.camera.right = 7
    directionalLight.shadow.camera.bottom = - 7
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Camera
    const camera = new THREE.PerspectiveCamera(55, this.windowSizes.width / this.windowSizes.height, 0.1, 100)
    camera.position.set(0,2,3);
    scene.add(camera)

    this.modelService.loadModel('assets/models/lala/untitled.gltf', scene);

    window.addEventListener('resize', () =>
    {
      // Update sizes
      this.windowSizes.width = window.innerWidth
      this.windowSizes.height = window.innerHeight
      
      // Update camera
      camera.aspect = this.windowSizes.width / this.windowSizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(this.windowSizes.width, this.windowSizes.height)      
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

     //Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true
    })
    renderer.setSize(this.windowSizes.width, this.windowSizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))    

    // Animate
    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        if(this.modelService.modelMesh){
          //camera.lookAt(this.modelService.modelMesh.position);
          camera.lookAt(new THREE.Vector3(0, 0.3, 0));
          // this.modelService.modelMesh.children[6].rotateZ(Math.PI / 48)
          // this.rotateAround(this.modelService.modelMesh.children[5], this.modelService.modelMesh.children[6].position)
        }
        
        // Render
        renderer.render(scene, camera)
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
  }

  private rotateAround(target : Object3D, pivot : THREE.Vector3){
    let moveDir = new THREE.Vector3(
      pivot.x - target.position.x,
      pivot.y - target.position.y,
      pivot.z - target.position.z
    );
    moveDir.normalize();
    let moveDist = target.position.distanceTo(pivot);
    target.translateOnAxis(moveDir, moveDist);
    target.rotateX(0);
    target.rotateY(0);
    target.rotateZ(-Math.PI / 48);
    moveDir.multiplyScalar(-1);
    target.translateOnAxis(moveDir, moveDist);
  }
}
