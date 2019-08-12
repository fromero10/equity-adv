import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators, Form} from '@angular/forms';

@Component({
  selector: 'app-importar-costeo',
  templateUrl: './importar-costeo.component.html',
  styleUrls: ['./importar-costeo.component.scss']
  
})
export class ImportarCosteoComponent implements OnInit {

  constructor(public router:Router) { }

  formHorizontal: FormGroup
  formVertical: FormGroup
  etapa=1

  ngOnInit() {

    this.formHorizontal = new FormGroup({
      'region': new FormControl(null),
      'producto' : new FormControl(null),
      'mes' : new FormControl(null),
      'presupuesto' : new FormControl(null),
      'filtro1' : new FormControl(null),
      'filtro2' : new FormControl(null),
      'filtro3' : new FormControl(null),
    });

    this.formVertical = new FormGroup({
      'utilidadBruta': new FormControl(null),
      'ingresos' : new FormControl(null),
      'gastos' : new FormControl(null),
      'presupuesto' : new FormControl(null),
      'filtro4' : new FormControl(null),
      'filtro5' : new FormControl(null),
      'filtro6' : new FormControl(null),
    });
  }
  goToFlujoDeCaja(){
    this.router.navigate(['dashboard/costeo'])
  }
  avanzarEtapa(){
    if(this.etapa<5){
      this.etapa++
    }
    else{
      this.goToFlujoDeCaja()
    }
  }

  retrocederEtapa(){
    if(this.etapa>1){
      this.etapa--
    }
    else{
      this.goToFlujoDeCaja()
    }
  }

  verificacion(){

  }
}
