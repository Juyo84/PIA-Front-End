import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { FireStorageService } from 'src/app/Modelos/fire-storage.service';
import { Articulos, Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.css'],
})
export class ArticulosPage implements OnInit {

  constructor(private router: Router, public bd: BaseDatosService, private auth: AuthService,
    private fireStorage: FireStorageService) {

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

    this.getArticulos();

    if(this.usuario.veridico == true){

      this.nuevoArticulo = true;

    }

  }

  articulos: Articulos[] = [];
  resultados: Articulos[] = [];

  usuario: Usuarios = {

    apellido: "",
    correo: "",
    uid: "",
    foto: "",
    intereses: [],
    nombre: "",
    pais: "",
    profesion: "",
    usuario: "",
    veridico: false

  };

  articulo: Articulos = {

    autor: '',
    fecha: '',
    foto: '',
    informacion: '',
    titulo: '',
    tema: '',
    uid: '',

  }

  uid = "";

  nuevoArticulo = false;
  isModalOpen = false;

  files: any

  temas = [
    "Todos",
    "Estrella",
    "Planeta",
    "Constelación",
    "Galaxia",
    "Nebulosa",
    "Cúmulo estelar",
    "Agujero negro",
    "Telescopio",
    "Órbita",
    "Eclipse",
    "Satélite",
    "Planeta enano",
    "Espacio interestelar",
    "Astronauta",
    "Sistema Solar",
    "Exoplaneta",
    "Meteorito",
    "Astrofísica",
    "Cosmología",
    "Observatorio",
    "Tecnologia",
    "Otros"
  ];

  resumen(texto: string){

    texto = texto.replace(/<br>/g, "");

    const resumen = texto.substring(0,309) + "...";
    return resumen;

  }

  cambiarImagen(event: any){

    this.files = event.target.files[0];
    
    this.articulo.foto = URL.createObjectURL(this.files);
    
  }

  irArticulo(idArticulo: any){

    this.router.navigate(['/Articulos', idArticulo]);

  }

  getArticulos(){

    this.bd.getCollectionChanges<Articulos>('Articulos').subscribe(res => {

      this.articulos = res;
      this.resultados = res;

    });

  }

  async agregarArticulo(){

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    this.articulo.fecha = hoy.toLocaleDateString();
    this.articulo.uid = this.bd.crearId();
    
    const res = await this.fireStorage.subirImagen(this.files, 'Articulos', this.articulo.uid);
    this.articulo.foto = res;

    this.articulo.autor = this.usuario.nombre + " " + this.usuario.apellido;

    await this.bd.createDocument<Articulos>(this.articulo, 'Articulos', this.articulo.uid);

    this.isModalOpen = false;

    this.articulo = {

      autor: '',
      fecha: '',
      foto: '',
      informacion: '',
      titulo: '',
      tema: '',
      uid: '',
    
    };

  }

  validarCampos(){

    if(this.articulo.foto != "" && this.articulo.informacion != "" && this.articulo.tema != ""){

      return true;

    }else{

      return false;

    }

  }


  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
  
  }

  getUsuario(uid: string){

    this.bd.getDoc<Usuarios>('Usuarios', uid).subscribe(res => {

      if(res != null){

        this.usuario = res;

      }else{

        console.log("ERROR EN EL QUERY");

      }

    });

  }

  handleInput(event: any) {

    const query = event.target.value.toLowerCase();
    this.resultados = this.articulos.filter((d) => d.titulo.toLowerCase().indexOf(query) > -1);
  
  }

  handleSelect(event: any) {

    const query = event.target.value;
    
    if(query == "Todos" || query == ""){

      this.resultados = this.articulos;
      return;

    }

    this.resultados = this.articulos.filter((d) => d.tema.indexOf(query) > -1);
  
  }

}
