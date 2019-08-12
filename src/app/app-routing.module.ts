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
import { AgregarEscenarioComponent } from './public/agregar-escenario/agregar-escenario.component'
import { IngresosEgresosComponent } from './public/ingresos-egresos/ingresos-egresos.component';
import { ImportarFlujoComponent } from './public/importar-flujo/importar-flujo.component';
import { AgregarIngresoComponent } from './public/agregar-ingreso/agregar-ingreso.component';
import { ImportarCosteoComponent } from './public/importar-costeo/importar-costeo.component';

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
    path: 'recuperar-contrasena',
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
        path: 'agregar-escenario',
        component: AgregarEscenarioComponent
      },
      {
        path: 'costeo',
        component: CosteoComponent
      },
      {
        path: 'indicadores',
        component: IndicadoresComponent
      },
      {
        path: 'ingresos-egresos',
        component: IngresosEgresosComponent
      },
      {
        path: 'importar-flujo',
        component: ImportarFlujoComponent
      },
      {
        path:'agregar-ingreso-egreso',
        component: AgregarIngresoComponent
      },
      {
        path:'importar-costeo',
        component: ImportarCosteoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
