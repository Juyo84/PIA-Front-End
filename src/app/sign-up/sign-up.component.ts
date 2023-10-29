import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  regresarHome(){

    this.router.navigateByUrl('Home');

  }

  irLogIn(){

    this.router.navigate(['Home', 'LogIn']);
  
  }

  SignUp(){

    this.router.navigate(['Inicio']);

  }

}
