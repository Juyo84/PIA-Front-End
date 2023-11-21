import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Constelaciones } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-constelaciones',
  templateUrl: './constelaciones.page.html',
  styleUrls: ['./constelaciones.page.css'],
})
export class ConstelacionesPage implements OnInit {

  constructor(private router: Router, public bd: BaseDatosService) { }

  ngOnInit() {

    this.getConstelaciones();

  }

  constelaciones: Constelaciones[] = [];
  resultados: Constelaciones[] = [];

  busqueda = '';

  irConstelacion(idConstelacion: any){

    this.router.navigate(['/Constelaciones', idConstelacion]);

  }

  getConstelaciones(){

    this.bd.getCollectionChanges<Constelaciones>('Constelaciones').subscribe(res => {
      
      this.constelaciones = res;
      this.resultados = res;

    });

  }

  handleInput(event: any) {

    const query = event.target.value.toLowerCase();
    this.resultados = this.constelaciones.filter((d) => d.nombre.toLowerCase().indexOf(query) > -1);
  
  }

}
