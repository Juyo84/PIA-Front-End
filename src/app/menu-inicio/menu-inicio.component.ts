import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css'],
})
export class MenuInicioComponent  implements OnInit {

  constructor(private alertController: AlertController, private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {}

  async alertCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesion',
      subHeader: '¿Desea cerrar sesion?',
      buttons: this.botones
    });

    await alert.present();

  }

  public botones = [
    {
      text: 'Si',
      handler: () => {
        this.router.navigate(['Home']);
        this.popoverController.dismiss();
      }
    },
    {
      text: 'No',
    },
  ];

  irSistemaSolar(){

    this.router.navigate(['Inicio', 'Sistema-Solar']);
    this.popoverController.dismiss();

  }

}
