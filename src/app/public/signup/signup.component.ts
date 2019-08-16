import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { Categoria } from './signup.categoria';
import { subCategoria } from './singup.subcategoria';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup
  etapa1=false
  etapa2=false
  etapa3=false
  categoriaSeleccionada: Categoria = new Categoria(1,'Categoria1')
  categorias: Categoria[]
  subCategorias: subCategoria[]

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'contrasena1' : new FormControl(null,Validators.required),
      'contrasena2' : new FormControl(null,Validators.required),
      'pais': new FormControl("Colombia"),
      'nombreNegocio' : new FormControl(null,Validators.required),
      'nit' : new FormControl(null,Validators.required),
      'categoriaNegocio' : new FormControl(null,Validators.required),
      'subCategoriaNegocio' : new FormControl(null,Validators.required),
      'email2': new FormControl(null,[Validators.required,Validators.email]),
      'logoNegocio': new FormControl(null)
    });
    this.categorias = this.getCategorias()

    if(this.router.url==='/recuperar-contrasena'){
      this.etapa1=true
      this.etapa2=true
    }
  }

  onSelect(catId: number) {
    this.subCategorias = this.getSubCategorias().filter((item) => item.catId == catId);
  }
  getCategorias() {
    return [
     new Categoria(1, 'Categoria1' ),
     new Categoria(2, 'Categoria2' ),
     new Categoria(3, 'Categoria3')
    ];
  }
  
  getSubCategorias() {
   return [
     new subCategoria(1, 1, 'SubCategoria1' ),
     new subCategoria(2, 1, 'SubCategoria2' ),
     new subCategoria(3, 1, 'SubCategoria3'),
     new subCategoria(4, 1, 'SubCategoria4'),
     new subCategoria(5, 2, 'SubCategoria5' ),
     new subCategoria(6, 2, 'SubCategoria6'),
     new subCategoria(7, 2, 'SubCategoria7' )
    ];
  }

  verificacion(){
    if (!this.etapa1){ 
      if (this.signupForm.get('email').invalid || this.signupForm.get('contrasena1').invalid || this.signupForm.get('contrasena2').invalid){
          console.log("Error",this.router.url)
          return false
        } 
      else{
        console.log("etapa1Success")
        this.etapa1=true
        return null
      }
    }
    else if(!this.etapa2){
      if(this.signupForm.get('nombreNegocio').invalid || this.signupForm.get('nit').invalid || this.signupForm.get('categoriaNegocio').invalid || this.signupForm.get('subCategoriaNegocio').invalid)
      {
        console.log("Error2")
        return false
      }
      else{
      console.log("Etapa2Success")
      this.etapa2=true
      this.router.navigate(['login'])
     }
    }
    else if(!this.etapa3){
      console.log("Etapa3Success")
      this.etapa3=true
    }
    else{
      this.router.navigate(['login'])
    }
  }
}
