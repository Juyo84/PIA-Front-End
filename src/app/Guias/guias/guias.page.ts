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

  temas =['Todos', 'Instrumentos', 'Astrologia', 'Tecnologia'];

  irGuia(idGuia: any){

    this.router.navigate(['/Guias', idGuia]);

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
    this.resultados = this.guias.filter((d) => d.titulo.toLowerCase().indexOf(query) > -1);
  
  }

}
