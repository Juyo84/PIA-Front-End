import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SistemaSolarPage } from './sistema-solar.page';
import { InicioPage } from '../../Inicio/inicio/inicio.page';
import { PlanetaComponent } from 'src/app/Sistema-Solar/planeta/planeta.component';
import { DatosPlanetaComponent } from 'src/app/Sistema-Solar/datos-planeta/datos-planeta.component';

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
  {
    path: ':id',
    component: DatosPlanetaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SistemaSolarPageRoutingModule {}
