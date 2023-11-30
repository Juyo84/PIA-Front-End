import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { FireStorageService } from 'src/app/Modelos/fire-storage.service';
import { Galeria, Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.css'],
})
export class GaleriaPage implements OnInit {

  constructor(private bd: BaseDatosService, private auth: AuthService, private router: Router,
    private fireStorage: FireStorageService, private loadingCtrl: LoadingController) {

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

    this.getGaleria();

  }

  isModalOpenImagen = false;
  isModalOpenVideo = false;
  isModalOpenGaleria = false;
  botonGuardar = false;

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

  multimedia: Galeria = {

    autor: '',
    fecha: '',
    foto: '',
    titulo: '',
    tema: '',
    uid: '',
    tipo: '',

  };

  setMultmedia: Galeria = {

    autor: '',
    fecha: '',
    foto: '',
    titulo: '',
    tema: '',
    uid: '',
    tipo: '',

  };

  resultados: Galeria[] = [];
  galeria: Galeria[] = [];

  temas = ['Todos', 'Sistema Solar', 'Planetas', 'Astrologia', 'Tecnologia'];
  tipos = ['Imagen/Video', 'Imagen', 'Video'];

  files: any
  loading: any

  uid = ""

  getUsuario(uid: string){

    this.bd.getDoc<Usuarios>('Usuarios', uid).subscribe(res => {

      if(res != null){

        this.usuario = res;
        
      }

    });

  }

  setOpenImagen(isOpen: boolean, multimediaMostrar: Galeria) {

    this.isModalOpenImagen = isOpen;

    this.multimedia = multimediaMostrar;
  
  }

  setOpenVideo(isOpen: boolean, multimediaMostrar: Galeria) {

    this.isModalOpenVideo = isOpen;

    this.multimedia = multimediaMostrar;
  
  }

  setOpenGaleria(isOpen: boolean) {

    this.isModalOpenGaleria = isOpen;
  
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

  handleInput(event: any){

    const query = event.target.value.toLowerCase();
    this.resultados = this.galeria.filter((d) => d.titulo.toLowerCase().indexOf(query) > -1);
  
  }

  handleSelectTipo(event: any) {

    const query = event.target.value;
    
    if(query == "Imagen/Video" || query == ""){

      this.resultados = this.galeria;
      return;

    }

    this.resultados = this.galeria.filter((d) => d.tipo.indexOf(query) > -1);
  
  }

  handleSelectTema(event: any) {

    const query = event.target.value;
    
    if(query == "Todos" || query == ""){

      this.resultados = this.galeria;
      return;

    }

    this.resultados = this.galeria.filter((d) => d.tema.indexOf(query) > -1);
  
  }

  getGaleria(){

    this.showLoading();

    this.bd.getCollectionChanges<Galeria>('Galeria').subscribe(res =>{

      this.galeria = res;
      this.resultados = res;
      this.dismissLoading();

    });

  }

  cambiarImagen(event: any){

    this.files = event.target.files[0];
    
    if(this.files.type.includes("video")){

      this.setMultmedia.tipo = "Video";
      
    }else{
      
      if(this.files.type.includes("image")){
        
        this.setMultmedia.tipo = "Imagen";
        
      }else{
        
        console.log("NO ES UN TIPO DE MULTIMEDIA");
        return
        
      }
      
    }

    this.setMultmedia.foto = URL.createObjectURL(this.files);
    
    this.botonGuardar = true;
    
  }

  async subirMultimedia(){

    this.showLoading();

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const res = await this.fireStorage.subirImagen(this.files, 'Galeria', this.setMultmedia.titulo);

    this.setMultmedia.fecha = hoy.toLocaleDateString();
    this.setMultmedia.foto = res;
    this.setMultmedia.autor = this.usuario.usuario;
    this.setMultmedia.uid = this.bd.crearId();

    await this.bd.createDocument<Galeria>(this.setMultmedia, 'Galeria', this.setMultmedia.uid);
    
    this.setMultmedia = {
  
      autor: '',
      fecha: '',
      foto: '',
      titulo: '',
      tema: '',
      uid: '',
      tipo: '',
  
    };

    this.isModalOpenGaleria = false;
    this.botonGuardar = false;

    this.dismissLoading();

  }

}
