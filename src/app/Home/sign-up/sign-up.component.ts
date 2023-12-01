import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private alertController: AlertController) { 

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

  usuarioRepetido: Usuarios[] = [];

  okBoton = [
    {
      text: 'Ok',
      role: 'confirm',
    }
  ];

  contrasena = '';

  loading: any;

  

  regresarHome(){

    this.router.navigateByUrl('Home');

  }

  irLogIn(){

    this.router.navigate(['Home', 'LogIn']);
  
  }

  async signUpCorreo(){
    
    const crendenciales = {
      
      correo: this.usuario.correo,
      contrasena: this.contrasena
      
    }
    
    if(this.contrasena == '' || this.usuario.usuario == '' || this.usuario.correo == ''){
      
      this.alerta("Error", "Campos", "Llene todos los campos", this.okBoton);
      return;
      
    }
    
    if(this.contrasena.length < 6){
      
      this.alerta("Error", "Contraseña", "El tamaño de la contraseña debe de ser mas de 6 caracteres", this.okBoton);
      return;
      
    }
    
    this.bd.getCollectionChanges<Usuarios>('Usuarios').subscribe(res => {
      
      this.usuarioRepetido = res;
      
    });
    
    for(let repetido of this.usuarioRepetido){
      
      if(repetido.usuario == this.usuario.usuario){
        
        this.alerta("Error", "Usuario", "El nombre de usuario ya existe", this.okBoton);
        return;
        
      }
      
      if(repetido.correo == this.usuario.correo){
        
        this.alerta("Error", "Correo", "El correo ya existe", this.okBoton);
        return;
        
      }
      
    }
    
    await this.auth.logout();
    await this.auth.registro(crendenciales.correo, crendenciales.contrasena).catch(error => {
      
      this.alerta("Error", "", "Intente de nuevo", this.okBoton);
      return;

    });
    
    this.entrar();

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

    this.router.navigate(['Perfil']);

  }

}
