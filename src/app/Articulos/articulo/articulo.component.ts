import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Articulos } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css'],
})
export class ArticuloComponent  implements OnInit {

  constructor(private bd: BaseDatosService, private ruta: ActivatedRoute,
    private router: Router) { }

  idArticulos = this.ruta.snapshot.params['id'];

  ngOnInit() {

    this.getArticulos();

  }

  articulo: Articulos = {

    autor: "",
    fecha: "",
    foto: "",
    informacion: "",
    titulo: "",
    tema: "",
    uid: "",

  };

  irAtras(){

    this.router.navigateByUrl('Articulos');

  }

  getArticulos(){

    this.bd.getDoc<Articulos>('Articulos', this.idArticulos).subscribe(res => {

      if(res != null){

        this.articulo = res;

      }else{

        console.log("ERROR EN EL GET DE ARTICULOS");

      }

    });

  }

}
