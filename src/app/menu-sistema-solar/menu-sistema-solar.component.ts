import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-sistema-solar',
  templateUrl: './menu-sistema-solar.component.html',
  styleUrls: ['./menu-sistema-solar.component.css'],
})
export class MenuSistemaSolarComponent  implements OnInit {

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
  
  regresarInicio(){

    this.router.navigateByUrl('Inicio');

  }

}
