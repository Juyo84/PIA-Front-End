import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-planeta-component',
  template: ''
})
export class PlanetaComponent implements OnInit {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private earthMesh!: THREE.Mesh;
  private isInteracting: boolean = false;

  constructor(private el: ElementRef, private ngZone: NgZone) { }

  ngOnInit() {
    this.init();
    this.animate();
  }

  private init() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 56), 0.1, 1000);
    this.camera.position.z = 2;

    this.scene.background = new THREE.Color(0x0F1116);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight - 56);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.createSpheres();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = false;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;

    this.renderer.domElement.addEventListener('mousedown', () => {
      this.isInteracting = true;
    });

    this.renderer.domElement.addEventListener('mouseup', () => {
      this.isInteracting = false;
    });

    window.addEventListener('resize', () => {
      this.camera.updateProjectionMatrix();
    });
  }

  private createSpheres() {
    const geometry = new THREE.SphereGeometry(1, 35, 35);
    const texture = new THREE.TextureLoader().load('assets/Texturas/Tierra.png');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.earthMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.earthMesh);
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.animate());
    });

    if (!this.isInteracting) {
      this.earthMesh.rotation.y += 0.002;
    }

    this.renderer.render(this.scene, this.camera);
  }
}