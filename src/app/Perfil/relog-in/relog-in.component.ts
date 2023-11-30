import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-relog-in',
  templateUrl: './relog-in.component.html',
  styleUrls: ['./relog-in.component.css'],
})
export class RelogInComponent  implements OnInit {

  constructor(private router: Router, public auth: AuthService, private bd: BaseDatosService,
    private alertController: AlertController) { 

    this.auth.stateAuth().subscribe(res => {

      if(res !== null){

        this.uid = res.uid;
        this.getUsuario(this.uid);


      }else{

        router.navigate(['Home']);

      }

    });

  }

  async ngOnInit() {

    const uid = this.auth.getUid();

  }

  confirmacionBotones = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        return;
      },
    },
    {
      text: 'Si',
      role: 'confirm',
    },
  ];

  okBoton = [
    {
      text: 'Ok',
      role: 'confirm',
    }
  ];

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

  };

  contra =  '';
  uid = '';
  correo = '';

  regresarHome(){

    this.router.navigate(['Perfil']);

  }

  async alerta(titulo: string, sub: string, mensaje: string, botones: any) {
    
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: sub,
      message: mensaje,
      buttons: botones,
    });

    await alert.present();

  }

  getUsuario(id: string){

    this.bd.getDoc<Usuarios>('Usuarios', id).subscribe(res => {

      if (res != undefined) {

        this.usuario = res;

      } else {

        console.log("Error de Query");

      }

    });

  }

  async logInCorreo(){

    if(this.usuario.correo != this.correo){

      this.alerta('Error en el Login', '', 'Intente de nuevo', this.okBoton);
      return;

    }

    await this.auth.login(this.correo, this.contra).catch(_ => {

      this.alerta('Error de login', '', 'Intente de nuevo', this.okBoton);
      return;

    });
    
    const uid = await this.auth.getUid();
    this.usuario.uid = uid!;

    await this.auth.eliminarCuenta().then(_ =>{

      this.alerta('Eliminacion de la cuenta', '', 'La operacion fue exitosa', this.confirmacionBotones);
      this.uid = '';
      this.router.navigate(['Home']);

    });

  }

  async logInGoogle(){
    
    if(this.usuario.correo != this.correo){

      this.alerta('Error en el Login', '', 'Intente de nuevo', this.confirmacionBotones);
      return;

    }

    await this.auth.logInGoogle().catch(_ => {

      return this.alerta('Error de login', '', 'Intente de nuevo', this.okBoton);

    });;
    
    const uid = await this.auth.getUid();
    this.usuario.uid = uid!;

    await this.auth.eliminarCuenta().then(_ =>{

      this.alerta('Eliminacion de la cuenta', '', 'La operacion fue exitosa', this.okBoton);
      this.uid = '';
      this.router.navigate(['Home']);

    });

  }

}
