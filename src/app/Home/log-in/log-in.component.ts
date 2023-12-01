import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent  implements OnInit {

  constructor(private router: Router, public auth: AuthService, private bd: BaseDatosService,
    private alertController: AlertController) { 

    this.auth.stateAuth().subscribe(res => {

      if(res !== null){

        router.navigate(['Inicio']);


      }else{

        this.initUsuario();

      }

    });

  }

  async ngOnInit() { }

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

  loading: any;

  okBoton = [
    {
      text: 'Ok',
      role: 'confirm',
    }
  ];

  regresarHome(){

    this.router.navigateByUrl('Home');

  }

  irSignUp(){

    this.router.navigate(['Home', 'SignUp']);

  }

  initUsuario(){

    this.uid = '';
    this.usuario = {

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

  async logInCorreo(){

    if(this.usuario.correo == '' || this.contra == ''){

      this.alerta("Error", "Campos", "Llene todos los campos", this.okBoton);
      return;

    }



    await this.auth.login(this.usuario.correo, this.contra).catch(error => {

      this.alerta("Error", "Campos", "Intente de nuevo", this.okBoton);
      return;

    });
    
    const uid = await this.auth.getUid();
    this.usuario.uid = uid!;

    

    this.router.navigate(['Inicio']);

  }

  async logInGoogle(){

    await this.auth.logInGoogle();
    
    const uid = await this.auth.getUid();
    this.usuario.uid = uid!;

    this.router.navigate(['Inicio']);

  }

}
