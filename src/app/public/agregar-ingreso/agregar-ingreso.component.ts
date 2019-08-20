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
  nuevaCategoria=false;
  ingreso:boolean;
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
      'descripcion': new FormControl(null,Validators.required),
      'movimiento': new FormControl(null,Validators.required),
      'monto' : new FormControl(null,[Validators.required,Validators.min(0)]),
      'tipo' : new FormControl(null,Validators.required),
      'categoria': new FormControl(null,Validators.required),
      'nuevaCategoria': new FormControl(null),
 /*      'recurrencia' : new FormControl(null,Validators.required), */
      'metodoPago' : new FormControl(null,Validators.required),
      /* 'inicioRecurrencia' : new FormControl(null,Validators.required), */
      'finRecurrencia' : new FormControl(null),
    });
  }

  onSelect(catId: string) {
    if (catId==="Real" && this.ingreso===true){
      this.subCategorias = this.categoriasIngresos
      console.log(this.categoriasEgresos, catId)
    }
    else if (catId==="Real" && this.ingreso===false){
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

  onSelect2(catId: string) {
    if (catId==="Otra"){
      this.nuevaCategoria = true
    }
    else{
      this.nuevaCategoria = false

    }
  }

  onSelect3(catId: string) {
    if (catId==="Ingreso"){
      this.ingreso = true
      if(this.formAgregarMovimiento.get('tipo').value==="Real"){
        this.onSelect("Real")
      }
    }
    else{
      this.ingreso = false
      if(this.formAgregarMovimiento.get('tipo').value==="Real"){
        this.onSelect("Real")
      }
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
    let ing:number
    let egr:number
    let cate: string
    if(this.formAgregarMovimiento.invalid){
      console.log("falla")
      this.verificar=true
      return false
    }
    else{

      if(this.formAgregarMovimiento.get('movimiento').value==="Ingreso"){
        ing=this.formAgregarMovimiento.get('monto').value
        egr=0
      }
      else{
        egr=this.formAgregarMovimiento.get('monto').value
        ing=0
      }

      if(this.formAgregarMovimiento.get('categoria').value==="Otra"){
        cate = this.formAgregarMovimiento.get('nuevaCategoria').value
      }
      else{
        cate = this.formAgregarMovimiento.get('categoria').value
      }
 
      let x = {
        empresa: "5d5575040cc34a3ee86deb2c",
        consecutivo: "",
        descripcion: this.formAgregarMovimiento.get('descripcion').value,
        ingreso: ing,
        egreso: egr,
        saldoBanco:0,
        saldoEfectivo:0,
        fechaMovimiento:this.formAgregarMovimiento.get('finRecurrencia').value,
        metodoPago:this.formAgregarMovimiento.get('metodoPago').value,
        categoria: cate,
        tipo: this.formAgregarMovimiento.get('tipo').value

      } 

      if (x) {
        console.log(x)
      } 
      this.verificar=false
      console.log("exito")
      this.post(x)
      this.goToFlujo()
    }

  }

  post(objeto: Object){
      this.mainService.post('api/flujo_de_caja', objeto).subscribe(res=>{console.log(res)})
    }
  
  public goToFlujo(){
    this.router.navigate(['dashboard/flujo-de-caja'])
  }
}
