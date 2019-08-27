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
import { IngresosEgresosComponent } from './public/ingresos-egresos/ingresos-egresos.component';
import { ImportarFlujoComponent } from './public/importar-flujo/importar-flujo.component';
import { AgregarIngresoComponent } from './public/agregar-ingreso/agregar-ingreso.component';
import { ImportarCosteoComponent } from './public/importar-costeo/importar-costeo.component';
import { ConfiguracionComponent } from './public/configuracion/configuracion.component';
import { ListaDatosComponent } from './public/lista-datos/lista-datos.component';
import { ImportarEeffComponent } from './public/importar-eeff/importar-eeff.component';
import { ListaDatosEeffComponent } from './public/lista-datos-eeff/lista-datos-eeff.component';

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
      {
        path:'configuracion',
        component: ConfiguracionComponent
      },
      {
        path:'lista-datos',
        component: ListaDatosComponent
      },
      {
        path: 'importar-eeff',
        component: ImportarEeffComponent
      },
      {
        path:'lista-datos-eeff',
        component: ListaDatosEeffComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
