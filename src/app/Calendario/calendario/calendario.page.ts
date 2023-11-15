import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.css'],
})
export class CalendarioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irEvento(idPublicacionEvento: any){

    console.log("Click del evento");

  }

}
