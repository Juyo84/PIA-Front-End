import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Eventos, Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.css'],
})
export class CalendarioPage implements OnInit {

  constructor(private bd: BaseDatosService, private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.getEventos();

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    this.fechaHoy = hoy.toLocaleDateString();
    
  }

  isModalOpen = false;
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

  loading: any

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

    this.showLoading();

    this.bd.getCollectionChanges<Eventos>('Eventos').subscribe(res => {

      this.eventos = res.sort((a, b) => {
        return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
      });

      this.resultados = this.eventos;

      this.dismissLoading();

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
