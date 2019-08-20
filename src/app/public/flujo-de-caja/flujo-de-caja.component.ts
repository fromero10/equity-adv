import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import Chart from 'chart.js';
import { ChartComponent } from 'angular2-chartjs';
import {Router} from '@angular/router';
import { MainService } from '../services/main.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import * as _ from 'lodash';


@Component({
  selector: 'app-flujo-de-caja',
  templateUrl: './flujo-de-caja.component.html',
  styleUrls: ['./flujo-de-caja.component.scss'],
})
export class FlujoDeCajaComponent implements OnInit {

  public fecha: any;
  forma=false
  forma2=false
  public hoy: any;
  public arreglinho = [];
  public arreglinho2 = [];
  public rango: any;
  hoyEnFecha: Date;
  calendario=false;
  spinerGrafica = true;
  data: any;
  agrupacionFechas=1;
  mostrarGraf=1;
  dato:any;
  min: Date;
  BarChart:any=[];
  GrafPresupuesto: any=[];
  usuario: any[];
  reservas: any[];
  datinhos: any[];
  arregloFechas=[];
  saldoBanco=[];
  arregloIngresos=[];
  arregloEgresos=[];
  sumaIngresos=0;
  sumaEgresos=0;
  saldoInicial=0;
  saldoFinal=0;
  categoriasIngresos: string[]=[];
  categoriasEgresos: string[]=[];
  fromDate:Date;
  toDate:Date;
  ingresosPorPeriodo=[];
  egresosPorPeriodo=[];
  presupuestoPorPeriodo=[];
  saldosPorPeriodo=[];
  arregloTipos=[];
  labels=[];
  arregloConsecutivos=[];
  arregloDescripciones=[];
  arregloMetodos=[];
  saldoEfectivo=[];
  arregloCategorias=[];
  monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  objetosCatsI=[]
  formIngresos: FormGroup
  objetosCatsE=[]
  formEgresos: FormGroup
  catsIngSelec=[]
  catsEgrSelec=[]
  ingresosPorCatPorPeriodo=[]
  egresosPorCatPorPeriodo=[]
  contador=0

  verdeAMostrar=0;
  rojoAMostrar=0;


  @ViewChild('grafico1', { static: false}) grafico1: ElementRef;

  range: { start: any; end: any; };
  graficoObj: any=[];
  constructor(private theme: NbThemeService, public router: Router, private mainService: MainService, private formBuilder: FormBuilder ) {
    let TIME_IN_MS = 3000;
    setTimeout( () => {
      this.spinerGrafica = false;
    }, TIME_IN_MS);          
  }

  ngOnInit() {
/*       this.fromDate=Date.parse('2019-08-01');
      this.toDate=Date.now(); */
      this.hoy=Date.now();
      this.hoyEnFecha=new Date(this.hoy)
      this.fromDate=new Date(this.hoyEnFecha.getFullYear()+"-"+(this.hoyEnFecha.getMonth()+1)+"-01")
      this.toDate=new Date(this.hoyEnFecha.getFullYear()+"-"+(this.hoyEnFecha.getMonth()+1)+"-"+this.daysInMonth(this.hoyEnFecha.getMonth()+1,this.hoyEnFecha.getFullYear()))
      this.rango="Seleccionar rango"
      this.mainService.get('api/flujo_de_caja/empresa/5d5575040cc34a3ee86deb2c').subscribe(result =>{
        this.datinhos=result;
      this.crearArregloDatos()
      this.calcularSaldoInicial()
      this.crearCategoriaEgresos()
      this.crearCategoriaIngresos()
      this.calcularIngresosEgresos()
      this.configurarFiltros()
      this.catsIngSelec=this.categoriasIngresos
      this.catsEgrSelec=this.categoriasEgresos
      
      this.generarGrafico2()
      this.generarGrafico3()
      this.generarGrafico()
      this.submit()
      this.agruparPorDias()
      

    })

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
    else if(this.agrupacionFechas===2){
      this.agruparPorSemanas()
    }
    else if(this.agrupacionFechas===3){
      this.agruparPorMes()
    }
    else if(this.agrupacionFechas===4){
      this.agruparPorAno()
    }
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
    else if(this.agrupacionFechas===2){
      this.agruparPorSemanas()
    }
    else if(this.agrupacionFechas===3){
      this.agruparPorMes()
    }
    else if(this.agrupacionFechas===4){
      this.agruparPorAno()
    }
  }



  generarGrafico2(){   
    this.BarChart = new Chart('IvsE',{
      type:'bar',
      data:{
        labels: this.labels,
        datasets:[
          {
            label: "Ingresos",
            data: this.ingresosPorPeriodo,
            backgroundColor: "#5BCE60",
          },
          {
            
            label: "Egresos",
            data: this.egresosPorPeriodo,
            backgroundColor:"#E3633D",
          },
        ]
      },
      options: {
        title:{
            text:"Ingresos vs egresos",
            display:true
        }
      }  
    })
  }


  public abrirCalendario() {
    this.calendario=true;
  }
 
  public crearArregloDatos(){
      for(var key in this.datinhos){
        for(var key2 in this.datinhos[key]){
          this.dato=this.datinhos[key][key2]
          if (key2==="consecutivo"){
            this.arregloConsecutivos.push(this.dato)
          }
          else if (key2==="descripcion"){
            this.arregloDescripciones.push(this.dato)
          }
          else if (key2==="ingreso"){
            this.arregloIngresos.push(this.dato)
          }
          else if (key2==="egreso"){
            this.arregloEgresos.push(this.dato)
          }
          else if (key2==="saldoBanco"){
            this.saldoBanco.push(this.dato)
          }
          else if (key2==="saldoEfectivo"){
            this.saldoEfectivo.push(this.dato)
          }
          else if (key2==="fechaMovimiento"){
            this.fecha=(Date.parse(this.dato)+this.hoyEnFecha.getTimezoneOffset()*60000)
            this.arregloFechas.push(this.fecha)
          }
          else if (key2==="metodoPago"){
            this.arregloMetodos.push(this.dato)
          }
          else if (key2==="categoria"){
            this.arregloCategorias.push(this.dato)
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

  public calcularIngresosEgresos(){
    this.sumaIngresos=0
    this.sumaEgresos=0
    for(let i = 0; i < this.labels.length; i++){
      this.sumaIngresos=this.sumaIngresos+this.ingresosPorPeriodo[i]
      this.sumaEgresos=this.sumaEgresos+this.egresosPorPeriodo[i]
    }
    this.saldoFinal=this.saldoInicial+this.sumaIngresos-this.sumaEgresos
  }

/*   public generarGrafico() {

    this.graficoObj = this.grafico1.nativeElement.getContext('2d');
    var chartData = {
      labels: this.labels,
      datasets: [{
        label: 'Evolución',
        data: this.saldosPorPeriodo,
        fill: true,
        steppedLine: 'middle',
        backgroundColor: [
          '#F7F7F7'
        ],
        borderColor: "#5BCE60",
      }
      ]
    };
    var chart = new Chart(
      this.graficoObj,
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
  } */

  generarGrafico3(){
    this.GrafPresupuesto = new Chart('vsPresupuesto',{
      type:'line',
      data:{
        labels: this.labels,
        datasets:[
          {
            label: "Real",
            data: this.saldosPorPeriodo,
            backgroundColor: "#5BCE60",
            borderColor: "#5BCE60",
            fill: "false",
            steppedLine: 'middle',
          },
          {
            
            label: "Presupuesto",
            data: this.presupuestoPorPeriodo,
            backgroundColor:"#B12ABC",
            borderColor:"#B12ABC",
            fill: "false",
            steppedLine: 'middle',
          },
        ]
      },
      options: {
        title:{
            text:"Real vs presupuesto",
            display:true
        }
      }  
    })
  }

  generarGrafico(){
    this.graficoObj = new Chart('evolucionn',{
      type:'line',
      data:{
        labels: this.labels,
        datasets:[
          {
            label: "Evolución",
            data: this.saldosPorPeriodo,
            backgroundColor: "#5BCE60",
            borderColor: "#5BCE60",
            fill: "false",
            steppedLine: 'middle',
          },
        ]
      },
      options: {
        title:{
            text:"Evolución",
            display:true
        }
      }  
    })
  }

  public cambiarGrafico2(){
    this.mostrarGraf=2
  }

  public cambiarGrafico1(){
    this.mostrarGraf=1
  }

  public cambiarGrafico3(){
    this.mostrarGraf=3
  }
  public goToAgregarEscenario(){
    this.router.navigate(['dashboard/agregar-escenario'])
  }

  public goToIngresosEgresos(){
    this.router.navigate(['dashboard/ingresos-egresos'])
  }
  public goToImportarFlujo(){
    this.router.navigate(['dashboard/importar-flujo'])
  }

  public goToAgregarMovimiento(){
    this.router.navigate(['dashboard/agregar-ingreso-egreso'])
  }

  public goToDatos(){
    this.router.navigate(['dashboard/lista-datos'])
  }

  public myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  getRangeDate(event) {

    if (event.start && event.end) {
      this.fromDate = new Date(event.start);
      this.toDate = new Date(event.end);
      this.rango=this.fromDate.getFullYear()+"/"+(this.fromDate.getMonth()+1)+"/"+this.fromDate.getDate()+" - "+this.toDate.getFullYear()+"/"+(this.toDate.getMonth()+1)+"/"+this.toDate.getDate()
      if(this.agrupacionFechas===1){
        this.agruparPorDias()
      }
      else if(this.agrupacionFechas===2){
        this.agruparPorSemanas()
      }
      else if(this.agrupacionFechas===3){
        this.agruparPorMes()
      }
      else if(this.agrupacionFechas===4){
        this.agruparPorAno()
      }
      
  }
  
  }

  public agruparPorDias(){

    let cantidadDias=(this.toDate.getTime()-this.fromDate.getTime())/(1000*60*60*24)+1
    this.ingresosPorPeriodo=[]
    this.egresosPorPeriodo=[]
    this.presupuestoPorPeriodo=[]
    this.saldosPorPeriodo=[]
    this.labels=[]
    this.calcularSaldoInicial()

    for(let i = 0; i < cantidadDias; i++){

      this.ingresosPorPeriodo[i]=0;
      this.egresosPorPeriodo[i]=0;
      this.saldosPorPeriodo[i]=0;
      let inicio=this.fromDate.getTime()+i*(1000*60*60*24)
      let dia=new Date(inicio)
      let fin=this.fromDate.getTime()+(i+1)*(1000*60*60*24)
      this.labels[i]=dia.getFullYear() + "-" + (dia.getMonth()+1)+ "-" + dia.getDate()
      let presupuestoPeriodo=0

      for(let j = 0 ; j < this.arregloIngresos.length; j++){

        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Real" && (this.estaEnArreglo(this.catsIngSelec,this.arregloCategorias[j]) || this.estaEnArreglo(this.catsEgrSelec,this.arregloCategorias[j]))){

          this.ingresosPorPeriodo[i]=this.ingresosPorPeriodo[i]+this.arregloIngresos[j]
          this.egresosPorPeriodo[i]=this.egresosPorPeriodo[i]+this.arregloEgresos[j]

        }

        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Presupuesto"){

          presupuestoPeriodo=presupuestoPeriodo + this.arregloIngresos[j]-this.arregloEgresos[j]

        }

        if(j===(this.arregloIngresos.length-1) && i > 0){

          this.saldosPorPeriodo[i]=this.saldosPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
          this.presupuestoPorPeriodo[i]=this.presupuestoPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]+presupuestoPeriodo

        }
        else if(j===(this.arregloIngresos.length-1) && i === 0){

          this.saldosPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
          this.presupuestoPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]+presupuestoPeriodo
        }
        

      }
    }
    this.actualizarGraficos();
    this.calcularIngresosEgresos()
    this.agruparPorDiasPorCat()
    document.getElementById("flujosCaja").style.width = 270*this.labels.length + "px";
  }

  public agruparPorDiasPorCat(){

    this.ingresosPorCatPorPeriodo=[]
    this.egresosPorCatPorPeriodo=[]

    let cantidadDias=(this.toDate.getTime()-this.fromDate.getTime())/(1000*60*60*24)+1

    for(let i = 0; i < cantidadDias; i++){

      let inicio=this.fromDate.getTime()+i*(1000*60*60*24)
      let fin=this.fromDate.getTime()+(i+1)*(1000*60*60*24)

      for(let j = 0 ; j < this.categoriasIngresos.length; j++){

        let valor = 0
        let cat = j
        let dia = i

        for(let k = 0; k < this.arregloIngresos.length; k++){

          if(inicio<=this.arregloFechas[k] && this.arregloFechas[k]<fin && this.arregloTipos[k]==="Real" && this.arregloCategorias[k]===this.categoriasIngresos[j]){

            valor = valor +this.arregloIngresos[k]
          }
        } 

        let x = {
          categoria: cat,
          ingreso : valor,
          periodo: dia
        }
        this.ingresosPorCatPorPeriodo.push(x)
      }

      for(let j = 0 ; j < this.categoriasEgresos.length; j++){

        let valor = 0
        let cat = j
        let dia = i

        for(let k = 0; k < this.arregloEgresos.length; k++){

          if(inicio<=this.arregloFechas[k] && this.arregloFechas[k]<fin && this.arregloTipos[k]==="Real" && this.arregloCategorias[k]===this.categoriasEgresos[j]){

            valor = valor +this.arregloEgresos[k]
          }
        } 

        let x = {
          categoria: cat,
          ingreso : valor,
          periodo: dia
        }
        this.egresosPorCatPorPeriodo.push(x)
      }
    }
    this.arreglinho=this.crearArregloPorPeriodo(this.ingresosPorCatPorPeriodo)
    this.arreglinho2=this.crearArregloPorPeriodo(this.egresosPorCatPorPeriodo)

  }

  public agruparPorSemanas(){

    let cantidadSemanas=Math.ceil(((this.toDate.getTime()-this.fromDate.getTime())/(1000*60*60*24)+1)/7)
    this.ingresosPorPeriodo=[]
    this.egresosPorPeriodo=[]
    this.saldosPorPeriodo=[]
    this.presupuestoPorPeriodo=[]
    this.labels=[]
    this.calcularSaldoInicial()

    for(let i = 0; i < cantidadSemanas; i++){

      this.ingresosPorPeriodo[i]=0;
      this.egresosPorPeriodo[i]=0;
      this.saldosPorPeriodo[i]=0;
      let inicio=this.fromDate.getTime()+i*(1000*60*60*24*7)
      let fin=this.fromDate.getTime()+(i+1)*(1000*60*60*24*7-1)
      let inicioFecha=new Date(inicio)
      let finFecha=new Date(fin)
      let presupuestoPeriodo=0
      if(fin<this.toDate.getTime()){
        this.labels[i]=(inicioFecha.getMonth()+1)+"/"+inicioFecha.getDate()+" - "+(finFecha.getMonth()+1)+"/"+finFecha.getDate()
      }
      else{
        this.labels[i]=(inicioFecha.getMonth()+1)+"/"+inicioFecha.getDate()+" - "+(this.toDate.getMonth()+1)+"/"+this.toDate.getDate()
        fin=this.toDate.getTime()+1;
      }

      for(let j = 0 ; j < this.arregloIngresos.length; j++){

        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Real" && (this.estaEnArreglo(this.catsIngSelec,this.arregloCategorias[j]) || this.estaEnArreglo(this.catsEgrSelec,this.arregloCategorias[j]))){

          this.ingresosPorPeriodo[i]=this.ingresosPorPeriodo[i]+this.arregloIngresos[j]
          this.egresosPorPeriodo[i]=this.egresosPorPeriodo[i]+this.arregloEgresos[j]
        }

        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Presupuesto"){

          presupuestoPeriodo=presupuestoPeriodo + this.arregloIngresos[j]-this.arregloEgresos[j]

        }

        if(j===(this.arregloIngresos.length-1) && i > 0){
          this.saldosPorPeriodo[i]=this.saldosPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
          this.presupuestoPorPeriodo[i]=this.presupuestoPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]+presupuestoPeriodo
        }
        else if(j===(this.arregloIngresos.length-1) && i === 0){
          this.saldosPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
          this.presupuestoPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]+presupuestoPeriodo
        }
        

      }
    }
    this.actualizarGraficos()
    this.calcularIngresosEgresos();
    document.getElementById("flujosCaja").style.width = 270*this.labels.length + "px";
    this.agruparPorSemanasPorCat()
  }

  public agruparPorSemanasPorCat(){

    this.ingresosPorCatPorPeriodo=[]
    this.egresosPorCatPorPeriodo=[]

    let cantidadSemanas=Math.ceil(((this.toDate.getTime()-this.fromDate.getTime())/(1000*60*60*24)+1)/7)

    for(let i = 0; i < cantidadSemanas; i++){

      let inicio=this.fromDate.getTime()+i*(1000*60*60*24*7)
      let fin=this.fromDate.getTime()+(i+1)*(1000*60*60*24*7-1)

      for(let j = 0 ; j < this.categoriasIngresos.length; j++){

        let valor = 0
        let cat = j
        let semana = i

        for(let k = 0; k < this.arregloIngresos.length; k++){

          if(inicio<=this.arregloFechas[k] && this.arregloFechas[k]<fin && this.arregloTipos[k]==="Real" && this.arregloCategorias[k]===this.categoriasIngresos[j]){

            valor = valor +this.arregloIngresos[k]
          }
        } 

        let x = {
          categoria: cat,
          ingreso : valor,
          periodo: semana
        }
        this.ingresosPorCatPorPeriodo.push(x)

      }
    }console.log(this.ingresosPorCatPorPeriodo)
    this.arreglinho=this.crearArregloPorPeriodo(this.ingresosPorCatPorPeriodo)
    console.log(this.arreglinho)

  }

  public agruparPorMes(){

    let cantidadMeses=(this.toDate.getFullYear()-this.fromDate.getFullYear())*12+this.toDate.getMonth()-this.fromDate.getMonth()+1
    this.ingresosPorPeriodo=[]
    this.egresosPorPeriodo=[]
    this.saldosPorPeriodo=[]
    this.presupuestoPorPeriodo=[]
    this.labels=[]
    this.calcularSaldoInicial()
    let inicio=0;
    let fin=0;

    for(let i = 0; i < cantidadMeses; i++){

      this.ingresosPorPeriodo[i]=0;
      this.egresosPorPeriodo[i]=0;
      this.saldosPorPeriodo[i]=0;
      let presupuestoPeriodo=0;

      if (i===0){
        inicio=this.fromDate.getTime()
      }
      else {
        inicio=fin+1
      }
      let inicioFecha=new Date(inicio)
      fin=inicioFecha.getTime()+(1000*60*60*24)*(this.daysInMonth(inicioFecha.getMonth()+1,inicioFecha.getFullYear())-inicioFecha.getDate()+1)-1
      this.labels[i]=this.monthNames[inicioFecha.getMonth()]+" - "+inicioFecha.getFullYear()
      if(fin >= this.toDate.getTime()){
        fin=this.toDate.getTime()+1
      }
      for(let j = 0 ; j < this.arregloIngresos.length; j++){

        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Real" && (this.estaEnArreglo(this.catsIngSelec,this.arregloCategorias[j]) || this.estaEnArreglo(this.catsEgrSelec,this.arregloCategorias[j]))){

          this.ingresosPorPeriodo[i]=this.ingresosPorPeriodo[i]+this.arregloIngresos[j]
          this.egresosPorPeriodo[i]=this.egresosPorPeriodo[i]+this.arregloEgresos[j]

        }
        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Presupuesto"){

          presupuestoPeriodo=presupuestoPeriodo + this.arregloIngresos[j]-this.arregloEgresos[j]

        }
        if(j===(this.arregloIngresos.length-1) && i > 0){
          this.saldosPorPeriodo[i]=this.saldosPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
          this.presupuestoPorPeriodo[i]=this.presupuestoPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]+presupuestoPeriodo
        }
        else if(j===(this.arregloIngresos.length-1) && i === 0){
          this.saldosPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
          this.presupuestoPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]+presupuestoPeriodo
        }
        

      }
    }
    this.actualizarGraficos();
    this.calcularIngresosEgresos();
    document.getElementById("flujosCaja").style.width = 270*this.labels.length + "px";
    this.agruparPorMesPorCat()
  }

  public agruparPorMesPorCat(){

    this.ingresosPorCatPorPeriodo=[]
    this.egresosPorCatPorPeriodo=[]

    let cantidadMeses=(this.toDate.getFullYear()-this.fromDate.getFullYear())*12+this.toDate.getMonth()-this.fromDate.getMonth()+1

    for(let i = 0; i < cantidadMeses; i++){

      let inicio=0
      let fin=0
      if (i===0){
        inicio=this.fromDate.getTime()
      }
      else {
        inicio=fin+1
      }
      let inicioFecha=new Date(inicio)
      fin=inicioFecha.getTime()+(1000*60*60*24)*(this.daysInMonth(inicioFecha.getMonth()+1,inicioFecha.getFullYear())-inicioFecha.getDate()+1)-1
      if(fin >= this.toDate.getTime()){
        fin=this.toDate.getTime()+1
      }

      for(let j = 0 ; j < this.categoriasIngresos.length; j++){

        let valor = 0
        let cat = j
        let mes = i

        for(let k = 0; k < this.arregloIngresos.length; k++){

          if(inicio<=this.arregloFechas[k] && this.arregloFechas[k]<fin && this.arregloTipos[k]==="Real" && this.arregloCategorias[k]===this.categoriasIngresos[j]){

            valor = valor +this.arregloIngresos[k]
          }
        } 

        let x = {
          categoria: cat,
          ingreso : valor,
          periodo: mes
        }
        this.ingresosPorCatPorPeriodo.push(x)

      }
    }console.log(this.ingresosPorCatPorPeriodo)
    this.arreglinho=this.crearArregloPorPeriodo(this.ingresosPorCatPorPeriodo)
    console.log(this.arreglinho)

  }

  public agruparPorAno(){

    let cantidadAnos=(this.toDate.getFullYear()-this.fromDate.getFullYear())+1
    this.ingresosPorPeriodo=[]
    this.egresosPorPeriodo=[]
    this.saldosPorPeriodo=[]
    this.presupuestoPorPeriodo=[]
    this.labels=[]
    this.calcularSaldoInicial()
    let inicio=0;
    let fin=0;

    for(let i = 0; i < cantidadAnos; i++){

      this.ingresosPorPeriodo[i]=0;
      this.egresosPorPeriodo[i]=0;
      this.saldosPorPeriodo[i]=0;
      let inicioAno=new Date((this.fromDate.getFullYear()+i)+"-01-01 GMT -0500")
      let siguienteAno=new Date((this.fromDate.getFullYear()+i+1)+"-01-01 GMT -0500")
      let presupuestoPeriodo=0

      if (i===0){
        inicio=this.fromDate.getTime()
      }
      else {
        inicio=inicioAno.getTime()
      }
      fin=siguienteAno.getTime()-1
      this.labels[i]=inicioAno.getFullYear()
      if(fin >= this.toDate.getTime()){
        fin=this.toDate.getTime()+1
      }
      for(let j = 0 ; j < this.arregloIngresos.length; j++){

        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Real" && (this.estaEnArreglo(this.catsIngSelec,this.arregloCategorias[j]) || this.estaEnArreglo(this.catsEgrSelec,this.arregloCategorias[j]))){

          this.ingresosPorPeriodo[i]=this.ingresosPorPeriodo[i]+this.arregloIngresos[j]
          this.egresosPorPeriodo[i]=this.egresosPorPeriodo[i]+this.arregloEgresos[j]

        }
        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Presupuesto"){

          presupuestoPeriodo=presupuestoPeriodo + this.arregloIngresos[j]-this.arregloEgresos[j]

        }
        if(j===(this.arregloIngresos.length-1) && i > 0){
          this.saldosPorPeriodo[i]=this.saldosPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
          this.presupuestoPorPeriodo[i]=this.presupuestoPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]+presupuestoPeriodo
        }
        else if(j===(this.arregloIngresos.length-1) && i === 0){
          this.saldosPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
          this.presupuestoPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]+presupuestoPeriodo
        }
        

      }console.log(presupuestoPeriodo)
    }
    this.actualizarGraficos()
    this.calcularIngresosEgresos();
    document.getElementById("flujosCaja").style.width = 270*this.labels.length + "px";
    this.agruparPorAnoPorCat()
  }

  public agruparPorAnoPorCat(){

    this.ingresosPorCatPorPeriodo=[]
    this.egresosPorCatPorPeriodo=[]
    let inicio=0;
    let fin=0;

    let cantidadAnos=(this.toDate.getFullYear()-this.fromDate.getFullYear())+1

    for(let i = 0; i < cantidadAnos; i++){

      let inicioAno=new Date((this.fromDate.getFullYear()+i)+"-01-01 GMT -0500")
      let siguienteAno=new Date((this.fromDate.getFullYear()+i+1)+"-01-01 GMT -0500")

      if (i===0){
        inicio=this.fromDate.getTime()
      }
      else {
        inicio=inicioAno.getTime()
      }
      fin=siguienteAno.getTime()-1
      if(fin >= this.toDate.getTime()){
        fin=this.toDate.getTime()+1
      }
      for(let j = 0 ; j < this.categoriasIngresos.length; j++){

        let valor = 0
        let cat = j
        let ano = i

        for(let k = 0; k < this.arregloIngresos.length; k++){

          if(inicio<=this.arregloFechas[k] && this.arregloFechas[k]<fin && this.arregloTipos[k]==="Real" && this.arregloCategorias[k]===this.categoriasIngresos[j]){

            valor = valor +this.arregloIngresos[k]
          }
        } 

        let x = {
          categoria: cat,
          ingreso : valor,
          periodo: ano
        }
        this.ingresosPorCatPorPeriodo.push(x)

      }
    }console.log(this.ingresosPorCatPorPeriodo)
    this.arreglinho=this.crearArregloPorPeriodo(this.ingresosPorCatPorPeriodo)
    console.log(this.arreglinho)

  }
    
  public daysInMonth (month, year) { 
    return new Date(year, month, 0).getDate(); 
} 
  public calcularSaldoInicial(){
    let encontrado=false
    let indices=[]
    let consecs=[]
    let inicio=this.fromDate.getTime()
    let minimo: number
    let indice=0

      for(let i = 0; i < this.arregloFechas.length; i++){
        if(this.arregloFechas[i]===inicio){
          indices.push(i)
          consecs.push(this.arregloConsecutivos[i])
          encontrado=true
        }
      }
      if(encontrado){
        minimo=consecs[0]
        indice=indices[0]
        for(let j = 1; j < indices.length; j++){
          if(consecs[j] < minimo){
            minimo = consecs[j]
            indice = indices[j]
            }
          }
        }
      this.saldoInicial=this.saldoBanco[indice]
    return this.saldoInicial
  }

  public estaEnArreglo(arreglo: any[], valor: any ){
    for(let k = 0; k < arreglo.length; k++){
      if(arreglo[k]===valor){
        return true
      }
    }
    return false
  }

  crearArregloPorPeriodo(array: any []){
    return _.map(array, 'ingreso');
  }

  public actualizarGraficos(){
    this.BarChart.data.labels=this.labels
    this.BarChart.data.datasets[0].data=this.ingresosPorPeriodo
    this.BarChart.data.datasets[1].data=this.egresosPorPeriodo
    this.BarChart.update()
    this.GrafPresupuesto.data.labels=this.labels
    this.GrafPresupuesto.data.datasets[0].data=this.saldosPorPeriodo
    this.GrafPresupuesto.data.datasets[1].data=this.presupuestoPorPeriodo
    this.GrafPresupuesto.update()
    this.graficoObj.data.labels=this.labels
    this.graficoObj.data.datasets[0].data=this.saldosPorPeriodo
    this.graficoObj.update()
    console.log(this.labels)

  }
  
}
