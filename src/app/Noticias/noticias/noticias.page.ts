import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Noticias, Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.css'],
})
export class NoticiasPage implements OnInit {

  constructor(private router: Router, private auth: AuthService, private bd: BaseDatosService) { 

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

    this.getNoticias();

  }
  
  noticias: Noticias[] = [];
  respuesta: Noticias[] = [];

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

  uid = '';

  irNoticia(idPublicacionNoticia: any){

    this.router.navigate(['/Noticias', idPublicacionNoticia]);

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

  getNoticias(){

    this.bd.getCollectionChanges<Noticias>('Noticias').subscribe(res => {

      this.noticias = res;
      this.respuesta = res;

    });

  }

  resumen(texto: string){

    texto = texto.replace(/<br>/g, "");
    
    const resumen = texto.substring(0,310) + "...";
    return resumen;

  }

}
