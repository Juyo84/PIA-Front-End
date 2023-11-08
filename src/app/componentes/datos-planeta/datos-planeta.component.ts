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

  ngOnInit() {}

}
