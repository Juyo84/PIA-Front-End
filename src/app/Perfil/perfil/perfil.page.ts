import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { FireStorageService } from 'src/app/Modelos/fire-storage.service';
import { Usuarios } from 'src/app/Modelos/interfaces';
import { countries } from 'countries-list';
import { IonSelect } from '@ionic/angular';
import { error } from 'console';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.css'],
})
export class PerfilPage implements OnInit {

  constructor(private fireStorage: FireStorageService, private bd: BaseDatosService,
    private auth: AuthService, private router: Router) {

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
    usuario: ''
    
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
    const res = await this.fireStorage.subirImagen(this.files, 'Usuarios', this.usuario.usuario);
    
    this.usuario.foto = res;
    this.botonGuardar = true;

  }

  guardarCambios(){

    this.bd.createDocument<Usuarios>(this.usuario, 'Usuarios', this.usuario.uid).then((_) => {

      console.log("Guardado con exito");

    });

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

  async enviarCorreo(){

    await this.auth.enviarCorreoRestablecimiento(this.usuario.correo).then(_ => {

      console.log("Se envio el correo");

    }).catch(error => {

      console.log("Error al enviar el correo");

    });

  }

}
