import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';
import { SistemaSolarPage } from '../../Sistema-Solar/sistema-solar/sistema-solar.page';
import { ConstelacionesPage } from '../../Constelacion/constelaciones/constelaciones.page';
import { ArticulosPage } from 'src/app/Articulos/articulos/articulos.page';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
