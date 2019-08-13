import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

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
  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToFlujoDeCaja(){
    this.router.navigate(['dashboard/flujo-de-caja'])
  }
  avanzarEtapa(){
    if(this.etapa<3){
      this.etapa++
    }
    else{
      this.goToFlujoDeCaja()
    }
  }

  retrocederEtapa(){
    if(this.etapa>1){
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
    };
    reader.readAsBinaryString(target.files[0]);
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

  public verInfo(){
    this.objetos = [];
    console.log(this.data);
    for (let i = 1; i < this.data.length; i++) {
      /* let x = {}; */
      let x = {
        pais: this.data[i][0],
        ciudad: this.data[i][1],
        especialidad: i,
        /* icono: this.data[i][3] */
      }
      if (x) {
        this.objetos.push(x);
      }

    }

    /* console.log(this.objetos); */


    console.log(this.objetos);
  }

}
