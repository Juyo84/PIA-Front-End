import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Articulos } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.css'],
})
export class ArticulosPage implements OnInit {

  constructor(private router: Router, public bd: BaseDatosService) { }

  ngOnInit() {

    this.getArticulos();

  }

  articulos: Articulos[] = [];
  resultados: Articulos[] = [];

  temas =['Todos', 'Sistema Solar', 'Planetas', 'Astrologia', 'Tecnologia'];

  irArticulo(idArticulo: any){

    this.router.navigate(['/Articulos', idArticulo]);

  }

  getArticulos(){

    this.bd.getCollectionChanges<Articulos>('Articulos').subscribe(res => {

      this.articulos = res;
      this.resultados = res;

    });

  }

  handleInput(event: any) {

    const query = event.target.value.toLowerCase();
    this.resultados = this.articulos.filter((d) => d.titulo.toLowerCase().indexOf(query) > -1);
  
  }

}
