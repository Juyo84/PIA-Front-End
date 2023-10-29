import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, MenuController } from '@ionic/angular';

import { SistemaSolarPageRoutingModule } from './sistema-solar-routing.module';

import { SistemaSolarPage } from './sistema-solar.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SistemaSolarPageRoutingModule,
  ],
  declarations: [SistemaSolarPage]
})
export class SistemaSolarPageModule {}
