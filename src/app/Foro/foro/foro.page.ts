import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.css'],
})
export class ForoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irForo(idPublicacionForo: any){

    this.router.navigate(['/Foro', idPublicacionForo]);

  }

}
