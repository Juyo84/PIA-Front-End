import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private ringMesh!: THREE.Mesh;
  private isInteracting: boolean = false;

  constructor(private el: ElementRef, private ngZone: NgZone, private ruta: ActivatedRoute) { }

  texturaPlaneta = this.ruta.snapshot.params['id'];

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

    if(this.texturaPlaneta == "Saturno"){
      
      this.crearAnillos();

    }

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
    const texture = new THREE.TextureLoader().load('assets/Texturas/' + this.texturaPlaneta + '.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.earthMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.earthMesh);
  }

  private crearAnillos(){
    const ringGeometry = new THREE.TorusGeometry(1.5, 0.1, 2, 100);
    const texture = new THREE.TextureLoader().load('assets/Texturas/Saturno-Anillos.jpg');
    const ringMaterial = new THREE.MeshBasicMaterial({ map: texture });
    this.ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    this.ringMesh.position.set(0, 0, 0);
    this.ringMesh.rotation.x = Math.PI / 2;
    this.scene.add(this.ringMesh);
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
