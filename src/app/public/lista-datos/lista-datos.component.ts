import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

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
      deleteButtonContent: 'Eliminar',
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: true,
      custom: []
    },
    columns: {
      _id: {
        title: 'Id',
        editable: false,
      },
      empresa: {
        title: 'Empresa',
        editable: false,
      },
      ingreso: {
        title: 'Ingreso',
        editable: false,
      },
      categoria:{
        title: 'Categoría',
        editable: false,
      },
      createdAt: {
        title: 'Fecha de creación',
        editable: false,
      },
      
    }
  };

}
