import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sistema-solar',
  templateUrl: './sistema-solar.page.html',
  styleUrls: ['./sistema-solar.page.css'],
})
export class SistemaSolarPage implements OnInit {

  constructor(private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {}

  loading: any

  irPlaneta(planetaSeleccionado: any){

    this.router.navigate(['/Sistema-Solar', planetaSeleccionado]);
    
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

}
