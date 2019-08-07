import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './public/login/login.component';
import {DashboardComponent} from './public/dashboard/dashboard.component';
import {HomeComponent} from './public/home/home.component';
import {UsuariosComponent} from './public/usuarios/usuarios.component';
import {TransaccionesComponent} from './public/transacciones/transacciones.component';
import { FlujoDeCajaComponent } from './public/flujo-de-caja/flujo-de-caja.component';
import { CosteoComponent } from './public/costeo/costeo.component';
import { IndicadoresComponent } from './public/indicadores/indicadores.component';
import { SignupComponent } from './public/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'transacciones',
        component: TransaccionesComponent
      },
      {
        path: 'flujo-de-caja',
        component: FlujoDeCajaComponent
      },
      {
        path: 'costeo',
        component: CosteoComponent
      },
      {
        path: 'indicadores',
        component: IndicadoresComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
