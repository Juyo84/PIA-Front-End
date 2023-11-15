import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForoPage } from './foro.page';
import { PublicacionForoComponent } from '../publicacion-foro/publicacion-foro.component';

const routes: Routes = [
  {
    path: '',
    component: ForoPage
  },
  {
    path: 'Foro',
    component: ForoPage
  },
  {
    path: ':id',
    component: PublicacionForoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForoPageRoutingModule {}
