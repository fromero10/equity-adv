import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-lista-datos',
  templateUrl: './lista-datos.component.html',
  styleUrls: ['./lista-datos.component.scss']
})
export class ListaDatosComponent implements OnInit {

  constructor(private mainService: MainService) { }

datinhos=[]

  ngOnInit() {
    this.cargueBase();
  }

  public cargueBase(){
    this.mainService.get('api/flujo_de_caja/empresa/5d5575040cc34a3ee86deb2c').subscribe(result =>{
      this.datinhos=result})
  }

  public onEliminar(event){
    let dato = event.data;
    this.mainService.delete('api/flujo_de_caja/'+ dato._id).subscribe(res =>{
      console.log(res);
      event.confirm.resolve()

    
    
    }) 
  }

  settings = {
    add: {
      confirmCreate: true,
      createButtonContent: 'Guardar',
      cancelButtonContent: 'Cancelar',
      addButtonContent: 'Agregar'
    },
    edit: {
      confirmSave: true,
      editButtonContent: 'Editar',
      saveButtonContent: 'Guardar'
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: true,
      custom: []
    },
    columns: {
      descripcion: {
        title: 'Descripcion',
        editable: false,
      },
      ingreso: {
        title: 'Ingreso',
        editable: false,
        valuePrepareFunction: (value) => { return Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)}
      },
      egreso: {
        title: 'Egreso',
        editable: false,
        valuePrepareFunction: (value) => { return Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)}
      },
      fechaMovimiento: {
        title: 'Fecha',
        editable: false,
      },
      categoria:{
        title: 'Categoría',
        editable: false,
      },
      tipo: {
        title: 'Tipo',
        editable: false,
      },
      
    }
  };

}
