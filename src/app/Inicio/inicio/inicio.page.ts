import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.css'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  irPagina(idPagina: any){

    this.router.navigate(['/Inicio', idPagina]);

  }

}
