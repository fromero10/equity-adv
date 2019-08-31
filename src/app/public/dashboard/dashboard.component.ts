import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/module/menus/menu.module';
import { NbMenuService } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';
import {Router} from '@angular/router';
import { MainService } from '../services/main.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  logueado = false;
/*   public usuarioActivo = { nombre: 'Subway', foto: '/assets/img/subway.png'}; */
  empresa:any={}
  items = null;
  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    public router: Router,
    private mainService: MainService,
    private authService: AuthService
  ) {
    this.items = Menu;

  }

  ngOnInit() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(usuario)
    this.mainService.get('api/empresa/'+ usuario.empresa).subscribe(result =>{
      this.empresa=result;
/*     this.usuarioActivo.nombre=this.empresa.nombre
    this.usuarioActivo.foto=this.empresa.imagen */
/*     console.log(this.usuarioActivo.nombre) */
    })
  }

  toggle() {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  inicio() {
    this.router.navigate(['dashboard/home']);
  }

  salir() {
    this.authService.logout()
    this.router.navigate(['login']);
  }

  goToConfiguracion(){
    this.router.navigate(['dashboard/configuracion'])
  }

}
