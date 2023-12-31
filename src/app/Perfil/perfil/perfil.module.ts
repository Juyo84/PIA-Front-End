import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { MenuPerfilComponent } from '../menu-perfil/menu-perfil.component';
import { RelogInComponent } from '../relog-in/relog-in.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule
  ],
  declarations: [PerfilPage,
  MenuPerfilComponent,
  RelogInComponent]
})
export class PerfilPageModule {}
