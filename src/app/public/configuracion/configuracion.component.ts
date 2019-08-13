import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  seleccion=1
  editarPerfilForm: FormGroup
  constructor() { }

  ngOnInit() {
    this.editarPerfilForm=new FormGroup({
      'nombreNegocio': new FormControl(null),
      'categoriaNegocio': new FormControl(null),
      'subCategoriaNegocio': new FormControl(null),
      'telefono': new FormControl(null),
      'email': new FormControl(null),
      'pais': new FormControl(null),
      'contrasenaActual': new FormControl(null),
      'contrasenaNueva': new FormControl(null),
      'confirmarContrasena': new FormControl(null)
    })
  }

  verificacionPerfil(){

  }

}
