import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModelService } from 'src/app/services/model.service';
import * as THREE from 'three'
import { Camera, Mesh, Object3D, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { isPowerOfTwo } from 'three/src/math/MathUtils';

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

    //Fog
    const color = new THREE.Color('#eff0f3');  // white
    const near = 7.5;
    const far = 9.5;
    scene.fog = new THREE.Fog(color, near, far);

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

    //Ground
    const groundGeometry = new THREE.BoxGeometry(10,0.1,10);
    const ground = new Mesh(
      groundGeometry,
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('white')
      })
    )
    ground.position.y = -1
    scene.add(ground)

    // Camera
    const camera = new THREE.PerspectiveCamera(50, this.windowSizes.width / this.windowSizes.height, 0.1, 100)
    camera.position.set(0,3,5);
    scene.add(camera)    

    //Load Model
    this.modelService.loadModel('assets/models/lala/untitled.gltf', scene);

    //Resize
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

    //Cursor
    const cursor = {
      x: 0,
      y: 0
    }

    window.addEventListener('mousemove', (event) => {
      cursor.x = (event.clientX / this.windowSizes.width) * 2 - 1
      cursor.y = (event.clientY / this.windowSizes.width) * 2 - 1
    })

    /**
     * Animate
     */
    const clock = new THREE.Clock()
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        if(this.modelService.bb8Mesh){
          camera.lookAt(new THREE.Vector3(0, 0.3, 0));
          //displacement
          const newPos = (this.getMousePosInWorld(cursor.x, camera))
          const currentPos = this.modelService.bb8Mesh.position
          const distance = ((newPos.x - currentPos.x) / 2) * 0.1
          this.modelService.bb8Mesh.position.x += distance
          
          //Ball rolling
          const rot = this.computeRotationOfDisplacement(distance, 1.5269315242767334)
          this.modelService.bb8Mesh.children[0].rotation.z += rot;
          
          // head rotation
          const baseRotationZ = 0
          const currentRotationZ = this.modelService.bb8HeadGroup.rotation.z
          const rotationDifference = baseRotationZ - currentRotationZ
          this.rotateAround(this.modelService.bb8HeadGroup, this.modelService.bb8Mesh.children[0].position, new THREE.Vector3(0, 0, distance * 2 + rotationDifference))
        }

        // Render
        renderer.render(scene, camera)
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
  }

  /**
   * Custom Methods
   */
  private rotateAround(target : Object3D, pivot : THREE.Vector3, rotationValues : THREE.Vector3){
   
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

  private computeRotationOfDisplacement(distance: number, diameter: number){
    const circumference = diameter * Math.PI;
    const revolutionRatio = distance / circumference;
    return revolutionRatio * (2 * Math.PI);
  }

  getMousePosInWorld(cursorX : number, camera: THREE.Camera){
    var vec = new THREE.Vector3(cursorX * 0.75, 0, 0);
    var pos = new THREE.Vector3();

    vec.unproject(camera);
    vec.sub( camera.position ).normalize();

    var distance = - camera.position.z / vec.z;
    pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
    return pos;
  }
}
