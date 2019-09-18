import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import Chart from 'chart.js';
import { ChartComponent } from 'angular2-chartjs';
import {Router} from '@angular/router';
import { MainService } from '../services/main.service';
import { ObjectUnsubscribedError } from 'rxjs';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-flujo-de-caja',
  templateUrl: './flujo-de-caja.component.html',
  styleUrls: ['./flujo-de-caja.component.scss']
})
export class FlujoDeCajaComponent implements OnInit {

  public fecha: any;
  public hoy: any;
  public rango: any;
  hoyEnFecha: Date;
  calendario=false;
  spinerGrafica = true;
  data: any;
  agrupacionFechas=1;
  mostrarGraf=1;
  dato:any;
  min: Date;
  BarChart=[];
  GrafPresupuesto=[];
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
  categoriasIngresos=[];
  fromDate:Date;
  toDate:Date;
  ingresosPorPeriodo=[];
  egresosPorPeriodo=[];
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

  verdeAMostrar=0;
  rojoAMostrar=0;


  @ViewChild('grafico1', { static: false}) grafico1: ElementRef;

  range: { start: any; end: any; };
  constructor(private theme: NbThemeService, public router: Router, private mainService: MainService) {
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
      this.calcularIngresosEgresos()
      this.agruparPorDias()
      


      })
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
    /* for(let i = 0; i < this.datinhos.length; i++){ */
      for(var key in this.datinhos){
        for(var key2 in this.datinhos[key]){
          this.dato=this.datinhos[key][key2]
          console.log(key2)
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

  public calcularIngresosEgresos(){
    for(let i = 0; i < this.arregloIngresos.length; i++){
      this.sumaIngresos=this.sumaIngresos+this.arregloIngresos[i]
      this.sumaEgresos=this.sumaEgresos+this.arregloEgresos[i]
    }
    this.saldoFinal=this.saldoInicial+this.sumaIngresos-this.sumaEgresos
  }

  public generarGrafico() {

    let graficoObj = this.grafico1.nativeElement.getContext('2d');
    var chartData = {
      labels: this.labels,
      datasets: [{
        label: 'Evolución',
        data: this.saldosPorPeriodo,
        fill: true,
        steppedLine: 'before',
        backgroundColor: [
          '#F7F7F7'
        ],
        borderColor: "#5BCE60",
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

  generarGrafico3(){
    this.GrafPresupuesto = new Chart('vsPresupuesto',{
      type:'line',
      data:{
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets:[
          {
            label: "Real",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "#5BCE60",
            borderColor: "#5BCE60",
            fill: "false",
          },
          {
            
            label: "Presupuesto",
            data: [25, 49, 90, 101, 86, 15, 50],
            backgroundColor:"#B12ABC",
            borderColor:"#B12ABC",
            fill: "false",
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

  public goToAgregarIngreso(){
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
      console.log(this.fromDate,this.toDate)
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

      for(let j = 0 ; j < this.arregloIngresos.length; j++){

        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Real"){

          this.ingresosPorPeriodo[i]=this.ingresosPorPeriodo[i]+this.arregloIngresos[j]
          this.egresosPorPeriodo[i]=this.egresosPorPeriodo[i]+this.arregloEgresos[j]

        }
        if(j===(this.arregloIngresos.length-1) && i > 0){
          this.saldosPorPeriodo[i]=this.saldosPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
        }
        else if(j===(this.arregloIngresos.length-1) && i === 0){
          this.saldosPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
        }
        

      }
    }this.generarGrafico();
    this.generarGrafico2();
    this.generarGrafico3();
    console.log(this.saldosPorPeriodo)
  }

  public agruparPorSemanas(){

    let cantidadSemanas=Math.ceil(((this.toDate.getTime()-this.fromDate.getTime())/(1000*60*60*24)+1)/7)
    this.ingresosPorPeriodo=[]
    this.egresosPorPeriodo=[]
    this.saldosPorPeriodo=[]
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
      if(fin<this.toDate.getTime()){
        this.labels[i]=(inicioFecha.getMonth()+1)+"/"+inicioFecha.getDate()+" - "+(finFecha.getMonth()+1)+"/"+finFecha.getDate()
      }
      else{
        this.labels[i]=(inicioFecha.getMonth()+1)+"/"+inicioFecha.getDate()+" - "+(this.toDate.getMonth()+1)+"/"+this.toDate.getDate()
        fin=this.toDate.getTime()+1;
      }

      for(let j = 0 ; j < this.arregloIngresos.length; j++){

        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Real"){

          this.ingresosPorPeriodo[i]=this.ingresosPorPeriodo[i]+this.arregloIngresos[j]
          this.egresosPorPeriodo[i]=this.egresosPorPeriodo[i]+this.arregloEgresos[j]

        }
        if(j===(this.arregloIngresos.length-1) && i > 0){
          this.saldosPorPeriodo[i]=this.saldosPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
        }
        else if(j===(this.arregloIngresos.length-1) && i === 0){
          this.saldosPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
        }
        

      }
    }this.generarGrafico();
    this.generarGrafico2();
    this.generarGrafico3();
    console.log(this.saldosPorPeriodo)
  }

  public agruparPorMes(){

    let cantidadMeses=(this.toDate.getFullYear()-this.fromDate.getFullYear())*12+this.toDate.getMonth()-this.fromDate.getMonth()+1
    this.ingresosPorPeriodo=[]
    this.egresosPorPeriodo=[]
    this.saldosPorPeriodo=[]
    this.labels=[]
    this.calcularSaldoInicial()
    let inicio=0;
    let fin=0;

    for(let i = 0; i < cantidadMeses; i++){

      this.ingresosPorPeriodo[i]=0;
      this.egresosPorPeriodo[i]=0;
      this.saldosPorPeriodo[i]=0;

      if (i===0){
        inicio=this.fromDate.getTime()
        console.log(i)
      }
      else {
        inicio=fin+1
        console.log(i)
      }
      let inicioFecha=new Date(inicio)
      fin=inicioFecha.getTime()+(1000*60*60*24)*(this.daysInMonth(inicioFecha.getMonth()+1,inicioFecha.getFullYear())-inicioFecha.getDate()+1)-1
      this.labels[i]=this.monthNames[inicioFecha.getMonth()]+" - "+inicioFecha.getFullYear()
      if(fin >= this.toDate.getTime()){
        fin=this.toDate.getTime()+1
      }
      for(let j = 0 ; j < this.arregloIngresos.length; j++){

        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Real"){

          this.ingresosPorPeriodo[i]=this.ingresosPorPeriodo[i]+this.arregloIngresos[j]
          this.egresosPorPeriodo[i]=this.egresosPorPeriodo[i]+this.arregloEgresos[j]

        }
        if(j===(this.arregloIngresos.length-1) && i > 0){
          this.saldosPorPeriodo[i]=this.saldosPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
        }
        else if(j===(this.arregloIngresos.length-1) && i === 0){
          this.saldosPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
        }
        

      }
    }this.generarGrafico();
    this.generarGrafico2();
    this.generarGrafico3();
    console.log(this.saldosPorPeriodo)
  }

  public agruparPorAno(){

    let cantidadAnos=(this.toDate.getFullYear()-this.fromDate.getFullYear())+1
    this.ingresosPorPeriodo=[]
    this.egresosPorPeriodo=[]
    this.saldosPorPeriodo=[]
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

      if (i===0){
        inicio=this.fromDate.getTime()
        console.log(inicioAno)
      }
      else {
        inicio=inicioAno.getTime()
        console.log(inicioAno)
      }
      fin=siguienteAno.getTime()-1
      this.labels[i]=inicioAno.getFullYear()
      if(fin >= this.toDate.getTime()){
        fin=this.toDate.getTime()+1
      }
      for(let j = 0 ; j < this.arregloIngresos.length; j++){

        if(inicio<=this.arregloFechas[j] && this.arregloFechas[j]<fin && this.arregloTipos[j]==="Real"){

          this.ingresosPorPeriodo[i]=this.ingresosPorPeriodo[i]+this.arregloIngresos[j]
          this.egresosPorPeriodo[i]=this.egresosPorPeriodo[i]+this.arregloEgresos[j]

        }
        if(j===(this.arregloIngresos.length-1) && i > 0){
          this.saldosPorPeriodo[i]=this.saldosPorPeriodo[i-1]+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
        }
        else if(j===(this.arregloIngresos.length-1) && i === 0){
          this.saldosPorPeriodo[0]=this.saldoInicial+this.ingresosPorPeriodo[i]-this.egresosPorPeriodo[i]
        }
        

      }
    }this.generarGrafico();
    this.generarGrafico2();
    this.generarGrafico3();
    console.log(this.saldosPorPeriodo)
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
        }console.log(inicio,this.arregloFechas[i])
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
  
}
