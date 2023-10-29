import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DatosPlanetaComponent } from '../datos-planeta/datos-planeta.component';
import { PlanetaComponent } from '../planeta/planeta.component';
import { InicioComponent } from '../inicio/inicio.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LogInComponent } from '../log-in/log-in.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,
    DatosPlanetaComponent,
    PlanetaComponent,
    InicioComponent,
    LogInComponent,
    SignUpComponent]
})
export class HomePageModule {}
