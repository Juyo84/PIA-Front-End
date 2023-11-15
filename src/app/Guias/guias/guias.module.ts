import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuiasPageRoutingModule } from './guias-routing.module';

import { GuiasPage } from './guias.page';
import { MenuGuiasComponent } from '../menu-guias/menu-guias.component';
import { GuiaComponent } from '../guia/guia.component';
import { MenuGuiasGuiaComponent } from '../menu-guias-guia/menu-guias-guia.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuiasPageRoutingModule
  ],
  declarations: [GuiasPage,
  MenuGuiasComponent,
GuiaComponent,
MenuGuiasGuiaComponent]
})
export class GuiasPageModule {}
