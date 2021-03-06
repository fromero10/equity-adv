import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DpDatePickerModule} from 'ng2-date-picker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbSidebarModule,
  NbSidebarService,
  NbMenuModule,
  NbMenuService,
  NbActionsModule,
  NbInputModule,
  NbButtonModule,
  NbCalendarModule,
  NbDatepickerModule,
  NbPopoverModule,
  NbToastrModule,
  NbDialogModule,
  NbSpinnerModule,
  NbUserModule,
  NbSelectModule,
  NbTabsetModule,
  NbCalendarRangeModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileUploadModule } from 'ng2-file-upload';
import { ChartModule } from 'angular2-chartjs';
import {NbMomentDateModule} from '@nebular/moment';
import {NbDateFnsDateModule} from '@nebular/date-fns';
import { HttpClientModule } from '@angular/common/http';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { HomeComponent } from './public/home/home.component';
import { TransaccionesComponent } from './public/transacciones/transacciones.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { LoginComponent } from './public/login/login.component';
import { UsuariosComponent } from './public/usuarios/usuarios.component';
import { SignupComponent } from './public/signup/signup.component';
import { FlujoDeCajaComponent } from './public/flujo-de-caja/flujo-de-caja.component';
import { CosteoComponent } from './public/costeo/costeo.component';
import { IndicadoresComponent } from './public/indicadores/indicadores.component';
import { IngresosEgresosComponent } from './public/ingresos-egresos/ingresos-egresos.component';
import { ImportarFlujoComponent } from './public/importar-flujo/importar-flujo.component';
import { AgregarIngresoComponent } from './public/agregar-ingreso/agregar-ingreso.component';
import { ImportarCosteoComponent } from './public/importar-costeo/importar-costeo.component';
import { ConfiguracionComponent } from './public/configuracion/configuracion.component';
import { MainService } from './public/services/main.service';
import { AuthService } from './public/services/auth.service';
import { ListaDatosComponent } from './public/lista-datos/lista-datos.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ImportarEeffComponent } from './public/importar-eeff/importar-eeff.component';
import { ListaDatosEeffComponent } from './public/lista-datos-eeff/lista-datos-eeff.component';
import { AuthGuard } from './public/guards/auth.guard';
import { LoggedInGuard } from './public/guards/logged-in.guard';
import { ClickOutsideModule } from 'ng-click-outside';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransaccionesComponent,
    DashboardComponent,
    LoginComponent,
    UsuariosComponent,
    SignupComponent,
    FlujoDeCajaComponent,
    CosteoComponent,
    IndicadoresComponent,
    IngresosEgresosComponent,
    ImportarFlujoComponent,
    AgregarIngresoComponent,
    ImportarCosteoComponent,
    ConfiguracionComponent,
    ListaDatosComponent,
    ImportarEeffComponent,
    ListaDatosEeffComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule,
    NbActionsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbTabsetModule,
    NbCalendarModule,
    Ng2SmartTableModule,
    NbDatepickerModule.forRoot(),
    NbMenuModule.forRoot(),
    ReactiveFormsModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forChild(),
    NbSpinnerModule,
    NbCalendarRangeModule,
    NbUserModule,
    ChartModule,
    NbMomentDateModule,
    NbDateFnsDateModule.forRoot({ format: 'dd.MM.yyyy' }),
    NbDateFnsDateModule.forChild({ format: 'dd.MM.yyyy' }),
    NbDatepickerModule.forRoot(),
    HttpModule,
    HttpClientModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    DpDatePickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    MultiSelectModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    ClickOutsideModule
  ],
  providers: [NbSidebarService, NbMenuService,FormsModule, MainService, AuthService, AuthGuard, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
