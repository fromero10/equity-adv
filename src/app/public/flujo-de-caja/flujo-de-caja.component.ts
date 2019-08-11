import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import Chart from 'chart.js';
import { ChartComponent } from 'angular2-chartjs';
import {Router} from '@angular/router';

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
  mostrarIvsE=false;

  BarChart=[];
  usuario: any[];
  reservas: any[];


  @ViewChild('grafico1', { static: false}) grafico1: ElementRef;
  constructor(private theme: NbThemeService, public router: Router) {
    let TIME_IN_MS = 3000;
    setTimeout( () => {
      this.spinerGrafica = false;
    }, TIME_IN_MS);
  }

  ngOnInit() {
      this.generarGrafico()
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


  public abrirCalendario() {
    this.calendario=true;
  }

  public generarGrafico() {

    let graficoObj = this.grafico1.nativeElement.getContext('2d');
    var chartData = {
      labels: this.dataG2.labels,
      datasets: [{
        label: 'Evolución',
        data: this.dataG2.datasets[0].data,
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
          "scales": {
            "yAxes": [{
              "display": true,
              "ticks": {
                "beginAtZero": true,
                "stepValue": 10,
                "stepSize": 10
              }
            }]
          }
        }
      }
    );
  }
  public cambiarGrafico2(){
    this.mostrarIvsE=true
    this.generarGrafico2()
  }

  public cambiarGrafico1(){
    this.mostrarIvsE=false
    this.generarGrafico()
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

  public myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

}
