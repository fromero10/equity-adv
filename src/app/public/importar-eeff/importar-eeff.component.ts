import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MainService } from '../services/main.service';

type AOA = any[][];
@Component({
  selector: 'app-importar-eeff',
  templateUrl: './importar-eeff.component.html',
  styleUrls: ['./importar-eeff.component.scss']
})
export class ImportarEeffComponent implements OnInit {
  
  etapa=1
  data: any = [];
  objetos: any = [];
  fecha: Date;
  datinhos: any[];
  cols:any

  constructor(public router: Router, private mainService: MainService) { }

  ngOnInit() {
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
      this. cols=this.data[0].length
      for (let i = 1; i < this.cols; i++) {
      /* let x = {}; */
      this.fecha=this.excelToJs(this.data[0][i]);
      let formatted_date = this.fecha.getFullYear() + "-" + this.ponerCeros((this.fecha.getMonth())+1)+ "-" + this.ponerCeros(this.fecha.getDate())
      {{}}
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      let x = {
        fecha: formatted_date,
        cuentasPorCobrar: this.data[1][i],
        inventarios: this.data[2][i],
        totalActivoCorriente: this.data[3][i],
        totalActivoNoCorriente: this.data[4][i],
        totalActivo:this.data[5][i],
        obligacionesFinancieras:this.data[6][i],
        cuentasPorPagar:this.data[7][i],
        totalPasivoCorriente:this.data[8][i],
        totalPasivoNoCorriente:this.data[9][i],
        totalPasivo:this.data[10][i],
        totalPatrimonio:this.data[11][i],
        ventas:this.data[12][i],
        costoDeVentas:this.data[13][i],
        utilidadBruta:this.data[14][i],
        ebitda:this.data[15][i],
        ebit:this.data[16][i],
        ebt:this.data[17][i],
        utilidadNeta:this.data[18][i],
        gastosFinancieros:this.data[19][i],
        periodoDeLosEEFF:this.data[20][i],
        empresa: usuario.empresa,

        /* icono: this.data[i][3] */
      }
      if (x) {
        this.objetos.push(x);
      }
      

    }console.log(this.data.length,this.cols)
    console.log(this.objetos)

    };
    reader.readAsBinaryString(target.files[0]);
  }

  goToFlujoDeCaja(){
    this.router.navigate(['dashboard/indicadores'])
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

  post(){

    for(let i = 0; i < this.objetos.length; i++){

      this.mainService.post('api/periodo', this.objetos[i]).subscribe(res=>{console.log(res)})

    }
    
  }


}
