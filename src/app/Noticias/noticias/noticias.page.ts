import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/Modelos/auth.service';
import { BaseDatosService } from 'src/app/Modelos/base-datos.service';
import { FireStorageService } from 'src/app/Modelos/fire-storage.service';
import { Noticias, Usuarios} from 'src/app/Modelos/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.css'],
})
export class NoticiasPage implements OnInit {

  constructor(private router: Router, private auth: AuthService, private bd: BaseDatosService,
    private loadingCtrl: LoadingController, private fireStorage: FireStorageService) { 

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
  resultados: Noticias[] = [];

  noticia: Noticias = {

    fecha: '',
    foto: '',
    informacion: '',
    tema: '',
    titulo: '',
    uid: '',

  };

  usuario: Usuarios = {
    
    apellido: '',
    uid: '',
    correo: '',
    foto: '',
    intereses: [],
    nombre: '',
    pais: '',
    profesion: '',
    usuario: '',
    veridico: false
    
  };

  uid = '';

  loading: any;
  files: any;

  estaSemana = false;
  esteMes = false;
  soloHoy = false;
  isModalOpen = false;
  admin = false;

  temas = ['Todos', 'Sistema Solar', 'Planetas', 'Astrologia', 'Tecnologia'];

  irNoticia(idPublicacionNoticia: any){

    this.router.navigate(['/Noticias', idPublicacionNoticia]);

  }

  validarCampos(){

    if(this.noticia.foto != "" && this.noticia.informacion != "" && this.noticia.tema != ""){

      return true;

    }else{

      return false;

    }

  }

  getUsuario(id: string){

    this.bd.getDoc<Usuarios>('Usuarios', id).subscribe(res => {

      if (res != undefined) {

        this.usuario = res;

      }

    });

  }

  cambiarImagen(event: any){

    this.files = event.target.files[0];
    
    this.noticia.foto = URL.createObjectURL(this.files);
    
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


  getNoticias(){

    this.showLoading();

    this.bd.getCollectionChanges<Noticias>('Noticias').subscribe(res => {

      this.noticias = res;
      this.resultados = res;

      this.dismissLoading();

    });

  }

  resumen(texto: string){

    texto = texto.replace(/<br>/g, "");
    
    const resumen = texto.substring(0,310) + "...";
    return resumen;

  }

  mostrarSemana(){

    this.estaSemana = !this.estaSemana;

    if(!this.estaSemana){

      this.resultados = this.noticias;
      return;

    }

    const hoy = new Date();
    const primerDiaSemana = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - hoy.getDay());
    const ultimoDiaSemana = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - hoy.getDay() + 6);

    this.resultados = this.noticias.filter((d) => {
      const partesFecha = d.fecha.split('/');
      const fechaNoticia = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`);
      
      return (fechaNoticia >= primerDiaSemana && fechaNoticia <= ultimoDiaSemana);
    });

  }

  mostrarMes(){

    this.esteMes = !this.esteMes;

    if(!this.esteMes){

      this.resultados = this.noticias;
      return;

    }
    
    const hoy = new Date();
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    this.resultados = this.noticias.filter((d) => {
      const partesFecha = d.fecha.split('/');
      const fechaNoticia = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`);
      
      return (fechaNoticia >= primerDiaMes && fechaNoticia <= ultimoDiaMes);
    });
    
  }

  mostrarHoy(){

    this.soloHoy = !this.soloHoy;

    if(!this.soloHoy){

      this.resultados = this.noticias;
      return;

    }
    
    const hoy = new Date();
    this.resultados = this.noticias.filter((d) => {
    const partesFecha = d.fecha.split('/');
    const fechaNoticia = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`);
    return (
      fechaNoticia.getDate() === hoy.getDate() &&
      fechaNoticia.getMonth() === hoy.getMonth() &&
      fechaNoticia.getFullYear() === hoy.getFullYear()
    );
    });
    
  }

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
  
  }

  async agregarNoticia(){

    this.showLoading();

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    this.noticia.fecha = hoy.toLocaleDateString();
    this.noticia.uid = this.bd.crearId();
    
    await this.fireStorage.subirImagen(this.files, 'Noticias', this.noticia.uid);
    await this.bd.createDocument<Noticias>(this.noticia, 'Noticias', this.noticia.uid);

    this.isModalOpen = false;

    this.noticia = {

      fecha: '',
      foto: '',
      informacion: '',
      tema: '',
      titulo: '',
      uid: '',
  
    };

    this.dismissLoading();

  }

  handleSelect(event: any) {

    const query = event.target.value;
    
    if(query == "Todos" || query == ""){

      this.resultados = this.noticias;
      return;

    }

    this.resultados = this.noticias.filter((d) => d.tema.indexOf(query) > -1);
  
  }

}
