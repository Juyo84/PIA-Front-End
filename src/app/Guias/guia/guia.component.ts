import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Guias } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css'],
})
export class GuiaComponent  implements OnInit {

  constructor(private bd: BaseDatosService, private ruta: ActivatedRoute,
    private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {

    this.getGuias();

  }

  idGuias = this.ruta.snapshot.params['id'];

  guia: Guias = {

    descripcion: '',
    foto: '',
    informacion: '',
    titulo: '',
    uid: '',
    tema: '',

  }

  loading: any;

  irAtras(){

    this.router.navigateByUrl('Guias');

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

  getGuias(){

    this.showLoading();

    this.bd.getDoc<Guias>('Guias', this.idGuias).subscribe(res => {

      if(res != null){

        this.guia = res;

      }else{

        console.log("ERROR EN EL GET DE ARTICULOS");

      }

      this.dismissLoading();

    });

  }

}
