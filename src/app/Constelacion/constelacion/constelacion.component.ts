import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Constelaciones } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-constelacion',
  templateUrl: './constelacion.component.html',
  styleUrls: ['./constelacion.component.css'],
})
export class ConstelacionComponent  implements OnInit {

  constructor(private ruta: ActivatedRoute, private bd: BaseDatosService,
    private router: Router) { }

  nombreConstelacion = this.ruta.snapshot.params['id'];

  constelacion: Constelaciones = {

    ascension: '',
    descripcion: '',
    estrellaPrincipal: '',
    estrellas: 0,
    nombre: '',
    resumen: '',
    simbolismo: '',
    visibilidad: ''

  }

  ngOnInit() {

    this.bd.getDocumentChanges<Constelaciones>('Constelaciones/' + this.nombreConstelacion).subscribe(res => {

      if(res != undefined){

        this.constelacion = res;

      }else{

        console.log("ERROR EN EL QUERY");

      }

    });

  }

  irAtras(){

    this.router.navigateByUrl('Constelaciones');

  }


}
