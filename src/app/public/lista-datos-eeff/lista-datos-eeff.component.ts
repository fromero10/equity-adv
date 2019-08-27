import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-lista-datos-eeff',
  templateUrl: './lista-datos-eeff.component.html',
  styleUrls: ['./lista-datos-eeff.component.scss']
})
export class ListaDatosEeffComponent implements OnInit {
usuario: any={}
  constructor(private mainService: MainService) { }

datinhos=[]
ngOnInit() {
  this.cargueBase();
  
}

public cargueBase(){
  this.usuario = JSON.parse(localStorage.getItem('usuario'));
  this.mainService.get('api/periodo/empresa/'+ this.usuario.empresa).subscribe(result =>{
    this.datinhos=result})
}

public onEliminar(event){
  let dato = event.data;
  this.mainService.delete('api/periodo/'+ dato._id).subscribe(res =>{
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
    fecha: {
      title: 'Fecha',
      editable: false,
    },
    totalActivo: {
      title: 'Total activo',
      editable: false,
      valuePrepareFunction: (value) => { return Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)}
    },
    totalPasivo: {
      title: 'Total pasivo',
      editable: false,
      valuePrepareFunction: (value) => { return Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)}
    },
    totalPatrimonio: {
      title: 'Total patrimonio',
      editable: false,
      valuePrepareFunction: (value) => { return Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)}
    },
    utilidadNeta:{
      title: 'Utilidad neta',
      editable: false,
      valuePrepareFunction: (value) => { return Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(value)}
    },
    periodoDeLosEEFF: {
      title: 'Periodo de los EEFF en meses',
      editable: false,
    },
    
  }
};

}

