import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-noticias-noticia',
  templateUrl: './menu-noticias-noticia.component.html',
  styleUrls: ['./menu-noticias-noticia.component.css'],
})
export class MenuNoticiasNoticiaComponent  implements OnInit {

  constructor(private alertController: AlertController, private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {}

  async alertCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesion',
      subHeader: '¿Desea cerrar sesion?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.router.navigateByUrl('Home');
            this.popoverController.dismiss();
          }
        },
        {
          text: 'No',
        },
      ]
    });

    await alert.present();

  }

  regresarInicio(){

    this.router.navigateByUrl('Inicio');
    this.popoverController.dismiss();

  }

  irPerfil(){

    this.router.navigateByUrl('Perfil');
    this.popoverController.dismiss();

  }
  
  navegar(tema: any){

    this.router.navigate(['Inicio', tema]);
    this.popoverController.dismiss();

  }


}
