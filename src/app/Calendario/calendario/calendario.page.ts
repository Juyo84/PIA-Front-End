import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'firebase/auth';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Eventos, Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.css'],
})
export class CalendarioPage implements OnInit {

  constructor(private router: Router, private bd: BaseDatosService) { }

  ngOnInit() {

    this.getEventos();

  }

  isModalOpen = false;

  uid = '';

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

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
  
  }

  resumen(texto: string){

    texto = texto.replace(/<br>/g, "");
    
    const resumen = texto.substring(0,310) + "...";
    return resumen;

  }

  abrirEvento(evento: Eventos){

    this.eventoMostrar = evento;
    this.isModalOpen = true;

  }

  getEventos(){

    this.bd.getCollectionChanges<Eventos>('Eventos').subscribe(res => {

      this.eventos = res;
      this.resultados = res;

    });

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
    this.resultados = this.eventos.filter((d) => d.titulo.toLowerCase().indexOf(query) > -1);
  
  }

}
