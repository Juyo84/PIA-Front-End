import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Articulos } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css'],
})
export class ArticuloComponent  implements OnInit {

  constructor(private bd: BaseDatosService, private ruta: ActivatedRoute,
    private loadingCtrl: LoadingController, private router: Router) { }

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

  loading: any

  irAtras(){

    this.router.navigateByUrl('Articulos');

  }

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


  getArticulos(){

    this.showLoading();

    this.bd.getDoc<Articulos>('Articulos', this.idArticulos).subscribe(res => {

      if(res != null){

        this.articulo = res;

      }else{

        console.log("ERROR EN EL GET DE ARTICULOS");

      }

      this.dismissLoading();

    });

  }

}
