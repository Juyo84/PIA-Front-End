import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Guias, Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-guias',
  templateUrl: './guias.page.html',
  styleUrls: ['./guias.page.css'],
})
export class GuiasPage implements OnInit {

  constructor(private router: Router, private bd: BaseDatosService, private auth: AuthService) {

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

    this.getGuias();

  }

  uid = '';

  guias: Guias[] = [];
  
  resultados: Guias[] = [];

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

  }

  guia: Guias = {

    descripcion: '',
    foto: '',
    informacion: '',
    titulo: '',
    uid: '',
    tema: '',
    
  }

  isModalOpen = false;

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

  loading: any;
  files: any;

  async nuevaGuia(){

    this.guia.uid = this.bd.crearId();

    await this.bd.createDocument<Guias>(this.guia, 'Guia', this.guia.uid);

    this.guia = {

      descripcion: '',
    foto: '',
    informacion: '',
    titulo: '',
    uid: '',
    tema: '',

    }

    this.isModalOpen = false;
    

  }

  irGuia(idGuia: any){

    this.router.navigate(['/Guias', idGuia]);

  }

  getUsuario(id: string){

    this.bd.getDoc<Usuarios>('Usuarios', id).subscribe(res => {

      if (res != undefined) {

        this.usuario = res;

      }

    });

  }

  validarCampos(){

    if(this.guia.informacion != "" && this.guia.tema != "" && this.guia.titulo != "" && this.guia.foto != ""){

      return true;

    }else{

      return false;

    }

  }

  cambiarImagen(event: any){

    this.files = event.target.files[0];
    
    this.guia.foto = URL.createObjectURL(this.files);
    
  }

  resumen(texto: string){

    texto = texto.replace(/<br>/g, "");

    const resumen = texto.substring(0,310) + "...";
    return resumen;

  }

  getGuias(){

    this.bd.getCollectionChanges<Guias>('Guias').subscribe(res => {

      this.guias = res;
      this.resultados = res;

    });

  }

  handleInput(event: any) {

    const query = event.target.value.toLowerCase();
    this.resultados = this.guias.filter((d) => d.titulo.toLowerCase().indexOf(query) > -1);
  
  }

  handleSelect(event: any) {

    const query = event.target.value;
    
    if(query == "Todos" || query == ""){

      this.resultados = this.guias;
      return;

    }

    this.resultados = this.guias.filter((d) => d.tema.indexOf(query) > -1);
  
  }

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
  
  }

}
