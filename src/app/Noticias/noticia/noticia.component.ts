import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Noticias } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css'],
})
export class NoticiaComponent  implements OnInit {

  constructor(private ruta: ActivatedRoute, private bd: BaseDatosService, 
    private loadingCtrl: LoadingController, private router: Router) { }

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

  async showLoading() {
    
    this.loading = await this.loadingCtrl.create({
      spinner: "circles",
      message: "Cargando",
    });

    await this.loading.present();
  }

  async dismissLoading() {
    const loading = await this.loadingCtrl.getTop();
    if (loading) {
      await loading.dismiss();
    }
  }

  irAtras(){

    this.router.navigateByUrl('Noticias');

  }

  getNoticia(){

    this.showLoading();

    this.bd.getDoc<Noticias>('Noticias', this.idNoticia).subscribe(res => {

      if(res != null){

        this.noticia = res;

      }else{

        console.log("ERROR EN EL GET DE ARTICULOS");

      }

      this.dismissLoading();

    });

  }

}
