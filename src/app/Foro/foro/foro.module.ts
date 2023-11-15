import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForoPageRoutingModule } from './foro-routing.module';

import { ForoPage } from './foro.page';
import { MenuForoComponent } from '../menu-foro/menu-foro.component';
import { MenuForoPublicacionForoComponent } from '../menu-foro-publicacion-foro/menu-foro-publicacion-foro.component';
import { PublicacionForoComponent } from '../publicacion-foro/publicacion-foro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForoPageRoutingModule
  ],
  declarations: [ForoPage,
  MenuForoComponent,
MenuForoPublicacionForoComponent,
PublicacionForoComponent]
})
export class ForoPageModule {}
