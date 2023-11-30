import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPage } from './perfil.page';
import { RelogInComponent } from '../relog-in/relog-in.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  },
  {
    path: 'Perfil',
    component: PerfilPage
  },
  {
    path: 'ReLogIn',
    component: RelogInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {}
