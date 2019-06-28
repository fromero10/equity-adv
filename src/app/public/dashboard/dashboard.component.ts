import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/module/menus/menu.module';
import { NbMenuService } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  logueado = false;
  public usuarioActivo = { nombre: 'Administrador', foto: '/assets/img/usuario_plataforma.png'};
  items = null;
  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    public router: Router
  ) {
    this.items = Menu;

  }

  ngOnInit() {
  }

  toggle() {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  inicio() {
    this.router.navigate(['dashboard/home']);
  }

  salir() {
    this.router.navigate(['login']);
  }

}
