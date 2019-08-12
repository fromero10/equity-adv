import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-importar-costeo',
  templateUrl: './importar-costeo.component.html',
  styleUrls: ['./importar-costeo.component.scss']
  
})
export class ImportarCosteoComponent implements OnInit {

  constructor(public router:Router) { }

  formHorizontal: FormGroup
  etapa=1

  ngOnInit() {

    this.formHorizontal = new FormGroup({
      'region': new FormControl(null,Validators.required),
      'producto' : new FormControl(null,Validators.required),
      'mes' : new FormControl(null,Validators.required),
      'presupuesto' : new FormControl(null,Validators.required),
      'nombreNegocio' : new FormControl(null,Validators.required),
      'nit' : new FormControl(null,Validators.required),
      'categoriaNegocio' : new FormControl(null,Validators.required),
      'subCategoriaNegocio' : new FormControl(null,Validators.required),
      'email2': new FormControl(null,[Validators.required,Validators.email]),
      'logoNegocio': new FormControl(null)
    });
  }
  goToFlujoDeCaja(){
    this.router.navigate(['dashboard/flujo-de-caja'])
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
