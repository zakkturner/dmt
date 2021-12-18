import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import * as THREE from 'three';
import vertexShader from '../../../assets/shaders/vertex.glsl'


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

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
    this.scene.add(this.sphere);
  }

  // Earth Mesh Creation

  sphere: THREE.Mesh = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
     vertexShader: ,
     fragmentShader:
    })
  );

  // This function creates the renderer
  private startingRenderingLoop() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Sets component variable to equal the Hero Component
    const component: HeroComponent = this;
    (function render() {
      requestAnimationFrame(render);

      component.renderer.render(component.scene, component.camera);
    })();
  }

  constructor() {}

  ngOnInit(): void {}

  // Initialize render
  ngAfterViewInit(): void {
    this.createScene();
    this.startingRenderingLoop();
  }
}
