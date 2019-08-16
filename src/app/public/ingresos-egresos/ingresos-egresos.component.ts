import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-ingresos-egresos',
  templateUrl: './ingresos-egresos.component.html',
  styleUrls: ['./ingresos-egresos.component.scss']
})
export class IngresosEgresosComponent implements OnInit {

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
  

  @ViewChild('grafico1', { static: false}) grafico1: ElementRef;
  constructor(private theme: NbThemeService, public router: Router, private mainService: MainService) {
    let TIME_IN_MS = 3000;
    setTimeout( () => {
      this.spinerGrafica = false;
    }, TIME_IN_MS);
  }

  ngOnInit() {
 
    this.mainService.get('api/flujo_de_caja/empresa/5d5575040cc34a3ee86deb2c').subscribe(result =>{
      this.datinhos=result;
    this.crearArregloDatos();
    this.calcularIngresosEgresos();
    this.crearCategoriaIngresos();
    this.crearCategoriaEgresos();
    this.ingresosPorCategoria();
    this.egresosPorCategoria();
    this.generarGrafico();
    this.generarGrafico2Ingresos();
  })}

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
      labels: this.arregloFechas,
      datasets: [{
        label: 'Ingresos',
        data: this.arregloIngresos,
        fill: false,
        backgroundColor: "#5BCE60",
        borderColor: "#5BCE60",
      },
        {
          label: 'Egresos',
          data: this.arregloEgresos,
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
            this.arregloFechas.push(this.dato)
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

public calcularIngresosEgresos(){
  for(let i = 0; i < this.arregloIngresos.length; i++){
    this.sumaIngresos=this.sumaIngresos+this.arregloIngresos[i]
    this.sumaEgresos=this.sumaEgresos+this.arregloEgresos[i]
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
      if(i===0){this.agrupadoCategoriasIngresos[j]=0;console.log(j)}
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
      if(i===0){this.agrupadoCategoriasEgresos[j]=0;console.log("j")}
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
}
