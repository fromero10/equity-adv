import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-ingresos-egresos',
  templateUrl: './ingresos-egresos.component.html',
  styleUrls: ['./ingresos-egresos.component.scss']
})
export class IngresosEgresosComponent implements OnInit {

  spinerGrafica = true;
  pieIngresos=[];
  mostrarIngresos=true;

  @ViewChild('grafico1', { static: false}) grafico1: ElementRef;
  constructor(private theme: NbThemeService, public router: Router) {
    let TIME_IN_MS = 3000;
    setTimeout( () => {
      this.spinerGrafica = false;
    }, TIME_IN_MS);
  }

  ngOnInit() {
    this.generarGrafico();
    this.generarGrafico2();
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

  public generarGrafico() {

    let graficoObj = this.grafico1.nativeElement.getContext('2d');
    var chartData = {
      labels: this.dataG2.labels,
      datasets: [{
        label: 'Ingresos',
        data: this.dataG2.datasets[0].data,
        fill: false,
        backgroundColor: "#5BCE60",
        borderColor: "#5BCE60",
      },
        {
          label: 'Egresos',
          data: this.dataG2.datasets[1].data,
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
  generarGrafico2(){
    this.pieIngresos = new Chart('pieIngresos',{
      type:'pie',
      data:{
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets:[
          {
            label: "Ingresos",
            data: [65, 59, 80, 81, 56, 55, 40],
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
}
