import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SistemaSolarPage } from './sistema-solar.page';

const routes: Routes = [
  {
    path: '',
    component: SistemaSolarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SistemaSolarPageRoutingModule {}
