import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {

  public fecha: any;
  spinerGrafica = true;
  data: any;

  usuario: any[];
  reservas: any[];

  @ViewChild('grafico1', { static: false }) grafico1: ElementRef;
  @ViewChild('grafico2', { static: false }) grafico2: ElementRef;
  @ViewChild('grafico3', { static: false }) grafico3: ElementRef;
  @ViewChild('grafico4', { static: false }) grafico4: ElementRef;

  @ViewChild('grafico5', { static: false }) grafico5: ElementRef;
  @ViewChild('grafico6', { static: false }) grafico6: ElementRef;
  @ViewChild('grafico7', { static: false }) grafico7: ElementRef;
  @ViewChild('grafico8', { static: false }) grafico8: ElementRef;
  @ViewChild('grafico9', { static: false }) grafico9: ElementRef;
  @ViewChild('grafico10', { static: false }) grafico10: ElementRef;
  @ViewChild('grafico11', { static: false }) grafico11: ElementRef;
  @ViewChild('grafico12', { static: false }) grafico12: ElementRef;

  constructor(private theme: NbThemeService) {
    let TIME_IN_MS = 1000;
    setTimeout(() => {
      this.spinerGrafica = false;
    }, TIME_IN_MS);
  }

  ngOnInit() {
    this.fecha = Date.now();
    this.generarGrafico();
  }

  dataG2 = {
    labels: ["2006", "2010", "2014", "2018"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81]
      },
      {
        label: "My second dataset",
        data: [25, 49, 90, 101]
      },
      {
        label: "My third dataset",
        data: [25, 24, 48, 61]
      },
      {
        label: "My fourth dataset",
        data: [25, 30, 32, 40]
      },
    ]
  };
  public generarGrafico() {

    let graficoObj = this.grafico1.nativeElement.getContext('2d');
    let graficoObj2 = this.grafico2.nativeElement.getContext('2d');
    let graficoObj3 = this.grafico3.nativeElement.getContext('2d');
    let graficoObj4 = this.grafico4.nativeElement.getContext('2d');

    let graficoObj5 = this.grafico5.nativeElement.getContext('2d');
    let graficoObj6 = this.grafico6.nativeElement.getContext('2d');
    let graficoObj7 = this.grafico7.nativeElement.getContext('2d');
    let graficoObj8 = this.grafico8.nativeElement.getContext('2d');
    let graficoObj9 = this.grafico9.nativeElement.getContext('2d');
    let graficoObj10 = this.grafico10.nativeElement.getContext('2d');
    let graficoObj11 = this.grafico11.nativeElement.getContext('2d');
    let graficoObj12 = this.grafico12.nativeElement.getContext('2d');


    var chartData = {
      labels: this.dataG2.labels,
      datasets: [{
        label: 'Datos1',
        data: this.dataG2.datasets[0].data,
        fill: false,
        backgroundColor: [
          'rgba(234, 208, 79, 1)'
        ],
        borderColor: "#EAD04F",
      }
      ]
    };
    var chartDat2 = {
      labels: this.dataG2.labels,
      datasets: [
        {
          label: 'Datos 2',
          data: this.dataG2.datasets[1].data,
          fill: false,
          backgroundColor: [
            'rgba(91, 206, 96, 1)'
          ],
          borderColor: "#5BCE60",
        }
      ]
    };
    var chartData3 = {
      labels: this.dataG2.labels,
      datasets: [{
        label: 'Datos1',
        data: this.dataG2.datasets[2].data,
        fill: false,
        backgroundColor: [
          'rgba(227, 99, 61, 1)'
        ],
        borderColor: "#E3633D",
      }
      ]
    };
    var chartData4 = {
      labels: this.dataG2.labels,
      datasets: [{
        label: 'Datos1',
        data: this.dataG2.datasets[3].data,
        fill: false,
        backgroundColor: [
          'rgba(177, 42, 188, 1)'
        ],
        borderColor: "#B12ABC",
      }
      ]
    };
    var chartData5 = {
      labels: this.dataG2.labels,
      datasets: [{
        label: 'Razón corriente',
        data: this.dataG2.datasets[0].data,
        fill: false,
        backgroundColor: [
          'rgba(234, 208, 79, 1)', 'rgba(234, 208, 79, 1)', 'rgba(234, 208, 79, 1)', 'rgba(234, 208, 79, 1)'
        ],
        borderColor: "#EAD04F",
      },
      {
        label: 'Prueba ácida',
        data: this.dataG2.datasets[1].data,
        fill: false,
        backgroundColor: [
          'rgba(177, 42, 188, 1)', 'rgba(177, 42, 188, 1)', 'rgba(177, 42, 188, 1)', 'rgba(177, 42, 188, 1)'
        ],
        borderColor: "#B12ABC",
      },
      ]
    };

    var chartData7 = {
      labels: this.dataG2.labels,
      datasets: [{
        label: 'Variable',
        data: this.dataG2.datasets[0].data,
        fill: false,
        backgroundColor: [
          'rgba(108, 108, 108, 1)', 'rgba(108, 108, 108, 1)', 'rgba(108, 108, 108, 1)', 'rgba(108, 108, 108, 1)'
        ],
        borderColor: "#6C6C6C",
      },
      {
        label: 'Variable',
        data: this.dataG2.datasets[1].data,
        fill: false,
        backgroundColor: [
          'rgba(95, 185, 255, 1)', 'rgba(95, 185, 255, 1)', 'rgba(95, 185, 255, 1)', 'rgba(95, 185, 255, 1)'
        ],
        borderColor: "#5FB9FF",
      },
      {
        label: 'Variable',
        data: this.dataG2.datasets[2].data,
        fill: false,
        backgroundColor: [
          'rgba(146, 229, 131, 1)', 'rgba(146, 229, 131, 1)', 'rgba(146, 229, 131, 1)', 'rgba(146, 229, 131, 1)'
        ],
        borderColor: "#92E583",
      },
      {
        label: 'Variable',
        data: this.dataG2.datasets[3].data,
        fill: false,
        backgroundColor: [
          'rgba(237, 94, 94, 1)', 'rgba(237, 94, 94, 1)', 'rgba(237, 94, 94, 1)', 'rgba(237, 94, 94, 1)'
        ],
        borderColor: "#ED5E5E",
      },
      ]
    };

    var chartData8 = {
      labels: this.dataG2.labels,
      datasets: [{
        label: 'Flujo',
        data: this.dataG2.datasets[0].data,
        fill: false,
        backgroundColor: [
          'rgba(95, 185, 255, 1)', 'rgba(95, 185, 255, 1)', 'rgba(95, 185, 255, 1)', 'rgba(95, 185, 255, 1)'
        ],
        borderColor: "#5FB9FF",
      },
      {
        label: 'Total',
        data: this.dataG2.datasets[1].data,
        fill: false,
        backgroundColor: [
          'rgba(146, 229, 131, 1)', 'rgba(146, 229, 131, 1)', 'rgba(146, 229, 131, 1)', 'rgba(146, 229, 131, 1)'
        ],
        borderColor: "#92E583",
      },
      ]
    };

    var chartData9 = {
      labels: this.dataG2.labels,
      datasets: [{
        label: 'Datos 2',
        data: this.dataG2.datasets[0].data,
        fill: false,
        backgroundColor: [
          'rgba(177, 42, 188, 1)'
        ],
        borderColor: "#B12ABC",
      },
      {
        label: 'Datos 2',
        data: this.dataG2.datasets[1].data,
        fill: false,
        backgroundColor: [
          'rgba(91, 206, 96, 1)'
        ],
        borderColor: "#5BCE60",
      },
      {
        label: 'Datos 2',
        data: this.dataG2.datasets[2].data,
        fill: false,
        backgroundColor: [
          'rgba(227, 99, 61, 1)'
        ],
        borderColor: "#E3633D",
      },
      {
        label: 'Datos 2',
        data: this.dataG2.datasets[3].data,
        fill: false,
        backgroundColor: [
          'rgba(234, 208, 79, 1)'
        ],
        borderColor: "#EAD04F",
      }
      ]
    };

    var chartData10 = {
      labels: this.dataG2.labels,
      datasets: [{
        label: 'Datos 2',
        data: this.dataG2.datasets[0].data,
        fill: false,
        backgroundColor: [
          'rgba(51, 51, 51, 1)'
        ],
        borderColor: "#333333",
      },
      {
        label: 'Datos 2',
        data: this.dataG2.datasets[1].data,
        fill: false,
        backgroundColor: [
          '#EAD04F'
        ],
        borderColor: "#EAD04F",
      },
      {
        label: 'Datos 2',
        data: this.dataG2.datasets[2].data,
        fill: false,
        backgroundColor: [
          'rgba(61, 152, 222, 1)'
        ],
        borderColor: "#3D98DE",
      },
      {
        label: 'Datos 2',
        data: this.dataG2.datasets[3].data,
        fill: false,
        backgroundColor: [
          'rgba(37, 144, 17, 1)'
        ],
        borderColor: "#259011",
      }
      ]
    };

    var chartData11 = {
      labels: this.dataG2.labels,
      datasets: [
        {
          label: 'Prueba ácida',
          data: this.dataG2.datasets[1].data,
          fill: false,
          backgroundColor: [
            'rgba(255, 173, 173, 1)', 'rgba(255, 173, 173, 1)', 'rgba(255, 173, 173, 1)', 'rgba(255, 173, 173, 1)'
          ],
          borderColor: "#FFADAD",
        },
        {
        label: 'Razón corriente',
        data: this.dataG2.datasets[0].data,
        fill: false,
        backgroundColor: [
          'rgba(237, 94, 94, 1)', 'rgba(237, 94, 94, 1)', 'rgba(237, 94, 94, 1)', 'rgba(237, 94, 94, 1)'
        ],
        borderColor: "#ED5E5E",
      },
      
      ]
    };

    var chartData12 = {
      labels: this.dataG2.labels,
      datasets: [
        {
          label: 'Variable',
          data: this.dataG2.datasets[1].data,
          fill: false,
          backgroundColor: [
            'rgba(177, 42, 188, 1)', 'rgba(177, 42, 188, 1)', 'rgba(177, 42, 188, 1)', 'rgba(177, 42, 188, 1)'
          ],
          borderColor: "#B12ABC",
        },
        {
          label: 'Variable',
          data: this.dataG2.datasets[0].data,
          fill: false,
          backgroundColor: [
            'rgba(234, 208, 79, 1)', 'rgba(234, 208, 79, 1)', 'rgba(234, 208, 79, 1)', 'rgba(234, 208, 79, 1)'
          ],
          borderColor: "#EAD04F",
        },

      ]
    };

    var chart = new Chart(
      graficoObj,
      {
        "type": 'line',
        "data": chartData,
        "options": {
          "legend": {
            "display": false
          },
          "scales": {
            "yAxes": [{
              "display": false,
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
        "type": 'line',
        "data": chartDat2,
        "options": {
          "legend": {
            "display": false
          },
          "scales": {
            "yAxes": [{
              "display": false,
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
    var chart3 = new Chart(
      graficoObj3,
      {
        "type": 'line',
        "data": chartData3,
        "options": {
          "legend": {
            "display": false
          },
          "scales": {
            "yAxes": [{
              "display": false,
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
    var chart4 = new Chart(
      graficoObj4,
      {
        "type": 'line',
        "data": chartData4,
        "options": {
          "legend": {
            "display": false
          },
          "scales": {
            "yAxes": [{
              "display": false,
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

    var chart5 = new Chart(
      graficoObj5,
      {
        "type": 'bar',
        "data": chartData5,
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
    var char6 = new Chart(
      graficoObj6,
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
    var char7 = new Chart(
      graficoObj7,
      {
        "type": 'bar',
        "data": chartData7,
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

    var chart8 = new Chart(
      graficoObj8,
      {
        "type": 'bar',
        "data": chartData8,
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

    var chart9 = new Chart(
      graficoObj9,
      {
        "type": 'line',
        "data": chartData9,
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

    var chart10 = new Chart(
      graficoObj10,
      {
        "type": 'line',
        "data": chartData10,
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

    var chart11 = new Chart(
      graficoObj11,
      {
        "type": 'bar',
        "data": chartData11,
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

    var chart12 = new Chart(
      graficoObj12,
      {
        "type": 'bar',
        "data": chartData12,
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
  }
}
