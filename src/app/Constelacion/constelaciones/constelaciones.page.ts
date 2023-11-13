import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-constelaciones',
  templateUrl: './constelaciones.page.html',
  styleUrls: ['./constelaciones.page.css'],
})
export class ConstelacionesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irConstelacion(idConstelacion: any){

    this.router.navigate(['/Constelaciones', idConstelacion]);

  }

}
