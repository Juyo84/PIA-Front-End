import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Noticias } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css'],
})
export class NoticiaComponent  implements OnInit {

  constructor(private ruta: ActivatedRoute, private bd: BaseDatosService, private router: Router) { }

  ngOnInit() {

    this.getNoticia();

  }

  idNoticia = this.ruta.snapshot.params['id'];

  noticia: Noticias = {

    fecha: '',
    foto: '',
    informacion: '',
    tema: '',
    titulo: '',
    uid: '',

  }

  loading: any

  

  irAtras(){

    this.router.navigateByUrl('Noticias');

  }

  getNoticia(){

    this.bd.getDoc<Noticias>('Noticias', this.idNoticia).subscribe(res => {

      if(res != null){

        this.noticia = res;

      }else{

        console.log("ERROR EN EL GET DE ARTICULOS");

      }


    });

  }

}
