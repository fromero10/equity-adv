import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import { NbThemeService } from '@nebular/theme';
import { MainService } from '../services/main.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {

  public fecha: any;
  spinerGrafica = true;
  data: any;
  dato: any;
  hoyEnFecha: any;
  fromDate:Date;
  toDate:Date;
  calendario=false;
  usuario: any={};
  reservas: any[];
  datinhos=[]
  labels=[]
  liquidez=0
  variacionLiquidez=0
  rentabilidad=0
  variacionRentabilidad=0
  endeudamiento=0
  variacionEndeudamiento=0
  sistemaDupont=0
  variacionSistemaDupont=0
  agrupar=12
  public rango: any;
  monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  arregloRazonCorriente=[];
  arregloPruebaAcida=[];
  arregloCapitaldeTrabajo=[]
  arregloRotacionCarteraDias=[]
  arregloRotacionProveedoresDias=[]
  arregloRotacionInventariosDias=[]
  arregloCicloEfectivo=[]
  arregloRotacionActivosFijos=[]
  arregloRotacionActivosTotales=[]
  arregloMargenesUB=[]
  arregloMargenesEBITDA=[]
  arregloMargenesEBIT=[]
  arregloMargenesUN=[]
  arregloRentabilidadDelPatrimonio=[]
  arregloRentabilidadActivoTotal=[]
  arregloRentabilidadOperacionalPatrimonio=[]
  arregloRentabilidadOperacionalActivoTotal=[]
  arregloEndeudamientoTotal=[]
  arregloEndeudamientoFinanciero=[]
  arregloROA=[]
  arregloROE=[]
  datinhosOrdenados: any=[]
  chart5: any=[]
  chart6: any=[]
  chart7: any=[]
  chart8: any=[]
  chart9: any=[]
  chart10: any=[]
  chart11: any=[]
  chart12: any=[]
  chartData: any=[]
  chartData5: any=[]
  chartData6: any=[]
  chartData7: any=[]
  chartData8: any=[]
  chartData9: any=[]
  chartData10: any=[]
  chartData11: any=[]
  chartData12: any=[]

  @ViewChild('grafico5', { static: false }) grafico5: ElementRef;
  @ViewChild('grafico6', { static: false }) grafico6: ElementRef;
  @ViewChild('grafico7', { static: false }) grafico7: ElementRef;
  @ViewChild('grafico8', { static: false }) grafico8: ElementRef;
  @ViewChild('grafico9', { static: false }) grafico9: ElementRef;
  @ViewChild('grafico10', { static: false }) grafico10: ElementRef;
  @ViewChild('grafico11', { static: false }) grafico11: ElementRef;
  @ViewChild('grafico12', { static: false }) grafico12: ElementRef;
  

  constructor(private theme: NbThemeService, private mainService: MainService, public router: Router) {
    let TIME_IN_MS = 1000;
    setTimeout(() => {
      this.spinerGrafica = false;
    }, TIME_IN_MS);
  }

  ngOnInit() {
    this.fecha = Date.now();
    this.hoyEnFecha=new Date(this.fecha)
    this.fromDate=new Date(this.hoyEnFecha.getFullYear()-1+"-"+"12-31 GMT -0500")
    this.toDate=new Date(this.hoyEnFecha.getFullYear()+"-"+"12-31 GMT -0500")
    this.rango=this.fromDate.getFullYear()+"/"+(this.fromDate.getMonth()+1)+"/"+this.fromDate.getDate()+" - "+this.toDate.getFullYear()+"/"+(this.toDate.getMonth()+1)+"/"+this.toDate.getDate()
    this.cargueBase();
  }

  public cargueBase(){
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.mainService.get('api/periodo/empresa/' + this.usuario.empresa ).subscribe(result =>{
      this.datinhos=result;
      console.log(this.datinhos, this.usuario.empresa)
      this.crearArregloDatos();
      this.calculoIndicadores();  
      this.generarGrafico();
    })
      
  }

  public crearArregloDatos(){
    this.datinhosOrdenados=_.orderBy(this.datinhos, ['perido', 'fecha'], ['asc', 'asc']);
  }

  public calculoIndicadores(){
    this.arregloRazonCorriente=[]
    this.arregloPruebaAcida=[]
    this.labels=[]
    this.arregloCapitaldeTrabajo=[]
    this.arregloRotacionCarteraDias=[]
    this.arregloRotacionProveedoresDias=[]
    this.arregloRotacionInventariosDias=[]
    this.arregloCicloEfectivo=[]
    this.arregloRotacionActivosFijos=[]
    this.arregloRotacionActivosTotales=[]
    this.arregloMargenesUB=[]
    this.arregloMargenesEBITDA=[]
    this.arregloMargenesEBIT=[]
    this.arregloMargenesUN=[]
    this.arregloRentabilidadDelPatrimonio=[]
    this.arregloRentabilidadActivoTotal=[]
    this.arregloRentabilidadOperacionalPatrimonio=[]
    this.arregloRentabilidadOperacionalActivoTotal=[]
    this.arregloEndeudamientoTotal=[]
    this.arregloEndeudamientoFinanciero=[]
    this.arregloROA=[]
    this.arregloROE=[]
    this.liquidez=0
    this.variacionLiquidez=0
    this.rentabilidad=0
    this.variacionRentabilidad=0
    this.endeudamiento=0
    this.variacionEndeudamiento=0
    this.sistemaDupont=0
    this.variacionSistemaDupont=0
    let inicio=0;
    let fin=0;
    let contar=0
    if(this.agrupar===1){
      
      let cantidadMeses=(this.toDate.getFullYear()-this.fromDate.getFullYear())*12+this.toDate.getMonth()-this.fromDate.getMonth()+1
      console.log('cantidad de meses', cantidadMeses)
      for (let j = 0; j < cantidadMeses; j++){
        if (j===0){
          inicio=this.fromDate.getTime()
        }
        else {
          inicio=fin+1
        }
        let inicioFecha=new Date(inicio)
        fin=inicioFecha.getTime()+(1000*60*60*24)*(this.daysInMonth(inicioFecha.getMonth()+1,inicioFecha.getFullYear()) -inicioFecha.getDate()+1)-1
          for (let i = 0; i < this.datinhosOrdenados.length; i++){
            let fecha=(Date.parse(this.datinhosOrdenados[i].fecha)+this.hoyEnFecha.getTimezoneOffset()*60000)
            
            if(this.datinhosOrdenados[i].periodoDeLosEEFF===1 && fecha <= fin && fecha >= inicio){
              console.log(inicio,fecha,fin)
            /* Crear labels graficos */
              this.labels[contar]=this.monthNames[inicioFecha.getMonth()]+" - "+inicioFecha.getFullYear();
            /* Cálculo razón corriente */
              this.arregloRazonCorriente[contar]=this.datinhosOrdenados[i].totalActivoCorriente/this.datinhosOrdenados[i].totalPasivoCorriente;
            /* Cálculo prueba ácida */
              this.arregloPruebaAcida[contar]=(this.datinhosOrdenados[i].totalActivoCorriente-this.datinhosOrdenados[i].inventarios)/  this.datinhosOrdenados[i].totalPasivoCorriente;
            /* Cálculo capital de trabajo (liquidez) */
              this.arregloCapitaldeTrabajo[contar]=(this.datinhosOrdenados[i].totalActivoCorriente-this.datinhosOrdenados[i].totalPasivoCorriente)/1000000;
            /* Cálculo rotacion de cartera */
              this.arregloRotacionCarteraDias[contar]=this.datinhosOrdenados[i].cuentasPorCobrar*30*this.datinhosOrdenados[i].periodoDeLosEEFF/  this.datinhosOrdenados[i].ventas
            /* Cálculo rotacion de proveedores */
              this.arregloRotacionProveedoresDias[contar]=this.datinhosOrdenados[i].cuentasPorPagar*30*this.datinhosOrdenados[i].periodoDeLosEEFF/ this.datinhosOrdenados[i].costoDeVentas
            /* Cálculo rotacion de inventarios */
              this.arregloRotacionInventariosDias[contar]=this.datinhosOrdenados[i].inventarios*30*this.datinhosOrdenados[i].periodoDeLosEEFF/ this.datinhosOrdenados[i].costoDeVentas
            /* Cálculo ciclo de conversión de efectivo */
              this.arregloCicloEfectivo[contar]=this.arregloRotacionCarteraDias[contar]+this.arregloRotacionInventariosDias[contar]  -this.arregloRotacionProveedoresDias[contar]
            /* Cálculo rotacion de activos fijos */
              this.arregloRotacionActivosFijos[contar]=this.datinhosOrdenados[i].ventas/this.datinhosOrdenados[i].totalActivoNoCorriente
            /* Cálculo rotacion de activos totales */
              this.arregloRotacionActivosTotales[contar]=this.datinhosOrdenados[i].ventas/this.datinhosOrdenados[i].totalActivo
            /* Cálculo margen utilidad bruta */
              this.arregloMargenesUB[contar]=this.datinhosOrdenados[i].utilidadBruta/this.datinhosOrdenados[i].ventas
            /* Cálculo margen EBITDA */
              this.arregloMargenesEBITDA[contar]=this.datinhosOrdenados[i].ebitda/this.datinhosOrdenados[i].ventas
            /* Cálculo margen EBIT */
              this.arregloMargenesEBIT[contar]=this.datinhosOrdenados[i].ebit/this.datinhosOrdenados[i].ventas
            /* Cálculo margen utilidad neta */
              this.arregloMargenesUN[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].ventas
            /* Cálculo rentabilidad del patrimonio */
              this.arregloRentabilidadDelPatrimonio[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalPatrimonio
            /* Cálculo rentabilidad del activo total */
              this.arregloRentabilidadActivoTotal[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalActivo
            /* Cálculo rentabilidad operacional del patrimonio */
              this.arregloRentabilidadOperacionalPatrimonio[contar]=this.datinhosOrdenados[i].ebit/this.datinhosOrdenados[i].totalPatrimonio
            /* Cálculo rentabilidad operacional del activo fijo */
              this.arregloRentabilidadOperacionalActivoTotal[contar]=this.datinhosOrdenados[i].ebit/this.datinhosOrdenados[i].totalActivo
            /* Cálculo endeudamiento total */
              this.arregloEndeudamientoTotal[contar]=this.datinhosOrdenados[i].totalPasivo/this.datinhosOrdenados[i].totalActivo
            /* Cálculo endeudamiento financiero */
              this.arregloEndeudamientoFinanciero[contar]=this.datinhosOrdenados[i].obligacionesFinancieras/this.datinhosOrdenados[i].totalPasivo
            /* Cálculo ROA */
              this.arregloROA[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalActivo
            /* Cálculo ROE */
              this.arregloROE[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalPatrimonio
  
              contar++
            }
          }    
      }
    }
    else if(this.agrupar===3){
      
      let cantidadTrimestres=(this.toDate.getFullYear()-this.fromDate.getFullYear())*4+Math.ceil((this.toDate.getMonth()+1)/3)-Math.ceil((this.fromDate.getMonth()+1)/3)+1
      console.log('cantidad de trimestres', cantidadTrimestres)
      for (let j = 0; j < cantidadTrimestres; j++){
        if (j===0){
          inicio=this.fromDate.getTime()
        }
        else {
          inicio=fin+1
        }
        let inicioFecha=new Date(inicio)
        fin=inicioFecha.getTime()+(1000*60*60*24)*(this.daysInMonth(inicioFecha.getMonth()+1,inicioFecha.getFullYear()) -inicioFecha.getDate()+1)-1
          for (let i = 0; i < this.datinhosOrdenados.length; i++){
            let fecha=(Date.parse(this.datinhosOrdenados[i].fecha)+this.hoyEnFecha.getTimezoneOffset()*60000)
            
            if(this.datinhosOrdenados[i].periodoDeLosEEFF===1 && fecha <= fin && fecha >= inicio){
              console.log(inicio,fecha,fin)
            /* Crear labels graficos */
              this.labels[contar]=this.monthNames[inicioFecha.getMonth()]+" - "+inicioFecha.getFullYear();
            /* Cálculo razón corriente */
              this.arregloRazonCorriente[contar]=this.datinhosOrdenados[i].totalActivoCorriente/this.datinhosOrdenados[i].totalPasivoCorriente;
            /* Cálculo prueba ácida */
              this.arregloPruebaAcida[contar]=(this.datinhosOrdenados[i].totalActivoCorriente-this.datinhosOrdenados[i].inventarios)/  this.datinhosOrdenados[i].totalPasivoCorriente;
            /* Cálculo capital de trabajo (liquidez) */
              this.arregloCapitaldeTrabajo[contar]=(this.datinhosOrdenados[i].totalActivoCorriente-this.datinhosOrdenados[i].totalPasivoCorriente)/1000000;
            /* Cálculo rotacion de cartera */
              this.arregloRotacionCarteraDias[contar]=this.datinhosOrdenados[i].cuentasPorCobrar*30*this.datinhosOrdenados[i].periodoDeLosEEFF/  this.datinhosOrdenados[i].ventas
            /* Cálculo rotacion de proveedores */
              this.arregloRotacionProveedoresDias[contar]=this.datinhosOrdenados[i].cuentasPorPagar*30*this.datinhosOrdenados[i].periodoDeLosEEFF/ this.datinhosOrdenados[i].costoDeVentas
            /* Cálculo rotacion de inventarios */
              this.arregloRotacionInventariosDias[contar]=this.datinhosOrdenados[i].inventarios*30*this.datinhosOrdenados[i].periodoDeLosEEFF/ this.datinhosOrdenados[i].costoDeVentas
            /* Cálculo ciclo de conversión de efectivo */
              this.arregloCicloEfectivo[contar]=this.arregloRotacionCarteraDias[contar]+this.arregloRotacionInventariosDias[contar]  -this.arregloRotacionProveedoresDias[contar]
            /* Cálculo rotacion de activos fijos */
              this.arregloRotacionActivosFijos[contar]=this.datinhosOrdenados[i].ventas/this.datinhosOrdenados[i].totalActivoNoCorriente
            /* Cálculo rotacion de activos totales */
              this.arregloRotacionActivosTotales[contar]=this.datinhosOrdenados[i].ventas/this.datinhosOrdenados[i].totalActivo
            /* Cálculo margen utilidad bruta */
              this.arregloMargenesUB[contar]=this.datinhosOrdenados[i].utilidadBruta/this.datinhosOrdenados[i].ventas
            /* Cálculo margen EBITDA */
              this.arregloMargenesEBITDA[contar]=this.datinhosOrdenados[i].ebitda/this.datinhosOrdenados[i].ventas
            /* Cálculo margen EBIT */
              this.arregloMargenesEBIT[contar]=this.datinhosOrdenados[i].ebit/this.datinhosOrdenados[i].ventas
            /* Cálculo margen utilidad neta */
              this.arregloMargenesUN[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].ventas
            /* Cálculo rentabilidad del patrimonio */
              this.arregloRentabilidadDelPatrimonio[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalPatrimonio
            /* Cálculo rentabilidad del activo total */
              this.arregloRentabilidadActivoTotal[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalActivo
            /* Cálculo rentabilidad operacional del patrimonio */
              this.arregloRentabilidadOperacionalPatrimonio[contar]=this.datinhosOrdenados[i].ebit/this.datinhosOrdenados[i].totalPatrimonio
            /* Cálculo rentabilidad operacional del activo fijo */
              this.arregloRentabilidadOperacionalActivoTotal[contar]=this.datinhosOrdenados[i].ebit/this.datinhosOrdenados[i].totalActivo
            /* Cálculo endeudamiento total */
              this.arregloEndeudamientoTotal[contar]=this.datinhosOrdenados[i].totalPasivo/this.datinhosOrdenados[i].totalActivo
            /* Cálculo endeudamiento financiero */
              this.arregloEndeudamientoFinanciero[contar]=this.datinhosOrdenados[i].obligacionesFinancieras/this.datinhosOrdenados[i].totalPasivo
            /* Cálculo ROA */
              this.arregloROA[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalActivo
            /* Cálculo ROE */
              this.arregloROE[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalPatrimonio
  
              contar++
            }
          }    
      }
    }

    else if(this.agrupar===12){
      
      let cantidadAnos=(this.toDate.getFullYear()-this.fromDate.getFullYear())+1
      console.log(cantidadAnos  )
      for (let j = 0; j < cantidadAnos; j++){
        let inicioAno=new Date((this.fromDate.getFullYear()+j)+"-01-01 GMT -0500")
        let siguienteAno=new Date((this.fromDate.getFullYear()+j+1)+"-01-01 GMT -0500")
        
          inicio=inicioAno.getTime()
        
          fin=siguienteAno.getTime()-1
        
        console.log(inicioAno,siguienteAno)
          for (let i = 0; i < this.datinhosOrdenados.length; i++){
            let fecha=(Date.parse(this.datinhosOrdenados[i].fecha)+this.hoyEnFecha.getTimezoneOffset()*60000)
            if(this.datinhosOrdenados[i].periodoDeLosEEFF===12 && fecha < fin && fecha >= inicio){
              console.log(inicio,fecha,fin)
            /* Crear labels graficos */
              this.labels[contar]=inicioAno.getFullYear()
            /* Cálculo razón corriente */
              this.arregloRazonCorriente[contar]=this.datinhosOrdenados[i].totalActivoCorriente/this.datinhosOrdenados[i].totalPasivoCorriente;
            /* Cálculo prueba ácida */
              this.arregloPruebaAcida[contar]=(this.datinhosOrdenados[i].totalActivoCorriente-this.datinhosOrdenados[i].inventarios)/  this.datinhosOrdenados[i].totalPasivoCorriente;
            /* Cálculo capital de trabajo (liquidez) */
              this.arregloCapitaldeTrabajo[contar]=(this.datinhosOrdenados[i].totalActivoCorriente-this.datinhosOrdenados[i].totalPasivoCorriente)/1000000;
            /* Cálculo rotacion de cartera */
              this.arregloRotacionCarteraDias[contar]=this.datinhosOrdenados[i].cuentasPorCobrar*30*this.datinhosOrdenados[i].periodoDeLosEEFF/  this.datinhosOrdenados[i].ventas
            /* Cálculo rotacion de proveedores */
              this.arregloRotacionProveedoresDias[contar]=this.datinhosOrdenados[i].cuentasPorPagar*30*this.datinhosOrdenados[i].periodoDeLosEEFF/ this.datinhosOrdenados[i].costoDeVentas
            /* Cálculo rotacion de inventarios */
              this.arregloRotacionInventariosDias[contar]=this.datinhosOrdenados[i].inventarios*30*this.datinhosOrdenados[i].periodoDeLosEEFF/ this.datinhosOrdenados[i].costoDeVentas
            /* Cálculo ciclo de conversión de efectivo */
              this.arregloCicloEfectivo[contar]=this.arregloRotacionCarteraDias[contar]+this.arregloRotacionInventariosDias[contar]  -this.arregloRotacionProveedoresDias[contar]
            /* Cálculo rotacion de activos fijos */
              this.arregloRotacionActivosFijos[contar]=this.datinhosOrdenados[i].ventas/this.datinhosOrdenados[i].totalActivoNoCorriente
            /* Cálculo rotacion de activos totales */
              this.arregloRotacionActivosTotales[contar]=this.datinhosOrdenados[i].ventas/this.datinhosOrdenados[i].totalActivo
            /* Cálculo margen utilidad bruta */
              this.arregloMargenesUB[contar]=this.datinhosOrdenados[i].utilidadBruta/this.datinhosOrdenados[i].ventas
            /* Cálculo margen EBITDA */
              this.arregloMargenesEBITDA[contar]=this.datinhosOrdenados[i].ebitda/this.datinhosOrdenados[i].ventas
            /* Cálculo margen EBIT */
              this.arregloMargenesEBIT[contar]=this.datinhosOrdenados[i].ebit/this.datinhosOrdenados[i].ventas
            /* Cálculo margen utilidad neta */
              this.arregloMargenesUN[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].ventas
            /* Cálculo rentabilidad del patrimonio */
              this.arregloRentabilidadDelPatrimonio[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalPatrimonio
            /* Cálculo rentabilidad del activo total */
              this.arregloRentabilidadActivoTotal[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalActivo
            /* Cálculo rentabilidad operacional del patrimonio */
              this.arregloRentabilidadOperacionalPatrimonio[contar]=this.datinhosOrdenados[i].ebit/this.datinhosOrdenados[i].totalPatrimonio
            /* Cálculo rentabilidad operacional del activo fijo */
              this.arregloRentabilidadOperacionalActivoTotal[contar]=this.datinhosOrdenados[i].ebit/this.datinhosOrdenados[i].totalActivo
            /* Cálculo endeudamiento total */
              this.arregloEndeudamientoTotal[contar]=this.datinhosOrdenados[i].totalPasivo/this.datinhosOrdenados[i].totalActivo
            /* Cálculo endeudamiento financiero */
              this.arregloEndeudamientoFinanciero[contar]=this.datinhosOrdenados[i].obligacionesFinancieras/this.datinhosOrdenados[i].totalPasivo
            /* Cálculo ROA */
              this.arregloROA[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalActivo
            /* Cálculo ROE */
              this.arregloROE[contar]=this.datinhosOrdenados[i].utilidadNeta/this.datinhosOrdenados[i].totalPatrimonio
  
              contar++
            }
          }    
      }
    }
    
    this.liquidez=this.arregloCapitaldeTrabajo[contar-1]
    this.rentabilidad=this.arregloRentabilidadDelPatrimonio[contar-1]
    this.endeudamiento=this.arregloEndeudamientoTotal[contar-1]
    this.sistemaDupont=this.arregloROA[contar-1]
    if(contar>1){
      /* Cálculo variación de la liquidez */
      this.variacionLiquidez=(this.arregloCapitaldeTrabajo[contar-1]-this.arregloCapitaldeTrabajo[contar-2])/this.arregloCapitaldeTrabajo[contar-2]
      /* Cálculo variación de la rentabilidad */
      this.variacionRentabilidad=(this.arregloRentabilidadDelPatrimonio[contar-1]-this.arregloRentabilidadDelPatrimonio[contar-2])/this.arregloRentabilidadDelPatrimonio[contar-2]
      /* Cálculo variación del endeudamiento */
      this.variacionEndeudamiento=(this.arregloEndeudamientoTotal[contar-1]-this.arregloEndeudamientoTotal[contar-2])/this.arregloEndeudamientoTotal[contar-2]
      /* Cálculo variación del sistema dupont */
      this.variacionSistemaDupont=(this.arregloROA[contar-1]-this.arregloROA[contar-2])/this.arregloROA[contar-2]
    }
    console.log(this.arregloRotacionActivosFijos)
  }

  getRangeDate(event) {

    if (event.start && event.end) {
      this.fromDate = new Date(event.start);
      this.toDate = new Date(event.end);
      this.rango=this.fromDate.getFullYear()+"/"+(this.fromDate.getMonth()+1)+"/"+this.fromDate.getDate()+" - "+this.toDate.getFullYear()+"/"+(this.toDate.getMonth()+1)+"/"+this.toDate.getDate()    
      this.calculoIndicadores()
      this.actualizarGraficos()
    }
  }

  public daysInMonth (month, year) { 
    return new Date(year, month, 0).getDate(); 
  } 

  public goToImportarEEFF(){
    this.router.navigate(['dashboard/importar-eeff'])
  }

  public generarGrafico() {
    let graficoObj5 = this.grafico5.nativeElement.getContext('2d');
    let graficoObj6 = this.grafico6.nativeElement.getContext('2d');
    let graficoObj7 = this.grafico7.nativeElement.getContext('2d');
    let graficoObj8 = this.grafico8.nativeElement.getContext('2d');
    let graficoObj9 = this.grafico9.nativeElement.getContext('2d');
    let graficoObj10 = this.grafico10.nativeElement.getContext('2d');
    let graficoObj11 = this.grafico11.nativeElement.getContext('2d');
    let graficoObj12 = this.grafico12.nativeElement.getContext('2d');


    this.chartData = {
      labels: this.labels,
      datasets: [{
        label: 'Capital de trabajo',
        data: this.arregloCapitaldeTrabajo,
        fill: false,
        backgroundColor: [
          'rgba(234, 208, 79, 1)'
        ],
        borderColor: "#EAD04F",
      }
      ]
    };

    this.chartData5 = {
      labels: this.labels,
      datasets: [{
        label: 'Razón corriente',
        data: this.arregloRazonCorriente,
        fill: false,
        backgroundColor: 'rgba(234, 208, 79, 1)',
        borderColor: "#EAD04F",
      },
      {
        label: 'Prueba ácida',
        data: this.arregloPruebaAcida,
        fill: false,
        backgroundColor: 'rgba(177, 42, 188, 1)',
        borderColor: "#B12ABC",
      },
      ]
    };

    this.chartData7 = {
      labels: this.labels,
      datasets: [{
        label: 'Cartera',
        data: this.arregloRotacionCarteraDias,
        fill: false,
        backgroundColor:'rgba(108, 108, 108, 1)',
        borderColor: "#6C6C6C",
      },
      {
        label: 'Proveedores',
        data: this.arregloRotacionProveedoresDias,
        fill: false,
        backgroundColor: 'rgba(95, 185, 255, 1)',
        borderColor: "#5FB9FF",
      },
      {
        label: 'Inventarios',
        data: this.arregloRotacionInventariosDias,
        fill: false,
        backgroundColor: 'rgba(146, 229, 131, 1)',
        borderColor: "#92E583",
      },
      {
        label: 'Ciclo de conversión de efectivo',
        data: this.arregloCicloEfectivo,
        fill: false,
        backgroundColor:'rgba(237, 94, 94, 1)',
        borderColor: "#ED5E5E",
      },
      ]
    };

    this.chartData8 = {
      labels: this.labels,
      datasets: [{
        label: 'Fijos',
        data: this.arregloRotacionActivosFijos,
        fill: false,
        backgroundColor: 'rgba(95, 185, 255, 1)',
        borderColor: "#5FB9FF",
      },
      {
        label: 'Total',
        data: this.arregloRotacionActivosTotales,
        fill: false,
        backgroundColor:'rgba(146, 229, 131, 1)',
        borderColor: "#92E583",
      },
      ]
    };

    this.chartData9 = {
      labels: this.labels,
      datasets: [{
        label: 'Margen utilidad bruta',
        data: this.arregloMargenesUB,
        fill: false,
        backgroundColor: [
          'rgba(177, 42, 188, 1)'
        ],
        borderColor: "#B12ABC",
      },
      {
        label: 'Margen EBITDA',
        data: this.arregloMargenesEBITDA,
        fill: false,
        backgroundColor: [
          'rgba(91, 206, 96, 1)'
        ],
        borderColor: "#5BCE60",
      },
      {
        label: 'Margen EBIT',
        data: this.arregloMargenesEBIT,
        fill: false,
        backgroundColor: [
          'rgba(227, 99, 61, 1)'
        ],
        borderColor: "#E3633D",
      },
      {
        label: 'Margen utilidad neta',
        data: this.arregloMargenesUN,
        fill: false,
        backgroundColor: [
          'rgba(234, 208, 79, 1)'
        ],
        borderColor: "#EAD04F",
      }
      ]
    };

    this.chartData10 = {
      labels: this.labels,
      datasets: [{
        label: 'Rentabilidad del patrimonio',
        data: this.arregloRentabilidadDelPatrimonio,
        fill: false,
        backgroundColor: [
          'rgba(51, 51, 51, 1)'
        ],
        borderColor: "#333333",
      },
      {
        label: 'Rentabilidad del activo total',
        data: this.arregloRentabilidadActivoTotal,
        fill: false,
        backgroundColor: [
          '#EAD04F'
        ],
        borderColor: "#EAD04F",
      },
      {
        label: 'Rentabilidad operacional del patrimonio',
        data: this.arregloRentabilidadOperacionalPatrimonio,
        fill: false,
        backgroundColor: [
          'rgba(61, 152, 222, 1)'
        ],
        borderColor: 'rgba(61, 152, 222, 1)',
      },
      {
        label: 'Rentabilidad operacional del activo fijo',
        data: this.arregloRentabilidadOperacionalActivoTotal,
        fill: false,
        backgroundColor: [
          'rgba(37, 144, 17, 1)'
        ],
        borderColor: "#259011",
      }
      ]
    };

    this.chartData11 = {
      labels: this.labels,
      datasets: [
        {
          label: 'Endeudamiento total',
          data: this.arregloEndeudamientoTotal,
          fill: false,
          backgroundColor: 'rgba(255, 173, 173, 1)',
          borderColor: "#FFADAD",
        },
        {
        label: 'Endeudamiento financiero',
        data: this.arregloEndeudamientoFinanciero,
        fill: false,
        backgroundColor:'rgba(237, 94, 94, 1)',
        borderColor: "#ED5E5E",
      },
      
      ]
    };

    this.chartData12 = {
      labels: this.labels,
      datasets: [
        {
          label: 'ROA',
          data: this.arregloROA,
          fill: false,
          backgroundColor: 'rgba(177, 42, 188, 1)',
          borderColor: "#B12ABC",
        },
        {
          label: 'ROE',
          data: this.arregloROE,
          fill: false,
          backgroundColor:'rgba(234, 208, 79, 1)',
          borderColor: "#EAD04F",
        },

      ]
    };

    this.chart5 = new Chart(
      graficoObj5,
      {
        "type": 'bar',
        "data": this.chartData5,
        "options": {
          "legend": {
            "display": true
          },
          "scales": {
            "yAxes": [{
              "display": true,
              "ticks": {
              }
            }]
          }
        }
      }
    );
    this.chart6 = new Chart(
      graficoObj6,
      {
        "type": 'line',
        "data": this.chartData,
        "options": {
          "legend": {
            "display": true
          },
          "scales": {
            "yAxes": [{
              "display": true,
              "ticks": {
                  callback: function(value, index, values) {
                  return value.toLocaleString("en-US",{style:"currency", currency:"USD"});
                    }
                    }
                  }]
          }
        }
      }
    );
    this.chart7 = new Chart(
      graficoObj7,
      {
        "type": 'bar',
        "data": this.chartData7,
        "options": {
          "legend": {
            "display": true
          },
          "scales": {
            "yAxes": [{
              "display": true,
              "ticks": {
                "beginAtZero": true,
              }
            }]
          }
        }
      }
    );

    this.chart8 = new Chart(
      graficoObj8,
      {
        "type": 'bar',
        "data": this.chartData8,
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

    this.chart9 = new Chart(
      graficoObj9,
      {
        "type": 'line',
        "data": this.chartData9,
        "options": {
          "legend": {
            "display": true
          },
          "scales": {
            "yAxes": [{
              "display": true,
              "ticks": {
              }
            }]
          }
        }
      }
    );

    this.chart10 = new Chart(
      graficoObj10,
      {
        "type": 'line',
        "data": this.chartData10,
        "options": {
          "legend": {
            "display": true
          },
          "scales": {
            "yAxes": [{
              "display": true,
              "ticks": {
              }
            }]
          }
        }
      }
    );

    this.chart11 = new Chart(
      graficoObj11,
      {
        "type": 'bar',
        "data": this.chartData11,
        "options": {
          "legend": {
            "display": true
          },
          "scales": {
            "yAxes": [{
              "display": true,
              "ticks": {
              }
            }]
          }
        }
      }
    );

    this.chart12 = new Chart(
      graficoObj12,
      {
        "type": 'bar',
        "data": this.chartData12,
        "options": {
          "legend": {
            "display": true
          },
          "scales": {
            "yAxes": [{
              "display": true,
            }]
          }
        }
      }
    );
  }

  public myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  public actualizarGraficos(){
    this.chartData.labels=this.labels
    this.chartData.datasets[0].data=this.arregloCapitaldeTrabajo
    this.chartData5.labels=this.labels
    this.chartData5.datasets[0].data=this.arregloRazonCorriente
    this.chartData5.datasets[1].data=this.arregloPruebaAcida
    this.chartData7.labels=this.labels
    this.chartData7.datasets[0].data=this.arregloRotacionCarteraDias
    this.chartData7.datasets[1].data=this.arregloRotacionProveedoresDias
    this.chartData7.datasets[2].data=this.arregloRotacionInventariosDias
    this.chartData7.datasets[3].data=this.arregloCicloEfectivo
    this.chartData8.labels=this.labels
    this.chartData8.datasets[0].data=this.arregloRotacionActivosFijos
    this.chartData8.datasets[1].data=this.arregloRotacionActivosTotales
    this.chartData9.labels=this.labels
    this.chartData9.datasets[0].data=this.arregloMargenesUB
    this.chartData9.datasets[1].data=this.arregloMargenesEBITDA
    this.chartData9.datasets[2].data=this.arregloMargenesEBIT
    this.chartData9.datasets[3].data=this.arregloMargenesUN
    this.chartData10.labels=this.labels
    this.chartData10.datasets[0].data=this.arregloRentabilidadDelPatrimonio
    this.chartData10.datasets[1].data=this.arregloRentabilidadActivoTotal
    this.chartData10.datasets[2].data=this.arregloRentabilidadOperacionalPatrimonio
    this.chartData10.datasets[3].data=this.arregloRentabilidadOperacionalActivoTotal
    this.chartData11.labels=this.labels
    this.chartData11.datasets[0].data=this.arregloEndeudamientoTotal
    this.chartData11.datasets[1].data=this.arregloEndeudamientoFinanciero
    this.chartData12.labels=this.labels
    this.chartData12.datasets[0].data=this.arregloROA
    this.chartData12.datasets[1].data=this.arregloROE
    this.chart5.update()
    this.chart6.update()
    this.chart7.update()
    this.chart8.update()
    this.chart9.update()
    this.chart10.update()
    this.chart11.update()
    this.chart12.update()
  }

  public goToDatos(){
    this.router.navigate(['dashboard/lista-datos-eeff'])
  }
}
