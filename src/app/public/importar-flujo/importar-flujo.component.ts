import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MainService } from '../services/main.service';


type AOA = any[][];
@Component({
  selector: 'app-importar-flujo',
  templateUrl: './importar-flujo.component.html',
  styleUrls: ['./importar-flujo.component.scss']
})
export class ImportarFlujoComponent implements OnInit {

  etapa=1
  data: any = [];
  objetos: any = [];
  fecha: Date;
  datinhos: any[];
  constructor(public router: Router, private mainService: MainService) { }

  ngOnInit() {
    
  }

  goToFlujoDeCaja(){
    this.router.navigate(['dashboard/flujo-de-caja'])
  }
  avanzarEtapa(){

      if(this.etapa===1){
        this.post()
        this.etapa++
      }
      else{
      this.goToFlujoDeCaja()
    }
  }

  retrocederEtapa(){
    if(this.etapa===2){
      this.etapa--
    }
    else{
      this.goToFlujoDeCaja()
    }
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
      this.objetos = [];
      for (let i = 1; i < this.data.length; i++) {
      /* let x = {}; */
      this.fecha=this.excelToJs(this.data[i][6]);
      let formatted_date = this.fecha.getFullYear() + "-" + this.ponerCeros((this.fecha.getMonth())+1)+ "-" + this.ponerCeros(this.fecha.getDate())
      {{}}
      let x = {
        empresa: "5d5575040cc34a3ee86deb2c",
        consecutivo: this.data[i][0],
        descripcion: this.data[i][1],
        ingreso: this.data[i][2],
        egreso: this.data[i][3],
        saldoBanco:this.data[i][4],
        saldoEfectivo:this.data[i][5],
        fechaMovimiento:formatted_date,
        metodoPago:this.data[i][7],
        categoria: this.data[i][8],
        tipo: this.data[i][9],

        /* icono: this.data[i][3] */
      }
      if (x) {
        this.objetos.push(x);
      }
      

    }
    console.log(this.objetos)
    };
    reader.readAsBinaryString(target.files[0]);
  }

  public ponerCeros(n){
    if(n<10){
      return "0"+n
    }
    return n
  }

  export(): void {

    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.objetos);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'File.xlsx');
  }

  public excelToJs(excelDate) {
    if(excelDate) {
      return new Date((excelDate - (25567 + 1))*86400*1000);
    }
  }
  
  public verInfo(){
    this.objetos = [];
    console.log(this.data);
    for (let i = 1; i < this.data.length; i++) {
      /* let x = {}; */
      let x = {
        empresa: "5d5575040cc34a3ee86deb2c",
        descripcion: this.data[i][0],
        ingreso: this.data[i][1],
        egreso: this.data[i][2],
        saldoBanco:this.data[i][3],
        saldoEfectivo:this.data[i][4],
        fechaMovimiento:this.data[i][5],
        metodoPago:this.data[i][6],
        /* icono: this.data[i][3] */
      }
      if (x) {
        this.objetos.push(x);
      }

    }
    console.log(this.objetos);
  }

  post(){

    for(let i = 0; i < this.objetos.length; i++){

      this.mainService.post('api/flujo_de_caja', this.objetos[i]).subscribe(res=>{console.log(res)})

    }
    
  }
}
