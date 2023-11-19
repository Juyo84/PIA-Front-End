import { Component, OnInit } from '@angular/core';
import { PlanetaComponent } from '../planeta/planeta.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datos-planeta',
  templateUrl: './datos-planeta.component.html',
  styleUrls: ['./datos-planeta.component.css'],
})
export class DatosPlanetaComponent  implements OnInit {

  constructor(private ruta: ActivatedRoute) { }

  planeta = this.ruta.snapshot.params['id'];
  planetaTitulo = this.planeta.toString().toUpperCase();

  ngOnInit() {}

  diametro = "diametro1";
  masa = "masa1";
  distancia = "distancia1";
  atmosfera = "atomsfera1";
  lunas = 1;
  exploraciones = ["exploracion1", "exploracion2"];

}
