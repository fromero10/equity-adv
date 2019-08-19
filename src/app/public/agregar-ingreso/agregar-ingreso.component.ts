import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-ingreso',
  templateUrl: './agregar-ingreso.component.html',
  styleUrls: ['./agregar-ingreso.component.scss']
})
export class AgregarIngresoComponent implements OnInit {

  datinhos=[];
  arregloCategorias=[];
  dato:any;
  categoriasIngresos=[];
  categoriasEgresos=[];
  categoriasEscenario=[];
  arregloIngresos=[];
  arregloEgresos=[];
  arregloTipos=[];
  formAgregarMovimiento: FormGroup
  subCategorias=[]
  verificar=false
  constructor(public router:Router, private mainService: MainService) { }

  ngOnInit() {

    this.mainService.get('api/flujo_de_caja/empresa/5d5575040cc34a3ee86deb2c').subscribe(result =>{
      this.datinhos=result;
      console.log(this.datinhos)
    this.crearArregloDatos()
    this.crearCategoriaEgresos()
    this.crearCategoriaIngresos()
    this.crearCategoriaEscenarios()})
    this.formAgregarMovimiento = new FormGroup({
      'nombre': new FormControl(null,Validators.required),
      'monto' : new FormControl(null,[Validators.required,Validators.min(0)]),
      'tipo' : new FormControl(null,Validators.required),
      'categoria': new FormControl(null),
      'recurrencia' : new FormControl(null,Validators.required),
      'inicioRecurrencia' : new FormControl(null,Validators.required),
      'finRecurrencia' : new FormControl(null),
    });
  }

  onSelect(catId: string) {
    if (catId==="Ingreso"){
      this.subCategorias = this.categoriasIngresos
      console.log(this.categoriasEgresos, catId)
    }
    else if (catId==="Egreso"){
      this.subCategorias = this.categoriasEgresos
      console.log(this.subCategorias, catId)
    }
    else if (catId==="Escenario"){
      this.subCategorias = this.categoriasEscenario
      console.log(this.subCategorias, catId)
    }
    else if (catId==="Presupuesto"){
      this.subCategorias = ["Presupuesto"]
      console.log(this.subCategorias, catId)
    }
    
  }

  public crearArregloDatos(){
    for(var key in this.datinhos){
      for(var key2 in this.datinhos[key]){
        this.dato=this.datinhos[key][key2]

        if (key2==="categoria"){
          this.arregloCategorias.push(this.dato)
        }
        else if (key2==="ingreso"){
          this.arregloIngresos.push(this.dato)
        }
        else if (key2==="egreso"){
          this.arregloEgresos.push(this.dato)
        }
        else if (key2==="tipo"){
          this.arregloTipos.push(this.dato)
        }
      }
    }
  }

  public crearCategoriaIngresos(){
    for(let i = 0;i < this.arregloCategorias.length; i++){
      for(let j = 0; j <= this.categoriasIngresos.length; j++){
        if(this.arregloCategorias[i]===this.categoriasIngresos[j]){
          break;
        }
        else if(j===(this.categoriasIngresos.length) && this.arregloIngresos[i]>0 && this.arregloTipos[i]!="Escenario" && this.arregloTipos[i]!="Presupuesto"){
          this.categoriasIngresos.push(this.arregloCategorias[i])
          break
        }
      }
    }
  }

  public crearCategoriaEscenarios(){
    for(let i = 0;i < this.arregloCategorias.length; i++){
      for(let j = 0; j <= this.categoriasEscenario.length; j++){
        if(this.arregloCategorias[i]===this.categoriasEscenario[j]){
          break;
        }
        else if(j===(this.categoriasEscenario.length) && this.arregloTipos[i]==="Escenario"){
          this.categoriasEscenario.push(this.arregloCategorias[i])
          break
        }
      }
    }
  }

  
  public crearCategoriaEgresos(){
    for(let i = 0;i < this.arregloCategorias.length; i++){
      for(let j = 0; j <= this.categoriasEgresos.length; j++){
        if(this.arregloCategorias[i]===this.categoriasEgresos[j]){
          break;
        }
        else if(j===(this.categoriasEgresos.length) && this.arregloEgresos[i]>0 && this.arregloTipos[i]!="Escenario" && this.arregloTipos[i]!="Presupuesto"){
          this.categoriasEgresos.push(this.arregloCategorias[i])
          break
        }
      }
    }
  }

  verificacion(){
    if(this.formAgregarMovimiento.invalid){
      this.verificar=true
      console.log("falla")
      return false
    } 
      this.verificar=false
      console.log("exito")
      this.goToFlujo()
  }

  public goToFlujo(){
    this.router.navigate(['dashboard/flujo-de-caja'])
  }
}
