import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { Guias, Usuarios } from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-guias',
  templateUrl: './guias.page.html',
  styleUrls: ['./guias.page.css'],
})
export class GuiasPage implements OnInit {

  constructor(private router: Router, private bd: BaseDatosService, private auth: AuthService,
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

  isModalOpen = false;

  temas =['Todos', 'Instrumentos', 'Astrologia', 'Tecnologia'];

  loading: any

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


  resumen(texto: string){

    texto = texto.replace(/<br>/g, "");

    const resumen = texto.substring(0,310) + "...";
    return resumen;

  }

  getGuias(){

    this.showLoading();

    this.bd.getCollectionChanges<Guias>('Guias').subscribe(res => {

      this.guias = res;
      this.resultados = res;
      this.dismissLoading();

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
