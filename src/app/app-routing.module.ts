import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    loadChildren: () => import('./Home/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'Inicio',
    loadChildren: () => import('./Inicio/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'Sistema-Solar',
    loadChildren: () => import('./Sistema-Solar/sistema-solar/sistema-solar.module').then( m => m.SistemaSolarPageModule)
  },
  {
    path: 'Constelaciones',
    loadChildren: () => import('./Constelacion/constelaciones/constelaciones.module').then( m => m.ConstelacionesPageModule)
  },
  {
    path: 'Articulos',
    loadChildren: () => import('./Articulos/articulos/articulos.module').then( m => m.ArticulosPageModule)
  },
  {
    path: 'Perfil',
    loadChildren: () => import('./Perfil/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'Galeria',
    loadChildren: () => import('./Galeria/galeria/galeria.module').then( m => m.GaleriaPageModule)
  },
  {
    path: 'Foro',
    loadChildren: () => import('./Foro/foro/foro.module').then( m => m.ForoPageModule)
  },
  {
    path: 'Calendario',
    loadChildren: () => import('./Calendario/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'Guias',
    loadChildren: () => import('./Guias/guias/guias.module').then( m => m.GuiasPageModule)
  },
  {
    path: 'Noticias',
    loadChildren: () => import('./Noticias/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
