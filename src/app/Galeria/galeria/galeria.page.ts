import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Galeria } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.css'],
})
export class GaleriaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  resultados: Galeria[] = [];
  galeria: Galeria[] = [];

  temas = ['Todos', 'Sistema Solar', 'Planetas', 'Astrologia', 'Tecnologia'];
  tipos = ['Imagen/Video', 'Imagen', 'Video'];

  irImagen(idImagen: any){

    this.router.navigate(['/Galeria', idImagen]);

  }

  handleInput(event: any){

    const query = event.target.value.toLowerCase();
    this.resultados = this.galeria.filter((d) => d.titulo.toLowerCase().indexOf(query) > -1);
  
  }

}
