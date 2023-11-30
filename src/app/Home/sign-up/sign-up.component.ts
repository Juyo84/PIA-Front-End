import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent  implements OnInit {

  constructor(private router: Router, public auth: AuthService, private bd: BaseDatosService,
    private loadingCtrl: LoadingController) { 

    this.auth.stateAuth().subscribe(res => {

      if(res !== null){

        router.navigate(['Inicio']);

      }

    });

  }

  async ngOnInit() {

    await this.auth.getUid();

  }

  usuario: Usuarios = {

    apellido: '',
    uid: '',
    correo: '',
    foto: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    intereses: [],
    nombre: '',
    pais: '',
    profesion: 'Desconocido',
    usuario: '',
    veridico: false

  }

  contrasena = '';

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

  irLogIn(){

    this.router.navigate(['Home', 'LogIn']);
  
  }

  async signUpCorreo(){

    this.showLoading();
    
    await this.auth.logout();
    
    const crendenciales = {

      correo: this.usuario.correo,
      contrasena: this.contrasena

    }
    
    await this.auth.registro(crendenciales.correo, crendenciales.contrasena);
    
    this.entrar();

  }

  async signUpGoogle(){

    await this.auth.logInGoogle();

    this.entrar();
    
  }
  
  async entrar(){

    await this.auth.getUid().then(res => {

      if(res !== null){

        this.usuario.uid = res;

      }

    });

    await this.bd.createDocument<Usuarios>(this.usuario, 'Usuarios', this.usuario.uid);
    
    this.dismissLoading();

    this.router.navigate(['Perfil']);

  }

}
