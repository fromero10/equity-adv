import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.scss']
})
export class AgregarCategoriaComponent implements OnInit {

  agregarCatForm: FormGroup

  constructor(public router: Router) { }

  ngOnInit() {
  }

  verificacion(){

  }

  public goToFlujo(){
    this.router.navigate(['dashboard/flujo-de-caja'])
  }

}
