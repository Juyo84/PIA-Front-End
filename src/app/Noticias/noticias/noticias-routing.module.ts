import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticiasPage } from './noticias.page';
import { NoticiaComponent } from '../noticia/noticia.component';

const routes: Routes = [
  {
    path: '',
    component: NoticiasPage
  },
  {
    path: 'Noticias',
    component: NoticiasPage
  },
  {
    path: ':id',
    component: NoticiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticiasPageRoutingModule {}
