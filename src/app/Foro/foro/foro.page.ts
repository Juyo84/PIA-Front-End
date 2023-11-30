import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Foro, Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.css'],
})
export class ForoPage implements OnInit {

  constructor(private router: Router, public bd: BaseDatosService, private auth: AuthService) {

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

    this.getForo();

  }

  foro: Foro[] = [];
  resultados: Foro[] = [];

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

  publicacion: Foro = {

    autor: '',
    fecha: '',
    informacion: '',
    publicaciones: [],
    titulo: '',
    tema: '',
    uid: '',
    hora: '',

  }

  isModalOpen = false;

  uid = "";

  temas =['Todos', 'Sistema Solar', 'Planetas', 'Astrologia', 'Tecnologia'];  

  getUsuario(uid: string){

    this.bd.getDoc<Usuarios>('Usuarios', uid).subscribe(res =>{

      if(res != null){

        this.usuario = res;

      }

    })

  }

  resumen(texto: string){

    texto = texto.replace(/<br>/g, "");

    const resumen = texto.substring(0,310) + "...";
    return resumen;

  }

  irForo(idPublicacionForo: any){

    this.router.navigate(['/Foro', idPublicacionForo]);

  }

  getForo(){

    this.bd.getCollectionChanges<Foro>('Foro').subscribe(res =>{

      this.foro = res;
      this.resultados = res;

    });

  }
  
  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
  
  }

  handleInput(event: any){

    const query = event.target.value.toLowerCase();
    this.resultados = this.foro.filter((d) => d.titulo.toLowerCase().indexOf(query) > -1);
  
  }

  async nuevaPublicacion(){

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const hora: number = hoy.getHours();
    const minutos: number = hoy.getMinutes();

    this.publicacion.hora = hora + ":" + minutos;
    this.publicacion.fecha = hoy.toLocaleDateString();
    this.publicacion.autor = this.usuario.usuario;
    this.publicacion.uid = this.bd.crearId();

    await this.bd.createDocument<Foro>(this.publicacion, 'Foro', this.publicacion.uid);

    this.publicacion = {

      autor: '',
      fecha: '',
      informacion: '',
      publicaciones: [],
      titulo: '',
      tema: '',
      uid: '',
      hora: '',

    }

    this.isModalOpen = false;

  }

}
