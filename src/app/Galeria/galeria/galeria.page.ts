import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.css'],
})
export class GaleriaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irImagen(idImagen: any){

    this.router.navigate(['/Galeria', idImagen]);

  }

}
