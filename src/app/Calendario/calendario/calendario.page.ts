import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { FireStorageService } from 'src/app/Modelos/fire-storage.service';
import { Eventos, Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.css'],
})
export class CalendarioPage implements OnInit {

  constructor(private bd: BaseDatosService, private auth: AuthService,
    private router: Router, private fireStorage: FireStorageService) { 

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

    this.getEventos();

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    this.fechaHoy = hoy.toLocaleDateString();
    
  }

  isModalOpen = false;
  isModalOpenEvento = false;
  esteMes = false;
  estaSemana = false;
  soloHoy = false;

  uid = '';
  fechaHoy = '';

  eventos: Eventos[] = [];
  resultados: Eventos[] = [];

  eventoMostrar: Eventos = {

    fecha: '',
    foto: '',
    informacion: '',
    tema: '',
    titulo: '',
    uid: '',

  }

  evento: Eventos = {

    fecha: '',
    foto: '',
    informacion: '',
    tema: '',
    titulo: '',
    uid: '',

  }

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

  loading: any;
  files: any;

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

  validarCampos(){

    if(this.evento.foto != "" && this.evento.informacion != "" && this.evento.tema != ""){

      return true;

    }else{

      return false;

    }

  }

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
  
  }

  
  setOpenEvento(isOpen: boolean) {

    this.isModalOpenEvento = isOpen;
  
  }

  

  cambiarImagen(event: any){

    this.files = event.target.files[0];
    
    this.evento.foto = URL.createObjectURL(this.files);
    
  }

  async agregarEvento(){

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    this.evento.fecha = hoy.toLocaleDateString();
    this.evento.uid = this.bd.crearId();
    
    const res = await this.fireStorage.subirImagen(this.files, 'Eventos', this.evento.uid);
    this.evento.foto = res;

    await this.bd.createDocument<Eventos>(this.evento, 'Eventos', this.evento.uid);

    this.isModalOpen = false;

    this.evento = {

      fecha: '',
      foto: '',
      informacion: '',
      tema: '',
      titulo: '',
      uid: '',
  
    };

  }

  getUsuario(id: string){

    this.bd.getDoc<Usuarios>('Usuarios', id).subscribe(res => {

      if (res != undefined) {

        this.usuario = res;

      }

    });

  }

  resumen(texto: string){

    texto = texto.replace(/<br>/g, "");
    
    const resumen = texto.substring(0,310) + "...";
    return resumen;

  }

  abrirEvento(evento: Eventos){

    this.eventoMostrar = evento;
    this.isModalOpenEvento = true;

  }

  getEventos(){

    this.bd.getCollectionChanges<Eventos>('Eventos').subscribe(res => {

      this.eventos = res.sort((a, b) => {
        return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
      });

      this.resultados = this.eventos;


    });

  }

  mostrarSemana(){

    this.estaSemana = !this.estaSemana;

    if(!this.estaSemana){

      this.resultados = this.eventos;
      return;

    }

    const hoy = new Date();
    const primerDiaSemana = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - hoy.getDay());
    const ultimoDiaSemana = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - hoy.getDay() + 6);

    this.resultados = this.eventos.filter((d) => {
      const partesFecha = d.fecha.split('/');
      const fechaNoticia = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`);
      
      return (fechaNoticia >= primerDiaSemana && fechaNoticia <= ultimoDiaSemana);
    });

  }

  mostrarMes(){

    this.esteMes = !this.esteMes;

    if(!this.esteMes){

      this.resultados = this.eventos;
      return;

    }
    
    const hoy = new Date();
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    this.resultados = this.eventos.filter((d) => {
      const partesFecha = d.fecha.split('/');
      const fechaNoticia = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`);
      
      return (fechaNoticia >= primerDiaMes && fechaNoticia <= ultimoDiaMes);
    });
    
  }

  mostrarHoy(){

    this.soloHoy = !this.soloHoy;

    if(!this.soloHoy){

      this.resultados = this.eventos;
      return;

    }
    
    const hoy = new Date();
    this.resultados = this.eventos.filter((d) => {
    const partesFecha = d.fecha.split('/');
    const fechaNoticia = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`);
    return (
      fechaNoticia.getDate() === hoy.getDate() &&
      fechaNoticia.getMonth() === hoy.getMonth() &&
      fechaNoticia.getFullYear() === hoy.getFullYear()
    );
    });
    
  }

}
