import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Foro, RespuestaForo, Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-publicacion-foro',
  templateUrl: './publicacion-foro.component.html',
  styleUrls: ['./publicacion-foro.component.css'],
})
export class PublicacionForoComponent  implements OnInit {

  constructor(private bd: BaseDatosService, private ruta: ActivatedRoute, private router: Router,
    private auth: AuthService, private loadingCtrl: LoadingController) { 

    this.auth.stateAuth().subscribe(res => {

      if(res != null){

        this.uid = res.uid;
        this.getUsuario(this.uid);

      }else{
        
        this.router.navigateByUrl('Home/LogIn');
        
      }
      
    });

  }

  idForo = this.ruta.snapshot.params['id'];

  ngOnInit() {

    this.getPublicacionForo();

  }

  uid = "";

  publicacionForo: Foro = {

    autor: "",
    fecha: "",
    informacion: "",
    publicaciones: [],
    titulo: "",
    tema: "",
    uid: "",
    hora: '',

  }

  publicacion: RespuestaForo = {

    autor: "",
    fecha: "",
    informacion: "",
    titulo: "",
    hora: ""

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
    veridico: false,

  }

  isModalOpen = false;

  loading: any;

  irAtras(){

    this.router.navigateByUrl('Foro');

  }

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


  getUsuario(uid: string){

    this.bd.getDoc<Usuarios>('Usuarios', uid).subscribe(res =>{

      if(res != null){

        this.usuario = res;

      }else{

        console.log("ERROR EN QUERY");

      }

    });

  }

  getPublicacionForo(){

    this.showLoading();

    this.bd.getDoc<Foro>('Foro', this.idForo).subscribe(res => {

      if(res != null){

        this.publicacionForo = res;

      }else{

        console.log("ERROR EN EL QUERY");

      }

      this.dismissLoading();

    });

  }

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
  
  }

  nuevaRespuesta(){

    this.showLoading();
    
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const hora: number = hoy.getHours();
    const minutos: number = hoy.getMinutes();

    this.publicacion.hora = hora + ":" + minutos;
    this.publicacion.fecha = hoy.toLocaleDateString();
    this.publicacion.autor = this.usuario.usuario;

    this.publicacionForo.publicaciones.push(this.publicacion);
    
    this.bd.updateDoc(this.publicacionForo, "Foro", this.publicacionForo.uid);
    
    this.publicacion = {

      autor: "",
      fecha: "",
      informacion: "",
      titulo: "",
      hora: ""

    };

    this.isModalOpen = false;

    this.dismissLoading();

  }

}
