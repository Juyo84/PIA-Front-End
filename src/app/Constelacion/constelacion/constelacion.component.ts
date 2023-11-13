import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-constelacion',
  templateUrl: './constelacion.component.html',
  styleUrls: ['./constelacion.component.css'],
})
export class ConstelacionComponent  implements OnInit {

  constructor(private ruta: ActivatedRoute) { }

  constelacion = this.ruta.snapshot.params['id'];

  ngOnInit() {}

}
