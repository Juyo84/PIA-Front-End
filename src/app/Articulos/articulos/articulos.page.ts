import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.css'],
})
export class ArticulosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irArticulo(idArticulo: any){

    this.router.navigate(['/Articulos', idArticulo]);

  }

}
