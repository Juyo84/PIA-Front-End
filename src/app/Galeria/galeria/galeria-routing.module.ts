import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleriaPage } from './galeria.page';
import { GuiasPage } from 'src/app/Guias/guias/guias.page';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleriaPageRoutingModule {}
