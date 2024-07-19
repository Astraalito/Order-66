import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core'
import { trigger, style, transition, animate } from '@angular/animations'
import { ThreeCustomOperationsService } from 'src/app/services/three-custom-operations.service'
import { BbModelStore } from 'src/app/stores/bb-model.store';
import { PageController } from 'src/app/controllers/page-controller';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import * as THREE from 'three'
import gsap from 'gsap'
import { DeviceService } from 'src/app/services/device.service';
import { Vector3 } from 'three';


@Component({
  selector: 'app-bb-three-widget',
  templateUrl: './bb-three-widget.component.html',
  styleUrls: ['./bb-three-widget.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1}))
      ])
    ]),
  ]
})
export class BbThreeWidgetComponent implements AfterViewInit {

  @ViewChild('widget') canvasElement : ElementRef;
  activeSection : number;

  rollAnimIsEnabled = false

  cursor = {
    x: 0,
    y: 0
  }

  windowSizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  cameraConf = {
    conf: "default",
    x: 0,
    y: 0,
    z: 0,
    targetPos: new THREE.Vector3()
  }

  constructor(
    private bbStore : BbModelStore,
    private customOperations : ThreeCustomOperationsService,
    private deviceService : DeviceService,
    public pageController : PageController
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
    this.computeCameraConf()
    camera.position.set(this.cameraConf.x,this.cameraConf.y,this.cameraConf.z);
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
        color: new THREE.Color('white'),
        toneMapped: false
      })
    )
    ground.position.y = -1
    scene.add(ground) 

    //Fog
    const fogProperties = {
      fogColor : new THREE.Color('#eff0f3'),
      fogNear : 7.5,
      fogFar : 9.5
    }
    scene.fog = new THREE.Fog(fogProperties.fogColor, fogProperties.fogNear, fogProperties.fogFar);
    

    /**
     * LIGHTS
     */
    const hemiLight = new THREE.HemisphereLight(0xfffaea, 0x080820, 4);
    scene.add(hemiLight)

    const spotlight = new THREE.SpotLight(0xffa95c, 4);
    scene.add(spotlight)

    /**
     * RENDERER
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true
    })
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 2.3
    renderer.setSize(this.windowSizes.width, this.windowSizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))   

    /**
     * CONTROLS
     */
     const sectionControl = document.getElementsByClassName('section1-control')[0] as HTMLElement;
     
     const controls = new OrbitControls(camera, sectionControl)
     controls.autoRotate = true
     controls.enableDamping = true
     controls.enableZoom = false
     controls.enablePan = false
     controls.target = this.cameraConf.targetPos
     controls.maxPolarAngle = Math.PI / 2
     controls.minPolarAngle = Math.PI / 6

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

      this.computeCameraConf()
      this.sectionChangeActions(this.activeSection, camera, fogProperties, scene, controls)
    })

    this.pageController.activeSectionObservalbe.subscribe( (activeSection) => {
      this.activeSection = activeSection
      this.sectionChangeActions(this.activeSection, camera, fogProperties, scene, controls)
    })


    /**
     * ANIMATE
     */
    const clock = new THREE.Clock()
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        if(this.bbStore.bbFullMesh){
          // Update controls
          controls.update()
          // this.rollingAnim(camera)
          if(this.deviceService.isOnMobile) {
            this.rollingAnim(this.deviceService.deviceOrientation, camera)
          } else {
            this.rollingAnim(this.cursor.x, camera)
          }
        }
        spotlight.position.set(
          camera.position.x + 10,
          camera.position.y + 10,
          camera.position.z + 10,
        )
        // Render
        renderer.render(scene, camera)
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    tick()
  }

  private rollingAnim(directionValue : number, camera: THREE.Camera) {
    if(this.rollAnimIsEnabled) {
      //displacement
      const newPos = (this.customOperations.getZposUnderMouse(directionValue, camera))
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

  private computeCameraConf(){
    if(this.windowSizes.width <= 750) {
      this.cameraConf.conf = "mobile"
      this.cameraConf.x = 0;
      this.cameraConf.y = 2;
      this.cameraConf.z = 6;
      this.cameraConf.targetPos = new THREE.Vector3(0, 0.8, 0);
    } else {
      this.cameraConf.conf = "default"
      this.cameraConf.x = 0;
      this.cameraConf.y = 2;
      this.cameraConf.z = 5.5;
      this.cameraConf.targetPos = new THREE.Vector3(0, 0.8, 0);
    }
  }

  private sectionChangeActions(newSection: number, camera: THREE.PerspectiveCamera, fog: any, scene: THREE.Scene, controls: OrbitControls){
    const lighter = this.bbStore.bbBodyMesh.getObjectByName('b-lighter')
    const trap = this.bbStore.bbBodyMesh.getObjectByName('b-trap')
    switch(newSection) {
      case 1: {
        console.log('SECTION ACTIVE 1')
        controls.enabled = true
        controls.autoRotate = true
        gsap.to(this.bbStore.bbFullMesh.position, { x:this.cameraConf.x, duration: 0.5 })
        gsap.to(this.bbStore.bbHeadMesh.rotation, { z:0, duration: 0.5 })
        controls.target = this.cameraConf.targetPos
        break; 
      }
      case 2: {
        console.log('SECTION ACTIVE 2')
        this.rollAnimIsEnabled = true
        controls.enabled = false
        controls.autoRotate = false
        gsap.to(camera.position, { x:this.cameraConf.x, duration: 0.5 })
        gsap.to(camera.position, { y:3.1, duration: 0.5 })
        gsap.to(camera.position, { z:(this.cameraConf.z - 0.5), duration: 0.5 })
        gsap.to(controls.target, { y:0.35, duration: 0.5})
        gsap.to(".widget", {opacity: 1, delay: 0.5, duration: 0.5})
        break; 
      }
      case 3: {
        console.log('SECTION ACTIVE 3')
        break; 
      }
      case 4: {
        console.log('SECTION ACTIVE 4')
        gsap.to(this.bbStore.bbFullMesh.position, { x:(this.cameraConf.conf == "mobile" ? -0.3 : -1.5), duration: 0.5 })
        gsap.to(this.bbStore.bbFullMesh.rotation, { y:-Math.PI/3.5, duration: 0.5 })

        if(lighter && trap){
          gsap.to(trap.rotation, {z: Math.PI/2, duration: 0.5})
          gsap.to(lighter?.position, { x:-0.3, delay: 0.5, duration: 0.5 })
        }
        gsap.to(this.bbStore.bbBodyMesh.rotation, { z:0, duration: 0.5 })
        gsap.to(this.bbStore.bbBodyMesh.rotation, { y:-Math.PI/2, duration: 0.5 })

        gsap.to(camera.position, { x:0, duration: 0.5 })
        gsap.to(camera.position, { y:1, duration: 0.5 })
        gsap.to(camera.position, { z:this.cameraConf.z, duration: 0.5 })

        gsap.to(controls.target, { y:(this.cameraConf.conf == "mobile" ? 1.5 : 0.7), duration: 0.5})
        break; 
      }
      default: {
        console.log('DEFAULT')
        this.rollAnimIsEnabled = false
        controls.enabled = false
        controls.autoRotate = false
        gsap.to(camera.position, { x:this.cameraConf.x, duration: 0.5 })
        gsap.to(camera.position, { y:2, duration: 0.5 })
        gsap.to(camera.position, { z:this.cameraConf.z, duration: 0.5 })
        gsap.to(this.bbStore.bbFullMesh.position, { x:0, duration: 0.5 })
        gsap.to(this.bbStore.bbHeadMesh.rotation, { z:0, duration: 0.5 })
        controls.target = new THREE.Vector3(0, 0.8, 0)
        gsap.to(".widget", {opacity: 1, delay: 0.5, duration: 0.5})
        if(lighter && trap){
          gsap.to(trap.rotation, {z: 0, delay: 0.5, duration: 0.5})
          gsap.to(lighter.position, { x:0.3, duration: 0.5 })
        }
        gsap.to(this.bbStore.bbFullMesh.rotation, { y:0, duration: 0.5 })
        gsap.to(this.bbStore.bbBodyMesh.rotation, { y:0, duration: 0.5 })
        break; 
      }
    }
  }
}
