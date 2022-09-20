import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as THREE from 'three'
import { ThreeCustomOperationsService } from 'src/app/services/three-custom-operations.service';
import { BbModelStore } from 'src/app/stores/bb-model.store';
import { PageController } from 'src/app/controllers/page-controller';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


@Component({
  selector: 'app-bb-three-widget',
  templateUrl: './bb-three-widget.component.html',
  styleUrls: ['./bb-three-widget.component.css']
})
export class BbThreeWidgetComponent implements AfterViewInit {

  @ViewChild('widget') canvasElement : ElementRef;

  cursor = {
    x: 0,
    y: 0
  }

  windowSizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  constructor(
    private bbStore : BbModelStore,
    private customOperations : ThreeCustomOperationsService,
    private pageController : PageController
    ) { }

  ngAfterViewInit() {

    /**
     * CORE
     */
    //Canvas
    const canvas = this.canvasElement.nativeElement

    //Scene
    const scene = new THREE.Scene()

    //Camera
    const camera = new THREE.PerspectiveCamera(50, this.windowSizes.width / this.windowSizes.height, 0.1, 100)
    camera.position.set(0,3,5);
    scene.add(camera)  

    /**
     * COMMON OBJECTS
     */
    //BB-8 MODELS
    this.bbStore.initiateStore(scene)

    //Ground
    const groundGeometry = new THREE.BoxGeometry(10,0.1,10);
    const ground = new THREE.Mesh(
      groundGeometry,
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('white')
      })
    )
    ground.position.y = -1
    scene.add(ground) 

    //Fog
    const fogColor = new THREE.Color('#eff0f3');  // white
    const fogNear = 7.5;
    const fogFar = 9.5;
    scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

    /**
     * LIGHTS
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    /**
     * RENDERER
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true
    })
    renderer.setSize(this.windowSizes.width, this.windowSizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))   

    /**
     * CONTROLS
     */
     const wrapperSection = document.getElementsByClassName('sections-wrapper')[0] as HTMLElement;
     console.log(wrapperSection);
     
     const controls = new OrbitControls(camera, wrapperSection)
     controls.autoRotate = true
     controls.enableDamping = true

    /**
     * LISTENERS
     */
    //Cursor Listener
    window.addEventListener('mousemove', (event) => {
      this.cursor.x = (event.clientX / this.windowSizes.width) * 2 - 1
      this.cursor.y = (event.clientY / this.windowSizes.width) * 2 - 1
    })

    //resize Listener
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


    /**
     * ANIMATE
     */
    const clock = new THREE.Clock()
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        if(this.bbStore.bbFullMesh){
          camera.lookAt(new THREE.Vector3(0, 0.3, 0));

          // Update controls
          controls.update()

          this.bbFollowMouseAnim(1, camera)
        }

        // Render
        renderer.render(scene, camera)
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()

  }

  private bbFollowMouseAnim(section: number, camera: THREE.Camera) {
    if(section == this.pageController.activeSection) {
      //displacement
      const newPos = (this.customOperations.getZposUnderMouse(this.cursor.x, camera))
      const currentPos = this.bbStore.bbFullMesh.position
      const distance = ((newPos.x - currentPos.x) / 2) * 0.1
      this.bbStore.bbFullMesh.position.x += distance
      
      //Ball rolling
      const rot = this.customOperations.computeWheelRotation(distance, 1.5269315242767334)
      this.bbStore.bbFullMesh.children[0].rotation.z += rot;
      
      // head rotation
      const baseRotationZ = 0
      const currentRotationZ = this.bbStore.bbHeadMesh.rotation.z
      const rotationDifference = baseRotationZ - currentRotationZ
      this.customOperations.rotateAround(this.bbStore.bbHeadMesh, this.bbStore.bbFullMesh.children[0].position, new THREE.Vector3(0, 0, distance * 2 + rotationDifference))
    }
  }
}
