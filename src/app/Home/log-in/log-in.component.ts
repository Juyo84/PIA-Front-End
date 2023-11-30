import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
    private loadingCtrl: LoadingController) { 

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

  async logInCorreo(){

    this.showLoading();

    await this.auth.login(this.usuario.correo, this.contra).catch(error => {

      console.log("error")
      this.dismissLoading();
      return;

    });
    
    const uid = await this.auth.getUid();
    this.usuario.uid = uid!;

    this.dismissLoading();

    this.router.navigate(['Inicio']);

  }

  async logInGoogle(){

    this.showLoading();

    await this.auth.logInGoogle();
    
    const uid = await this.auth.getUid();
    this.usuario.uid = uid!;

    this.dismissLoading();

    this.router.navigate(['Inicio']);

  }


}
