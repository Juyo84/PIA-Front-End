import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SistemaSolarPage } from './sistema-solar.page';
import { InicioPage } from '../inicio/inicio.page';

const routes: Routes = [
  {
    path: '',
    component: SistemaSolarPage
  },
  {
    path: 'Sistema-Solar',
    component: SistemaSolarPage
  },
  {
    path: 'Inicio',
    component: InicioPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SistemaSolarPageRoutingModule {}
