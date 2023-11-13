import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticulosPageRoutingModule } from './articulos-routing.module';

import { ArticulosPage } from './articulos.page';
import { MenuArticulosComponent } from '../menu-articulos/menu-articulos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticulosPageRoutingModule
  ],
  declarations: [ArticulosPage,
  MenuArticulosComponent]
})
export class ArticulosPageModule {}
