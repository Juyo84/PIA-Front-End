import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConstelacionesPageRoutingModule } from './constelaciones-routing.module';

import { ConstelacionesPage } from './constelaciones.page';
import { MenuConstelacionesComponent } from 'src/app/menus/menu-constelaciones/menu-constelaciones.component';
import { ConstelacionComponent } from 'src/app/componentes/constelacion/constelacion.component';
import { MenuConstelacionesConstelacionComponent } from 'src/app/menus/menu-constelaciones-constelacion/menu-constelaciones-constelacion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConstelacionesPageRoutingModule,
  ],
  declarations: [ConstelacionesPage,
    MenuConstelacionesComponent,
    ConstelacionComponent,
    MenuConstelacionesConstelacionComponent]
})
export class ConstelacionesPageModule {}
