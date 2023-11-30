import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css'],
})
export class MenuInicioComponent  implements OnInit {

  constructor(private alertController: AlertController, private router: Router,
    private popoverController: PopoverController, private auth: AuthService,
    private bd: BaseDatosService) { 
      
      this.auth.stateAuth().subscribe(res => {

        if(res != null){
  
          this.uid = res.uid;
          this.getUsuario(this.uid);
  
        }else{
          
          this.router.navigateByUrl('Home/LogIn');
          
        }
        
      });

    }

  async ngOnInit() {}

  usuario: Usuarios = {

    apellido: '',
    correo: '',
    uid: '',
    foto: '',
    intereses: [],
    nombre: '',
    pais: '',
    profesion: '',
    usuario: '',
    veridico: false

  }

  uid = '';

  getUsuario(id: string){

    this.bd.getDoc<Usuarios>('Usuarios', id).subscribe(res => {

      if (res != undefined) {

        this.usuario = res;

      } else {

        console.log("Error de Query");

      }

    });

  }

  async alertCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesion',
      subHeader: '¿Desea cerrar sesion?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.auth.logout();
            this.router.navigateByUrl('Home');
            this.popoverController.dismiss();
          }
        },
        {
          text: 'No'
        }
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
