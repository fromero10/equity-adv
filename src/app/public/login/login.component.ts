import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any;
  frmLogin: FormGroup;
  submitted = false;
  constructor(public fb: FormBuilder , private toastrService: NbToastrService, public router: Router) {
    this.frmLogin = this.fb.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.frmLogin.controls; }


  ngOnInit() {
  }

  verificacion() {
    this.submitted = true;
    if (this.frmLogin.invalid) {
      return false;
    }
    const login = this.frmLogin.value;
    console.log("Llega:", login);
    this.onLoginRedirect();
  }

  showToast(position, status, titulo, mensaje) {
    this.toastrService.show(
      mensaje,
      titulo,
      { position, status });
  }

  onLoginRedirect(): void {
    this.router.navigate(['dashboard/home']);
  }

}
