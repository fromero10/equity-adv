import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-importar-flujo',
  templateUrl: './importar-flujo.component.html',
  styleUrls: ['./importar-flujo.component.scss']
})
export class ImportarFlujoComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToFlujoDeCaja(){
    this.router.navigate(['dashboard/flujo-de-caja'])
  }
}
