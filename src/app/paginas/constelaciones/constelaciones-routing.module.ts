import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstelacionesPage } from './constelaciones.page';
import { ConstelacionComponent } from 'src/app/componentes/constelacion/constelacion.component';
import { InicioPage } from '../inicio/inicio.page';
import { SistemaSolarPage } from '../sistema-solar/sistema-solar.page';

const routes: Routes = [
  {
    path: '',
    component: ConstelacionesPage
  },
  {
    path: 'Constelaciones',
    component: ConstelacionesPage
  },
  {
    path: 'Sistema-Solar',
    component: SistemaSolarPage
  },
  {
    path: 'Inicio',
    component: InicioPage
  },
  {
    path: ':id',
    component: ConstelacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstelacionesPageRoutingModule {}
