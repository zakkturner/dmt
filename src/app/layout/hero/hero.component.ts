import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Input,
  ViewChild,
  HostListener,
} from '@angular/core';

import * as THREE from 'three';
import vertexShader from '../../../assets/shaders/vertex.glsl';
import fragmentShader from '../../../assets/shaders/fragment.glsl';
import atmosphereVertexShader from '../../../assets/shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from '../../../assets/shaders/atmosphereFragment.glsl';

import gsap from 'gsap';
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  @HostListener('document:mousemove', ['$event']) onMouseMove(e: any) {
    this.mouse.x = (e.clientX / innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / innerHeight) * 2 + 1;
    // console.log(this.mouse);
    // console.log(e);
    this.mouseFollow();
  }

  mouse: { x: number; y: number } = {
    x: 0,
    y: 0,
  };

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private renderer: any;
  private scene!: THREE.Scene;

  // Fuction that creates the scene
  private createScene() {
    // Sets the Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    // Sets the Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Camera Position
    this.camera.position.z = 15;
    this.camera.rotation.x - Math.PI / 2;
    this.scene.add(this.atmosphere);
    this.group.add(this.sphere);
    this.scene.add(this.group);
    // this.scene.add(this.sphere, this.atmosphere);
    this.atmosphere.scale.set(1.1, 1.1, 1.1);
  }

  // Earth Mesh Creation

  sphere: THREE.Mesh = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        globeTexture: {
          value: new THREE.TextureLoader().load(
            '../../../assets/images/earth2.jpg'
          ),
        },
      },
    })
  );

  // Atmosphere

  atmosphere: THREE.Mesh = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
  );

  // Mouse follow
  mouseFollow() {
    gsap.to(this.group.rotation, {
      y: this.mouse.x * 0.5,
      duration: 2,
    });
  }

  group = new THREE.Group();
  // This function creates the renderer
  private startingRenderingLoop() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // if (
    //   this.renderer.domElement.width !== innerWidth ||
    //   this.renderer.domElement.height !== innerHeight
    // ) {
    //   this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    //   this.renderer.setPixelRatio(window.devicePixelRatio);
    //   this.camera.aspect = innerWidth / innerHeight;
    //   this.camera.updateProjectionMatrix();
    // }

    // Sets component variable to equal the Hero Component
    const component: HeroComponent = this;
    (function render(this: any) {
      requestAnimationFrame(render);

      component.renderer.render(component.scene, component.camera);
      // this.sphere.rotation.y += 0.001;
    })();
  }

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.sphere.rotation.y += 0.001;
      // this.group.rotation.y = this.mouse.x * 0.5;
      // this.group.rotation.x = this.mouse.y ;
    }, 20);
  }

  // Initialize render
  ngAfterViewInit(): void {
    this.createScene();
    this.startingRenderingLoop();
  }
}
