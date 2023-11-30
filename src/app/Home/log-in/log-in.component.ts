import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent  implements OnInit {

  constructor(private router: Router, public auth: AuthService, private bd: BaseDatosService) { 

    this.auth.stateAuth().subscribe(res => {

      if(res !== null){

        router.navigate(['Inicio']);


      }else{

        this.initUsuario();

      }

    });

  }

  async ngOnInit() {

    const uid = this.auth.getUid();

  }

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

    await this.auth.login(this.usuario.correo, this.contra);
    
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
