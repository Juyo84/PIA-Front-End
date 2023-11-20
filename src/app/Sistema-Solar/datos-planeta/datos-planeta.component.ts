import { Component, OnInit } from '@angular/core';
import { PlanetaComponent } from '../planeta/planeta.component';
import { ActivatedRoute } from '@angular/router';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Planetas } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-datos-planeta',
  templateUrl: './datos-planeta.component.html',
  styleUrls: ['./datos-planeta.component.css'],
})
export class DatosPlanetaComponent  implements OnInit {

  constructor(private ruta: ActivatedRoute, private bd: BaseDatosService) { }

  nombrePlaneta = this.ruta.snapshot.params['id'];
  planetaTitulo = this.nombrePlaneta.toString().toUpperCase();

  planeta: Planetas = {

    atmosfera: '',
    diametro: '',
    distancia: '',
    exploraciones: [],
    lunas: 0,
    masa: '',
    nombre: '',

  }

  ngOnInit() {
  
    this.bd.getDocumentChanges<Planetas>('Planetas/' + this.nombrePlaneta).subscribe(res =>{

      if(res != undefined){

        this.planeta = res;

      }else{

        console.log("ERROR EN QUERY, CHECAR CODIGO");

      }

    });

  }

}
