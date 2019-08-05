import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import Chart from 'chart.js';

@Component({
  selector: 'app-costeo',
  templateUrl: './costeo.component.html',
  styleUrls: ['./costeo.component.scss']
})
export class CosteoComponent implements OnInit {


  public fecha: any;
  spinerGrafica = true;
  data: any;

  usuario: any[];
  reservas: any[];

  @ViewChild('grafico1', { static: false }) grafico1: ElementRef;
  @ViewChild('grafico2', { static: false }) grafico2: ElementRef;

  dataG2 = {
    labels: ["Barranquilla", "", "Bogotá", "", "Buenaventura", "", "Cali", "", "Cartagena", "", "Leticia"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 0, 59, 0, 80, 0, 81, 0, 56, 0, 55]
      },
      {
        label: "My second dataset",
        data: [25, 49, 90, 101, 86, 15]
      },
      {
        label: "My third dataset",
        data: [-40, 20, 60, -10, 0, 15]
      },
    ]
  };

  dataG3 = {
    labels: ["Ventas totales", "Descuentos y devoluciones", "Ventas netas", "Costo unitario", "Utilidad bruta", "Gastos administrativos", "Gastos de venta", "Gastos diversos", "No operacional", "Resultado de actividad"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, -10, 59, -40, 80, -10, -5, -12, -22, 5]
      },
      {
        label: "My second dataset",
        data: [25, 49, 90, 101, 86, 15]
      },
      {
        label: "My third dataset",
        data: [-40, 20, 60, -10, 0, 15]
      },
    ]
  }
  constructor(private theme: NbThemeService) {
    let TIME_IN_MS = 3000;
    setTimeout(() => {
      this.spinerGrafica = false;
    }, TIME_IN_MS);
  }

  ngOnInit() {
    this.generarGrafico()
    this.fecha = Date.now();
  }

  public generarGrafico() {
    let graficoObj = this.grafico1.nativeElement.getContext('2d');
    let graficoObj2 = this.grafico2.nativeElement.getContext('2d');

    var chartData = {
      labels: this.dataG2.labels,
      datasets: [{
        label: 'Datos1',
        data: this.dataG2.datasets[0].data,
        fill: false,
        backgroundColor: [
          'rgba(61, 152, 222, 1)', 'rgba(61, 152, 222, 1)', 'rgba(61, 152, 222, 1)', 'rgba(61, 152, 222, 1)', 'rgba(61, 152, 222, 1)', 'rgba(61, 152, 222, 1)', 'rgba(61, 152, 222, 1)','rgba(61, 152, 222, 1)','rgba(61, 152, 222, 1)','rgba(61, 152, 222, 1)','rgba(61, 152, 222, 1)','rgba(61, 152, 222, 1)','rgba(61, 152, 222, 1)','rgba(61, 152, 222, 1)'
        ],
        borderColor: "#3D98DE",
      }
      ]
    };

    var chartData2 = {
      labels: this.dataG3.labels,
      datasets: [{
        label: 'Datos1',
        data: this.dataG3.datasets[0].data,
        fill: false,
        backgroundColor: [
          'rgba(146, 229, 131, 1)', 'rgba(237, 94, 94, 1)', 'rgba(146, 229, 131, 1)', 'rgba(237, 94, 94, 1)', 'rgba(146, 229, 131, 1)', 'rgba(237, 94, 94, 1)', 'rgba(237, 94, 94, 1)', 'rgba(237, 94, 94, 1)', 'rgba(237, 94, 94, 1)', 'rgba(146, 229, 131, 1)'
        ],
        borderColor: ["#92E583", "#ED5E5E", "#92E583", "#ED5E5E", "#92E583", "#ED5E5E", "#ED5E5E", "#ED5E5E", "#ED5E5E", "#92E583"]
      }
      ]
    };
    var chart = new Chart(
      graficoObj,
      {
        "type": 'bar',
        "data": chartData,
        "options": {
          "legend": {
            "display": false
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

    var chart2 = new Chart(
      graficoObj2,
      {
        "type": 'bar',
        "data": chartData2,
        "options": {
          "legend": {
            "display": false
          },
          "scales": {
            "yAxes": [{
              "display": true,
              "ticks": {
                "beginAtZero": true,
                "stepValue": 10,
                "stepSize": 10
              },
              "gridLines": {
                "color": "rgba(0, 0, 0, 0)",
              }
            }],
            "xAxes": [{
              "gridLines": {
                "color": "rgba(0, 0, 0, 0)",
              }
            }],
          }
        }
      }
    );
  }

}
