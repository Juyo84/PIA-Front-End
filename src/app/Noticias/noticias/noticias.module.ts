import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticiasPageRoutingModule } from './noticias-routing.module';

import { NoticiasPage } from './noticias.page';
import { MenuNoticiasComponent } from '../menu-noticias/menu-noticias.component';
import { MenuNoticiasNoticiaComponent } from '../menu-noticias-noticia/menu-noticias-noticia.component';
import { NoticiaComponent } from '../noticia/noticia.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticiasPageRoutingModule
  ],
  declarations: [NoticiasPage,
  MenuNoticiasComponent,
MenuNoticiasNoticiaComponent,
NoticiaComponent]
})
export class NoticiasPageModule {}
