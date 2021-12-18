import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import * as THREE from 'three';

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
  private renderer!: THREE.Renderer;
  private scene!: THREE.Scene;
  private starGeo!: THREE.BufferGeometry;
  private createScene() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 10;
    this.camera.rotation.x - Math.PI / 2;
    this.scene.add(this.sphere);
  }
  sphere: THREE.Mesh = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.MeshBasicMaterial({
      // color: 0xff0000
      map: new THREE.TextureLoader().load('/assets/images/earth2.jpg'),
    })
  );
  private startingRenderingLoop() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    let component: HeroComponent = this;
    (function render() {
      requestAnimationFrame(render);

      component.renderer.render(component.scene, component.camera);
    })();
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createScene();
    this.startingRenderingLoop();
  }
}
