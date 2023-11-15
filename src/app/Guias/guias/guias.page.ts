import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guias',
  templateUrl: './guias.page.html',
  styleUrls: ['./guias.page.css'],
})
export class GuiasPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irGuia(idGuia: any){

    this.router.navigate(['/Guias', idGuia]);

  }

}
