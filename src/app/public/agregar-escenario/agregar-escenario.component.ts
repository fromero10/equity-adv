import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agregar-escenario',
  templateUrl: './agregar-escenario.component.html',
  styleUrls: ['./agregar-escenario.component.scss']
})
export class AgregarEscenarioComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    console.log("estamos aca")
  }
  verificacion(){
    
  }

}
