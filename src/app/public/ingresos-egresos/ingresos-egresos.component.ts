import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { MainService } from '../services/main.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ingresos-egresos',
  templateUrl: './ingresos-egresos.component.html',
  styleUrls: ['./ingresos-egresos.component.scss']
})
export class IngresosEgresosComponent implements OnInit {

  public rango: any;
  fromDate:Date;
  toDate:Date;
  public hoy: any;
  fecha: number;
  hoyEnFecha: Date;
  agrupacionFechas=1;
  calendario=false;
  spinerGrafica = true;
  pieIngresos=[];
  mostrarIngresos=true;
  datinhos:any[];
  dato: any;
  arregloFechas=[];
  arregloIngresos=[];
  arregloEgresos=[];
  sumaIngresos=0;
  sumaEgresos=0;
  arregloCategorias=[];
  categoriasIngresos=[];
  categoriasEgresos=[]
  arregloTipos=[];
  agrupadoCategoriasIngresos=[];
  agrupadoCategoriasEgresos=[];
  agrupadoCategoriasGraf=[];
  categoriasGrafico=[];
  formIngresos: FormGroup
  formEgresos: FormGroup
  catsIngSelec=[]
  catsEgrSelec=[]
  objetosCatsI=[]
  objetosCatsE=[]
  ingresosPorPeriodo=[];
  egresosPorPeriodo=[];
  labels=[];
  

  @ViewChild('grafico1', { static: false}) grafico1: ElementRef;
  

  constructor(private theme: NbThemeService, public router: Router, private mainService: MainService, private formBuilder: FormBuilder) {
    let TIME_IN_MS = 3000;
    setTimeout( () => {
      this.spinerGrafica = false;
    }, TIME_IN_MS);
  }

  ngOnInit() {
    this.hoy=Date.now();
    this.hoyEnFecha=new Date(this.hoy)
    this.fromDate=new Date(this.hoyEnFecha.getFullYear()+"-"+(this.hoyEnFecha.getMonth()+1)+"-01")
    this.toDate=new Date(this.hoyEnFecha.getFullYear()+"-"+(this.hoyEnFecha.getMonth()+1)+"-"+this.daysInMonth(this.hoyEnFecha.getMonth()+1,this.hoyEnFecha.getFullYear()))
    this.rango="Seleccionar rango"
    this.mainService.get('api/flujo_de_caja/empresa/5d5575040cc34a3ee86deb2c').subscribe(result =>{
      this.datinhos=result;
    this.crearArregloDatos();
    this.crearCategoriaIngresos();
    this.crearCategoriaEgresos();
    this.ingresosPorCategoria();
    this.egresosPorCategoria();
    this.agruparPorDias()
    this.generarGrafico2Ingresos();
    this.configurarFiltros()
  })
  this.catsIngSelec=this.categoriasIngresos
  this.catsEgrSelec=this.categoriasEgresos
}

  private configurarFiltros(){
    for(let i=0;i<this.categoriasIngresos.length;i++){
      let x={
        id: i, name:this.categoriasIngresos[i]
      }
      this.objetosCatsI.push(x)
    }
    this.formIngresos = this.formBuilder.group({
      objetosCatsI: new FormArray([])
    });
    this.addCheckboxes();


    for(let j=0;j<this.categoriasEgresos.length;j++){
      let x={
        id: j, name:this.categoriasEgresos[j]
      }
      this.objetosCatsE.push(x)
    }
    this.formEgresos = this.formBuilder.group({
      objetosCatsE: new FormArray([])
    });

    this.addCheckboxes2()
  }
  
  private addCheckboxes() {
    this.objetosCatsI.map((o, i) => {
      const control = new FormControl(i>=0); // if first item set to true, else false
      (this.formIngresos.controls.objetosCatsI as FormArray).push(control);
    });
  }

  private addCheckboxes2() {
    this.objetosCatsE.map((o, j) => {
      const control = new FormControl(j>=0); // if first item set to true, else false
      (this.formEgresos.controls.objetosCatsE as FormArray).push(control);
    });
  }

  submit() {
    const selectedOrderNamesI = this.formIngresos.value.objetosCatsI
      .map((v, i) => v ? this.objetosCatsI[i].name : null)
      .filter(v => v !== null);
    this.catsIngSelec=selectedOrderNamesI
    console.log(this.catsIngSelec);
    if(this.agrupacionFechas===1){
      this.agruparPorDias()
    }
   /*  else if(this.agrupacionFechas===2){
      this.agruparPorSemanas()
    }
    else if(this.agrupacionFechas===3){
      this.agruparPorMes()
    }
    else if(this.agrupacionFechas===4){
      this.agruparPorAno()
    } */
  }

  submit2() {
    const selectedOrderNamesE = this.formEgresos.value.objetosCatsE
      .map((v, j) => v ? this.objetosCatsE[j].name : null)
      .filter(v => v !== null);
      this.catsEgrSelec=selectedOrderNamesE
    console.log(this.catsEgrSelec);
    if(this.agrupacionFechas===1){
      this.agruparPorDias()
    }
    /* else if(this.agrupacionFechas===2){
      this.agruparPorSemanas()
    }
    else if(this.agrupacionFechas===3){
      this.agruparPorMes()
    }
    else if(this.agrupacionFechas===4){
      this.agruparPorAno()
    } */
  }

  dataG2 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "My second dataset",
        data: [25, 49, 90, 101, 86, 15, 50]
      },
    ]
  };

  getRangeDate(event) {

    if (event.start && event.end) {
      this.fromDate = new Date(event.start);
      this.toDate = new Date(event.end);
      this.rango=this.fromDate.getFullYear()+"/"+(this.fromDate.getMonth()+1)+"/"+this.fromDate.getDate()+" - "+this.toDate.getFullYear()+"/"+(this.toDate.getMonth()+1)+"/"+this.toDate.getDate()
      if(this.agrupacionFechas===1){
        this.agruparPorDias()
      }
      /* else if(this.agrupacionFechas===2){
        this.agruparPorSemanas()
      }
      else if(this.agrupacionFechas===3){
        this.agruparPorMes()
      }
      else if(this.agrupacionFechas===4){
        this.agruparPorAno()
      } */
    }
  }

  public agruparPorDias(){

    let cantidadDias=(this.toDate.getTime()-this.fromDate.getTime())/(1000*60*60*24)+1
    this.ingresosPorPeriodo=[]
    this.egresosPorPeriodo=[]
    this.labels=[]

    for(let i = 0; i < cantidadDias; i++){

      this.ingresosPorPeriodo[i]=0;
      this.egresosPorPeriodo[i]=0;
      let inicio=this.fromDate.getTime()+i*(1000*60*60*24)
      let dia=new Date(inicio)
      let fin=this.fromDate.getTime()+(i+1)*(1000*60*60*24)
      this.labels[i]=dia.getFullYear() + "-" + (dia.getMonth()+1)+ "-" + dia.getDate()

      for(let j = 0 ; j < this.arregloIngresos.length; j++){

        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Real" && (this.estaEnArreglo(this.catsIngSelec,this.arregloCategorias[j]) || this.estaEnArreglo(this.catsEgrSelec,this.arregloCategorias[j]))){

          this.ingresosPorPeriodo[i]=this.ingresosPorPeriodo[i]+this.arregloIngresos[j]
          this.egresosPorPeriodo[i]=this.egresosPorPeriodo[i]+this.arregloEgresos[j]

        }
      }
    }this.generarGrafico();console.log(this.catsIngSelec)
    this.calcularIngresosEgresos()
  }

  public calcularIngresosEgresos(){
    this.sumaIngresos=0
    this.sumaEgresos=0
    for(let i = 0; i < this.labels.length; i++){
      this.sumaIngresos=this.sumaIngresos+this.ingresosPorPeriodo[i]
      this.sumaEgresos=this.sumaEgresos+this.egresosPorPeriodo[i]
    }
  }

  public generarGrafico() {

    let graficoObj = this.grafico1.nativeElement.getContext('2d');
    var chartData = {
      labels: this.labels,
      datasets: [{
        label: 'Ingresos',
        data: this.ingresosPorPeriodo,
        fill: false,
        backgroundColor: "#5BCE60",
        borderColor: "#5BCE60",
      },
        {
          label: 'Egresos',
          data: this.egresosPorPeriodo,
          fill: false,
          backgroundColor: "#E3633D",
          borderColor: "#E3633D",
        }
      ]
    };
    var chart = new Chart(
      graficoObj,
      {
        "type": 'line',
        "data": chartData,
        "options": {
          "legend": {
            "display": true
          },
        }
      }
    );
  }

  public crearArregloDatos(){
    /* for(let i = 0; i < this.datinhos.length; i++){ */
      for(var key in this.datinhos){
        for(var key2 in this.datinhos[key]){
          this.dato=this.datinhos[key][key2]
          if(key2==="fechaMovimiento"){
            this.fecha=(Date.parse(this.dato)+this.hoyEnFecha.getTimezoneOffset()*60000)
            this.arregloFechas.push(this.fecha)
          }
          else if(key2==="ingreso"){
            this.arregloIngresos.push(this.dato)
          }
          else if(key2==="egreso"){
            this.arregloEgresos.push(this.dato)
          }
          else if(key2==="categoria"){
            this.arregloCategorias.push(this.dato)
          }
          else if(key2==="tipo"){
            this.arregloTipos.push(this.dato)
          }
        }
        
        /* if(key==="saldoBanco"){
          this.labels.push(this.datinhos[key])
        } */
    }
  /* } */
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
  }console.log(this.categoriasIngresos)
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
  }console.log(this.categoriasEgresos)
}

public ingresosPorCategoria(){

  for(let i = 0; i < this.arregloIngresos.length; i++){
    for(let j = 0; j < this.categoriasIngresos.length; j++){
      if(i===0){this.agrupadoCategoriasIngresos[j]=0;}
      if(this.arregloCategorias[i]===this.categoriasIngresos[j]){
        this.agrupadoCategoriasIngresos[j]=this.agrupadoCategoriasIngresos[j]+this.arregloIngresos[i]
        if(i!=0){break}
      }
    }
  }console.log(this.agrupadoCategoriasIngresos)
}

public egresosPorCategoria(){

  for(let i = 0; i < this.arregloEgresos.length; i++){
    for(let j = 0; j < this.categoriasEgresos.length; j++){
      if(i===0){this.agrupadoCategoriasEgresos[j]=0;}
      if(this.arregloCategorias[i]===this.categoriasEgresos[j]){
        this.agrupadoCategoriasEgresos[j]=this.agrupadoCategoriasEgresos[j]+this.arregloEgresos[i]
        if(i!=0){break}
      }
    }
  }console.log(this.agrupadoCategoriasEgresos)
  
}

public categoriasGraf(){
  if(this.mostrarIngresos){
    this.categoriasGrafico=this.categoriasIngresos
    this.agrupadoCategoriasGraf=this.agrupadoCategoriasIngresos
  }
  else{
    this.categoriasGrafico=this.categoriasEgresos
    this.agrupadoCategoriasGraf=this.agrupadoCategoriasEgresos
  }
}

  generarGrafico2Ingresos(){
    this.categoriasGraf()
    this.pieIngresos = new Chart('pieIngresos',{
      type:'pie',
      data:{
        labels: this.categoriasGrafico,
        datasets:[
          {
            label: "Ingresos",
            data: this.agrupadoCategoriasGraf,
            backgroundColor: [
              '#5FB9FF',
              '#E3633D',
              '#5BCE60',
              'rgb(0, 255, 255)',
              'rgb(128, 0, 128)',
              'rgb(255, 255, 0)'
          ],
          },
        ]
      },
      options: {
        title:{
            text:"Ingresos por Categoría",
            display:true
        }
      }  
    })
  }


  goToAgregarEscenario(){
    this.router.navigate(['dashboard/agregar-escenario'])
  }
  public myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  public daysInMonth (month, year) { 
    return new Date(year, month, 0).getDate(); 
  }
  
  public estaEnArreglo(arreglo: any[], valor: any ){
    for(let k = 0; k < arreglo.length; k++){
      if(arreglo[k]===valor){
        return true
      }
    }
    return false
  }


}
