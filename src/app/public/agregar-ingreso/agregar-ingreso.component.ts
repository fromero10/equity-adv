import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-ingreso',
  templateUrl: './agregar-ingreso.component.html',
  styleUrls: ['./agregar-ingreso.component.scss']
})
export class AgregarIngresoComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  verificacion(){
    
  }

  public goToFlujo(){
    this.router.navigate(['dashboard/flujo-de-caja'])
  }
}
