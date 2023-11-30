import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Articulos, Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.css'],
})
export class ArticulosPage implements OnInit {

  constructor(private router: Router, public bd: BaseDatosService, private auth: AuthService,
    private loadingCtrl: LoadingController) {

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

  uid = "";

  nuevoArticulo = false;

  temas =['Todos', 'Sistema Solar', 'Planetas', 'Astrologia', 'Tecnologia'];

  loading: any

  resumen(texto: string){

    texto = texto.replace(/<br>/g, "");

    const resumen = texto.substring(0,309) + "...";
    return resumen;

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

  irArticulo(idArticulo: any){

    this.router.navigate(['/Articulos', idArticulo]);

  }

  getArticulos(){

    this.showLoading();

    this.bd.getCollectionChanges<Articulos>('Articulos').subscribe(res => {

      this.articulos = res;
      this.resultados = res;
      this.dismissLoading();

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
