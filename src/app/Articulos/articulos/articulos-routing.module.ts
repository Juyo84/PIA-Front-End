import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticulosPage } from './articulos.page';
import { ConstelacionesPage } from 'src/app/Constelacion/constelaciones/constelaciones.page';
import { InicioPage } from 'src/app/Inicio/inicio/inicio.page';
import { SistemaSolarPage } from 'src/app/Sistema-Solar/sistema-solar/sistema-solar.page';
import { ForoPage } from 'src/app/Foro/foro/foro.page';
import { GaleriaPage } from 'src/app/Galeria/galeria/galeria.page';
import { PerfilPage } from 'src/app/Perfil/perfil/perfil.page';
import { ArticuloComponent } from '../articulo/articulo.component';

const routes: Routes = [
  {
    path: '',
    component: ArticulosPage
  },
  {
    path: 'Articulos',
    component: ArticulosPage
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
    path: 'Constelaciones',
    component: ConstelacionesPage
  },
  {
    path: 'Foro',
    component: ForoPage
  },
  {
    path: 'Galeria',
    component: GaleriaPage
  },
  {
    path: 'Perfil',
    component: PerfilPage
  },
  {
    path: ':id',
    component: ArticuloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticulosPageRoutingModule {}
