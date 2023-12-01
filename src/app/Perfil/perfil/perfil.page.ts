import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { FireStorageService } from 'src/app/Modelos/fire-storage.service';
import { Usuarios } from 'src/app/Modelos/interfaces';
import { countries } from 'countries-list';
import { AlertController, IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.css'],
})
export class PerfilPage implements OnInit {

  constructor(private fireStorage: FireStorageService, private bd: BaseDatosService,
    private auth: AuthService, private router: Router, private alertController: AlertController) {

    this.auth.stateAuth().subscribe(res => {

      if(res != null){

        this.uid = res.uid;
        this.getUsuario(this.uid);

      }else{
        
        this.router.navigateByUrl('Home/LogIn');
        
      }
      
    });
    
  }
  
  ngOnInit() {
    
    this.cambiarProfesion();
    this.cambiarPais();

  }
  
  usuario: Usuarios = {
    
    apellido: '',
    uid: '',
    correo: '',
    foto: '',
    intereses: [],
    nombre: '',
    pais: '',
    profesion: '',
    usuario: '',
    veridico: false
    
  };
  
  @ViewChild('listaIntereses') miSelect!: IonSelect;
  
  profesiones = ['Desconocido', 'Profesor', 'Estudiante', 'Divulgador', 'Aficionado'];
  intereses = ['Planetas', 'Constelaciones', 'Telescopio', 'Estrellas', 'Exploraciones'];
  
  paisesLista = Object.values(countries);
  
  botonGuardar = false;
  mostrarSelect = false;
  
  uid = '';
  
  files: any;
  paises: any;
  loading: any;

  admin(){

    this.usuario.veridico = true;

  }

  mostrarIntereses() {

    this.miSelect.open();
  
  }

  cambiarProfesion(){

    const caracterAMover = this.usuario.profesion.charAt(0);

    this.usuario.profesion = this.usuario.profesion.slice(1);
    this.profesiones.unshift(caracterAMover);

  }

  cambiarPais(){

    const paisesNombres = this.paisesLista.map((pais) => pais.name);
    const caracterAMover = this.usuario.pais.charAt(0);

    this.usuario.pais = this.usuario.pais.slice(1);
    paisesNombres.unshift(caracterAMover);
    this.paises = paisesNombres;

  }

  async cambiarImagen(event: any){

    this.files = event.target.files[0];
    
    this.usuario.foto = URL.createObjectURL(this.files); 
    this.botonGuardar = true;

  }

  async guardarCambios(){

    const alert = await this.alertController.create({

      header: 'Guardar Cambios',
      message: '¿Desea guardar los datos?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
          handler: async() => {
            
            if(this.files != undefined || this.files != null){

              

              const res = await this.fireStorage.subirImagen(this.files, 'Usuarios', this.usuario.usuario); 
              this.usuario.foto = res;
              
              this.bd.createDocument<Usuarios>(this.usuario, 'Usuarios', this.usuario.uid);
  
              this.files = null;            
              this.botonGuardar = false;

              
            
            }
            
          },
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });

    await alert.present();

  }

  getUsuario(id: string){

    this.bd.getDoc<Usuarios>('Usuarios', id).subscribe(res => {

      if (res != undefined) {

        this.usuario = res;

      }


    });

  }

  async enviarCorreo(){

    const alert = await this.alertController.create({

      header: 'Restablecer contraseña',
      message: 'Se le enviara un correo electrónico para restablecer la contraseña',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: async() => {
            
            await this.auth.enviarCorreoRestablecimiento(this.usuario.correo).catch(error => {
        
              console.log("Error al enviar el correo");
        
            });
            
          },
        }
      ]
    });

    await alert.present();

  }

  async eliminarCuenta(){

    const alert = await this.alertController.create({
      
      header: 'Eliminar cuenta',
      subHeader: 'Se necesita iniciar sesion nuevamente',
      message: '¿Esta seguro de realizar la operacion?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
          handler: async() => {
            
            this.router.navigateByUrl('ReLogIn');

          },
        },
        {
          text: 'No',
          role: 'Cancel',
          handler: () => {
            
            return;
            
          },
        }
      ]
    });
    
    await alert.present();

  }

}
