import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';
import { SistemaSolarPage } from '../../Sistema-Solar/sistema-solar/sistema-solar.page';
import { ConstelacionesPage } from '../../Constelacion/constelaciones/constelaciones.page';
import { ArticulosPage } from 'src/app/Articulos/articulos/articulos.page';
import { ForoPage } from 'src/app/Foro/foro/foro.page';
import { GaleriaPage } from 'src/app/Galeria/galeria/galeria.page';
import { PerfilPage } from 'src/app/Perfil/perfil/perfil.page';
import { GuiasPage } from 'src/app/Guias/guias/guias.page';
import { NoticiasPage } from 'src/app/Noticias/noticias/noticias.page';
import { CalendarioPage } from 'src/app/Calendario/calendario/calendario.page';
import { LogInComponent } from 'src/app/Home/log-in/log-in.component';

const routes: Routes = [
  {
    path: '',
    component: InicioPage
  },
  {
    path: 'Inicio',
    component: InicioPage
  },
  {
    path: 'Sistema-Solar',
    component: SistemaSolarPage
  },
  {
    path: 'Constelaciones',
    component: ConstelacionesPage
  },
  {
    path: 'Articulos',
    component: ArticulosPage
  },
  {
    path: 'Foro',
    component: ForoPage
  },
  {
    path: 'Galeria',
    component: GaleriaPage
  },
  {
    path: 'Perfil',
    component: PerfilPage
  },
  {
    path: 'Guias',
    component: GuiasPage
  },
  {
    path: 'Noticias',
    component: NoticiasPage
  },
  {
    path: 'Calendario',
    component: CalendarioPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
