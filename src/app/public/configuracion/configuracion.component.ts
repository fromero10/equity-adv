import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';
import { Ng2SmartTableModule,LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  seleccion=1
  editarPerfilForm: FormGroup
  editarPerfilForm2: FormGroup
  empresa: any={}
  datinhos: any=[]
  usuario:any={}

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.usuario)
    this.mainService.get('api/empresa/'+ this.usuario.empresa).subscribe(result =>{
      this.empresa=result;
      this.inicarForm()
      this.inicarForm2()
      this.cargarUsuarios()
    })
    this.cargarUsuarios()
    this.inicarForm()
    this.inicarForm2()
    
    
    
  }

  public cargarUsuarios(){
    this.mainService.get('api/user/empresa/'+ this.usuario.empresa).subscribe(result =>{
      this.datinhos=result
    console.log(this.datinhos)})
  }

  public inicarForm(){
    this.editarPerfilForm=new FormGroup({
      'nombreNegocio': new FormControl(this.empresa.nombre,Validators.required),
      'categoriaNegocio': new FormControl(this.empresa.categoria,Validators.required),
      'subCategoriaNegocio': new FormControl(this.empresa.subcategoria,Validators.required),
      'telefono': new FormControl(this.empresa.contactoTelefono,Validators.required),
      'email': new FormControl(this.empresa.contactoEmail,[Validators.required,Validators.email]),
    })
  }

  public inicarForm2(){
    this.editarPerfilForm2=new FormGroup({
      'contrasenaActual': new FormControl(null),
      'contrasenaNueva': new FormControl(null),
      'confirmarContrasena': new FormControl(null)
    })
  }

  public onActualizar(event){
    let dato = event.data;
    this.mainService.put('api/user/empresa/'+ dato._id, dato).subscribe(res =>{
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
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: 'Guardar'
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    actions: {
      position: 'right',
      add: false,
      edit: true,
      delete: false,
      custom: []
    },
    columns: {
      nombre: {
        title: 'Nombre',
        editable: true,
      },
      apellido: {
        title: 'Apellido',
        editable: true,
      },
      email: {
        title: 'Correo',
        editable: true,
      },
      cargo: {
        title: 'Cargo',
        editable: true,
      },
      tipo: {
        title: 'Tipo',
        editable: false,
      },
      
    }
  };


  verificacionPerfil(){
    if( this.editarPerfilForm.invalid){
      return false;
    }
    else{
      let x={
        nombre:this.editarPerfilForm.get('nombreNegocio').value,
        categoria:this.editarPerfilForm.get('categoriaNegocio').value,
        subcategoria:this.editarPerfilForm.get('subCategoriaNegocio').value,
        contactoTelefono:this.editarPerfilForm.get('telefono').value,
        contactoEmail:this.editarPerfilForm.get('email').value
      }
      this.mainService.put('api/empresa/'+this.empresa._id, x).subscribe(res1 =>{
        console.log(res1);
        if(res1._id){
          Swal.fire(
            'Éxito',
            'Se ha actualizado la información de la empresa con éxito.',
            'success'
          )       
    }
  });
  }
  }

}
