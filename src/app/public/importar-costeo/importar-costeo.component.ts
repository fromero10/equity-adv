import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators, Form} from '@angular/forms';
import * as XLSX from 'xlsx';
import { MainService } from '../services/main.service';

type AOA = any[][];
@Component({
  selector: 'app-importar-costeo',
  templateUrl: './importar-costeo.component.html',
  styleUrls: ['./importar-costeo.component.scss']
  
})
export class ImportarCosteoComponent implements OnInit {

  constructor(public router:Router, public mainService: MainService) { }

  formHorizontal: FormGroup
  formVertical: FormGroup
  etapa=1
  data: any = [];
  objetos: any = [];
  fecha: Date;
  datinhos: any[];
  cols:any

  ngOnInit() {

    this.formHorizontal = new FormGroup({
      'region': new FormControl(null),
      'producto' : new FormControl(null),
      'mes' : new FormControl(null),
      'presupuesto' : new FormControl(null),
      'filtro1' : new FormControl(null),
      'filtro2' : new FormControl(null),
      'filtro3' : new FormControl(null),
    });

    this.formVertical = new FormGroup({
      'utilidadBruta': new FormControl(null),
      'ingresos' : new FormControl(null),
      'gastos' : new FormControl(null),
      'presupuesto' : new FormControl(null),
      'filtro4' : new FormControl(null),
      'filtro5' : new FormControl(null),
      'filtro6' : new FormControl(null),
    });
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
      this.cols=this.data[0].length
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      for (let i = 1; i < this.cols; i++) {
        for (let j = 3; j < this.data.length; j++){
            let x = {
              key: this.data[j][0],
              value: this.data[j][i],
              ano: this.data[2][i],
              mes: this.data[1][i],
              factura:this.data[0][i],
              empresa:usuario.empresa,
              /* icono: this.data[i][3] */
            }
            if (x) {
              this.objetos.push(x);
            }

        }
      /* let x = {}; */
    }console.log(this.data.length,this.cols)
    console.log(this.objetos)

    };
    reader.readAsBinaryString(target.files[0]);
  }


  goToCosteo(){
    this.router.navigate(['dashboard/costeo'])
  }
  avanzarEtapa(){
    if(this.etapa<5){
      if(this.etapa===1){
        this.post()
      }
      this.etapa++
    }
    else{
      this.goToCosteo()
    }
  }

  retrocederEtapa(){
    if(this.etapa>1){
      this.etapa--
    }
    else{
      this.goToCosteo()
    }
  }

  post(){

    for(let i = 0; i < this.objetos.length; i++){

      this.mainService.post('api/costeo', this.objetos[i]).subscribe(res=>{console.log(res)})

    }
    
  }
  verificacion(){

  }
}
