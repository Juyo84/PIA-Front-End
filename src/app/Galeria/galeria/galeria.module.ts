import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleriaPageRoutingModule } from './galeria-routing.module';

import { GaleriaPage } from './galeria.page';
import { MenuGaleriaComponent } from '../menu-galeria/menu-galeria.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleriaPageRoutingModule
  ],
  declarations: [GaleriaPage,
  MenuGaleriaComponent]
})
export class GaleriaPageModule {}
