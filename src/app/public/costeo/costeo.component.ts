import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { isNumber } from 'util';
import { isNumeric } from 'rxjs/internal-compatibility';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-costeo',
  templateUrl: './costeo.component.html',
  styleUrls: ['./costeo.component.scss']
})
export class CosteoComponent implements OnInit {


  public fecha: any;
  spinerGrafica = true;
  data: any;

  usuario: any={};
  reservas: any[];
  datinhos: any=[];
  variables: any=[];
  filtros: any=[];
  objetosVar: any=[];
  objetosFil:any=[]
  formVariables: FormGroup
  formFiltros: FormGroup
  variablesSeleccionadas=[];
  filtrosSeleccionados=[]
  variableVertical=0;
  filtroHorizontal=0;
  forma=false;
  forma2=false

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
  constructor(private theme: NbThemeService, private router: Router, public mainService: MainService, private formBuilder: FormBuilder) {
    let TIME_IN_MS = 3000;
    setTimeout(() => {
      this.spinerGrafica = false;
    }, TIME_IN_MS);
  }

  ngOnInit() {
    this.cargueBase()
    this.generarGrafico()
    this.fecha = Date.now();
  }

  public goToImportarCosteo(){
    this.router.navigate(['dashboard/importar-costeo'])
  }

  public cargueBase(){
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.mainService.get('api/costeo/empresa/'+ this.usuario.empresa).subscribe(result =>{
      this.datinhos=result
    console.log(this.datinhos)
    this.crearArregloDatos()
    this.configurarFiltros()
    })
      
  }

  public crearArregloDatos(){
    this.variables=[]
    this.filtros=[]
    this.filtros.push("Año","Mes","Factura")
    for(var key in this.datinhos){
      let dato = this.datinhos[key].key
      let valor = this.datinhos[key].value
      if(!this.estaEnArreglo(this.variables,dato) && isNumeric(valor)){
        this.variables.push(dato)
      }
      if(!this.estaEnArreglo(this.filtros,dato) && !(isNumeric(valor))){
        this.filtros.push(dato)
      }
    }
    console.log(this.variables,this.filtros)
  }

    public estaEnArreglo(arreglo: any[], valor: any ){
      for(let k = 0; k < arreglo.length; k++){
        if(arreglo[k]===valor){
          return true
        }
      }
      return false
    }
  
  public configurarFiltros(){
    for(let i=0;i<this.variables.length;i++){
      let x={
        id: i, name:this.variables[i]
      }
      this.objetosVar.push(x)
    }
    this.formVariables = this.formBuilder.group({
      objetosVar: new FormArray([])
    });
    this.addCheckboxes();
    for(let i=0;i<this.filtros.length;i++){
      let x={
        id: i, name:this.filtros[i]
      }
      this.objetosFil.push(x)
    }
    this.formFiltros = this.formBuilder.group({
      objetosFil: new FormArray([])
    });
    this.addCheckboxes2();
  }
  

  public addCheckboxes() {
    this.objetosVar.map((o, i) => {
      const control = new FormControl(i>=0); // if first item set to true, else false
      (this.formVariables.controls.objetosVar as FormArray).push(control);
    });
  }

  public addCheckboxes2() {
    this.objetosFil.map((o, i) => {
      const control = new FormControl(i>=0); // if first item set to true, else false
      (this.formFiltros.controls.objetosFil as FormArray).push(control);
    });
  }

  public submit() {
    const selectedOrderNamesV = this.formVariables.value.objetosVar
      .map((v, i) => v ? this.objetosVar[i].name : null)
      .filter(v => v !== null);
    for(let i = 0; i < selectedOrderNamesV.length; i++){
      if(i<10){
        this.variablesSeleccionadas[i]=selectedOrderNamesV[i]
      }
      
    }
    
    console.log(this.variablesSeleccionadas);
  }

  public submit2() {
    const selectedOrderNamesF = this.formFiltros.value.objetosFil
      .map((v, i) => v ? this.objetosFil[i].name : null)
      .filter(v => v !== null);
    for(let i = 0; i < selectedOrderNamesF.length; i++){
      if(i<5){
        this.filtrosSeleccionados[i]=selectedOrderNamesF[i]
      }
      
    }
    
    console.log(this.filtrosSeleccionados);
  }

  public eliminarTodo(){
    for (let i=0; i<this.datinhos.length; i++){
      this.mainService.delete('api/costeo/'+ this.datinhos[i]._id).subscribe(res =>{
        console.log(res);
    })

    }
  }

  public verVariable(){
    console.log(this.variableVertical)
  }

  public verFiltro(){
    console.log(this.filtroHorizontal)
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
