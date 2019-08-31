import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { MainService } from '../services/main.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any;
  public registro: boolean;
  frmLogin: FormGroup;
  submitted = false;
  constructor(public fb: FormBuilder , private toastrService: NbToastrService, public router: Router, private authService: AuthService, private mainService: MainService) {
    this.frmLogin = this.fb.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.frmLogin.controls; }


  ngOnInit() {
  }

  verificacion() {
    let obj=this
    this.submitted = true;
    if (this.frmLogin.invalid) {
      return false;
    }
    else{
      this.user={
        email: this.frmLogin.get("usuario").value,
        password: this.frmLogin.get("clave").value,
      }
      this.authService.authenticateUser(this.user).subscribe(data=>{
        if(data.success){
          let tipo =data.user.email;
            let empresa = data.user.empresa
            console.log(data);
            obj.mainService.get('api/empresa/'+ empresa).subscribe(resu =>{
                obj.authService.storeUserData(data.token, data.user);
                obj.router.navigate(['dashboard/flujo-de-caja']);
            })
          Swal.fire(
            'Éxito',
            'Se ha iniciado sesión con éxito.',
            'success'
          )       

        } else {
          Swal.fire('Error',
            'No se ha podido iniciar sesión. Por favor intente de nuevo',
            'warning')
        }
        })  
        }
  }

  showToast(position, status, titulo, mensaje) {
    this.toastrService.show(
      mensaje,
      titulo,
      { position, status });
  }

  goToRegister(){
    this.router.navigate(['signup'])
  }

  goToRecover(){
    this.router.navigate(['recuperar-contrasena'])
    this.registro=true
  }

}
