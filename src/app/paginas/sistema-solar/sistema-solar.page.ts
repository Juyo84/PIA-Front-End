import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sistema-solar',
  templateUrl: './sistema-solar.page.html',
  styleUrls: ['./sistema-solar.page.css'],
})
export class SistemaSolarPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irPlaneta(planetaSeleccionado: any){

    this.router.navigate(['Sistema-Solar', planetaSeleccionado]);
    
  }

}
