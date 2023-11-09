import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule} from '@ionic/angular';

import { SistemaSolarPageRoutingModule } from './sistema-solar-routing.module';

import { SistemaSolarPage } from './sistema-solar.page';
import { MenuSistemaSolarComponent } from '../../menus/menu-sistema-solar/menu-sistema-solar.component';
import { DatosPlanetaComponent } from '../../componentes/datos-planeta/datos-planeta.component';
import { PlanetaComponent } from '../../componentes/planeta/planeta.component';
import { MenuSistemaSolarPlanetaComponent } from 'src/app/menus/menu-sistema-solar-planeta/menu-sistema-solar-planeta.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SistemaSolarPageRoutingModule,
  ],
  declarations: [SistemaSolarPage,
  MenuSistemaSolarComponent,
  DatosPlanetaComponent,
  PlanetaComponent,
  MenuSistemaSolarPlanetaComponent]
})
export class SistemaSolarPageModule {}
