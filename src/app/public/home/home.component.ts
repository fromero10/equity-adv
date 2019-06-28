import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { icons } from 'eva-icons';
import * as moment from 'moment';
import * as _ from 'lodash';
import Chart from 'chart.js';

type ChartData = [{date, value, count}];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  spinerGrafica = true;
  data: any;

  usuario: any[];
  reservas: any[];

  @ViewChild('grafico1', { static: false}) grafico1: ElementRef;
  constructor(private theme: NbThemeService) {
    let TIME_IN_MS = 3000;
    setTimeout( () => {
      this.spinerGrafica = false;
    }, TIME_IN_MS);
  }

  ngOnInit() {
    this.generarGrafico()
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
        label: 'Datos1',
        data: this.dataG2.datasets[0].data,
        fill: false,
        backgroundColor: [
          'rgba(2, 137, 190, 1)'
        ],
        borderColor: "#0289be",
      },
        {
          label: 'Datos 2',
          data: this.dataG2.datasets[1].data,
          fill: false,
          backgroundColor: [
            'rgba(233, 28, 114, 1)'
          ],
          borderColor: "#e91c72",
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

}
