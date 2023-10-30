import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';
import { SistemaSolarPage } from '../sistema-solar/sistema-solar.page';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
