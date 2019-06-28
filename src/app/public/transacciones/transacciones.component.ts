import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';

import {ActivatedRoute, Router, Params} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit {

  settings = {
    hideSubHeader: true,
    actions: {
      delete: false,
      edit: false,
      add: false,
      filter: false,
      custom: [
        {name: 'edit', title: '<i class="nb-compose"></i> ',},
        {name: 'delete', title: '<i class="nb-trash"></i> ',},
        {name: 'detalle', title: '<i class="nb-search"></i>'}
      ],
    },
    columns: {
      cmp1: {title: 'Dato 1'},
      cmp2: {title: 'Dato 2'},
      cmp3: {title: 'Dato 3'},
      cmp4: {title: 'Dato 4'},
      cmp5: {title: 'Dato 5'},
    }
  };

  datos: any[];

  public source: LocalDataSource;
  constructor(private toastrService: NbToastrService,
              public router: Router,
              private dialogService: NbDialogService,
              private rutaActiva: ActivatedRoute) {
    let arreglo = [];
    for (let i = 1; i <= 5; i++){
      let aux = { cmp1: 'Valor '+i+'1', cmp2: 'Valor '+i+'2', cmp3: 'Valor '+i+'3', cmp4: 'Valor '+i+'4', cmp5: 'Valor '+i+'5'};
      arreglo.push(aux);
    }
    this.datos = arreglo;
    this.source = new LocalDataSource(this.datos);
  }

  ngOnInit() {
  }

}
