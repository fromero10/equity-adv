import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-importar-flujo',
  templateUrl: './importar-flujo.component.html',
  styleUrls: ['./importar-flujo.component.scss']
})
export class ImportarFlujoComponent implements OnInit {

  etapa=1

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToFlujoDeCaja(){
    this.router.navigate(['dashboard/flujo-de-caja'])
  }
  avanzarEtapa(){
    if(this.etapa<3){
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
}
