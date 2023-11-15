import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.css'],
})
export class NoticiasPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irNoticia(idPublicacionNoticia: any){

    this.router.navigate(['/Noticias', idPublicacionNoticia]);

  }

}
