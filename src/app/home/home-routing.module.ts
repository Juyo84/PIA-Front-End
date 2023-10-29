import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LogInComponent } from '../log-in/log-in.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'Home',
    component: HomePage,
  },
  {
    path: 'LogIn',
    component: LogInComponent,
  },
  {
    path: 'SignUp',
    component: SignUpComponent,
  },
  {
    path: 'home/LogIn',
    component: LogInComponent,
  },
  {
    path: 'home/SignUp',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
