import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuiasPage } from './guias.page';
import { GuiaComponent } from '../guia/guia.component';

const routes: Routes = [
  {
    path: '',
    component: GuiasPage
  },
  {
    path: 'Guias',
    component: GuiasPage
  },
  {
    path: ':id',
    component: GuiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuiasPageRoutingModule {}
