import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Foro } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.css'],
})
export class ForoPage implements OnInit {

  constructor(private router: Router, public bd: BaseDatosService) { }

  ngOnInit() {

    this.getForo();

  }

  foro: Foro[] = [];
  resultados: Foro[] = [];

  temas =['Todos', 'Sistema Solar', 'Planetas', 'Astrologia', 'Tecnologia'];  

  irForo(idPublicacionForo: any){

    this.router.navigate(['/Foro', idPublicacionForo]);

  }

  getForo(){

    this.bd.getCollectionChanges<Foro>('Foro').subscribe(res =>{

      this.foro = res;
      this.resultados = res;

    });

  }

  handleInput(event: any){

    const query = event.target.value.toLowerCase();
    this.resultados = this.foro.filter((d) => d.titulo.toLowerCase().indexOf(query) > -1);
  
  }

}
