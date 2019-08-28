import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { Categoria } from './signup.categoria';
import { subCategoria } from './singup.subcategoria';
import { LoginComponent } from '../login/login.component';
import {  AuthService } from '../services/auth.service';
import { TheadFormRowComponent } from 'ng2-smart-table/lib/components/thead/rows/thead-form-row.component';
import { MainService } from '../services/main.service';
import { CloudinaryUploader, CloudinaryOptions } from 'ng2-cloudinary';

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
  obj={}
  user: any ={};
  empresa:any={}
  categoriaSeleccionada: Categoria = new Categoria(1,'Categoria1')
  categorias: Categoria[]
  subCategorias: subCategoria[]
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'hojrkhbaq', uploadPreset: 'aizkqx2x' })
  );

  constructor(
    public router: Router, 
    private authService: AuthService,
    private mainService: MainService
    ) {
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        let res: any = JSON.parse(response);
        console.log(res.url);
        this.empresa.imagen = res.url;
        return { item, response, status, headers };
      };
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'nombreEmpresa' : new FormControl(null,Validators.required),
      'contactoNombre' : new FormControl(null,Validators.required),
      'contactoTelefono' : new FormControl(null,Validators.required),
      'contactoEmail': new FormControl(null,[Validators.required,Validators.email]),
      'contactoCargo' : new FormControl(null,Validators.required),
      'descripcion' : new FormControl(null,Validators.required),
      'categoriaNegocio' : new FormControl(null,Validators.required),
      'subCategoriaNegocio' : new FormControl(null,Validators.required),
      'nombreUsuario' : new FormControl(null,Validators.required),
      'apellido' : new FormControl(null,Validators.required),
      'telefono' : new FormControl(null,Validators.required),
      'emailUsuario': new FormControl(null,[Validators.required,Validators.email]),
      'contrasena1' : new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'contrasena2' : new FormControl(null,[Validators.required, Validators.minLength(6)]),
      'cargo': new FormControl(null,Validators.required),
      'empresa' : new FormControl(null,Validators.required),
      'tipo' : new FormControl(null,Validators.required),
      'email2': new FormControl(null,[Validators.required,Validators.email]),
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

  public upload() {
    this.uploader.uploadAll();
  }

  verificacion(){
    if (!this.etapa1){ 
      if (this.signupForm.get('nombreEmpresa').invalid || this.signupForm.get('contactoNombre').invalid || this.signupForm.get('contactoTelefono').invalid || this.signupForm.get('contactoEmail').invalid || this.signupForm.get('contactoCargo').invalid || this.signupForm.get('descripcion').invalid|| this.signupForm.get('categoriaNegocio').invalid|| this.signupForm.get('subCategoriaNegocio').invalid){
          console.log("Error",this.router.url)
          return false
        } 
      else{
        console.log("etapa1Success")
        this.etapa1=true
        this.upload()
        return null
      }
    }
    else if(!this.etapa2){
      if(this.signupForm.get('nombreUsuario').invalid || this.signupForm. get('apellido').invalid || this.signupForm.get('telefono').invalid || this.signupForm.get('emailUsuario').invalid || this.signupForm.get('contrasena1').invalid|| this.signupForm.get('contrasena2').invalid|| this.signupForm.get('cargo').invalid|| this.signupForm.get('tipo').invalid && (this.signupForm.get('contrasena1').value===this.signupForm.get('contrasena2').value))
      {
        console.log("Error2")
        return false
      }
      else{
      console.log("Etapa2Success")
      this.etapa2=true
      this.router.navigate(['login'])
      this.empresa={
        nombre: this.signupForm.get('nombreEmpresa').value,
        contactoNombre: this.signupForm.get('contactoNombre').value,
        contactoTelefono: this.signupForm.get('contactoTelefono').value,
        contactoEmail: this.signupForm.get('contactoEmail').value,
        contactoCargo: this.signupForm.get('contactoCargo').value,
        descripcion: this.signupForm.get('descripcion').value,
        categoria: this.signupForm.get('categoriaNegocio').value,
        subcategoria: this.signupForm.get('subCategoriaNegocio').value,
        imagen: this.empresa.imagen,
      }
      this.user={
        nombre: this.signupForm.get('nombreUsuario').value,
        apellido: this.signupForm.get('apellido').value,
        telefono: this.signupForm.get('telefono').value,
        email: this.signupForm.get('emailUsuario').value,
        password: this.signupForm.get('contrasena1').value,
        cargo: this.signupForm.get('cargo').value,
        tipo: this.signupForm.get('tipo').value,
      }

      this.mainService.post('api/empresa', this.empresa).subscribe(res1 =>{
        console.log(res1);
        if(res1._id){
          this.user.empresa = res1._id;
          this.authService.registerUser(this.user)
          .subscribe(result => {
            console.log(result)
          
          })
        }

      });
      }
    
    
    }
      
                
    else if(!this.etapa3){
      console.log("Etapa3Success")
      this.etapa3=true
    }
    else{
      this.router.navigate(['login'])
    }
  
}}
