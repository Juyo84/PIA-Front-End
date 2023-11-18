import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleriaPage } from './galeria.page';
import { GuiasPage } from 'src/app/Guias/guias/guias.page';
import { ImagenProyectadaComponent } from '../imagen-proyectada/imagen-proyectada.component';

const routes: Routes = [
  {
    path: '',
    component: GaleriaPage
  },
  {
    path: 'Galeria',
    component: GaleriaPage
  },
  {
    path: 'Guias',
    component: GuiasPage
  },
  {
    path: ':id',
    component: ImagenProyectadaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleriaPageRoutingModule {}
