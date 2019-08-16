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
  calendario=false;
  spinerGrafica = true;
  data: any;
  mostrarGraf=1;
  dato:any;

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
  saldoInicial=0
  saldoFinal=0;
  categoriasIngresos=[];

  verdeAMostrar=0;
  rojoAMostrar=0;


  @ViewChild('grafico1', { static: false}) grafico1: ElementRef;
  constructor(private theme: NbThemeService, public router: Router, private mainService: MainService) {
    let TIME_IN_MS = 3000;
    setTimeout( () => {
      this.spinerGrafica = false;
    }, TIME_IN_MS);
  }

  ngOnInit() {
      
      this.generarGrafico2()
      this.generarGrafico3()
      this.mainService.get('api/flujo_de_caja/empresa/5d5575040cc34a3ee86deb2c').subscribe(result =>{
        this.datinhos=result;
      this.crearArregloDatos()
      this.generarGrafico()
      this.calcularIngresosEgresos()
      })
  }

  generarGrafico2(){
    this.BarChart = new Chart('IvsE',{
      type:'bar',
      data:{
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets:[
          {
            label: "Ingresos",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "#5BCE60",
          },
          {
            
            label: "Egresos",
            data: [25, 49, 90, 101, 86, 15, 50],
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
          if(key2==="fechaMovimiento"){
            this.arregloFechas.push(this.dato)
          }
          else if(key2==="saldoBanco"){
            this.saldoBanco.push(this.dato)
          }
          else if(key2==="ingreso"){
            this.arregloIngresos.push(this.dato)
          }
          else if(key2==="egreso"){
            this.arregloEgresos.push(this.dato)
          }
        }
        
        /* if(key==="saldoBanco"){
          this.labels.push(this.datinhos[key])
        } */
    }console.log(this.arregloIngresos)
    this.saldoInicial=this.saldoBanco[0]
  /* } */
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
      labels: this.arregloFechas,
      datasets: [{
        label: 'Evolución',
        data: this.saldoBanco,
        fill: true,
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

  public myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

}
