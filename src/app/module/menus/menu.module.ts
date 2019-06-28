import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbMenuItem} from '@nebular/theme';

export const Menu: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    home: true,
    link: 'home'
  },
  {
    title: 'Usuarios',
    icon: 'nb-person',
    link: 'usuarios'
  },
  {
    title: 'Configuraciones',
    expanded: true,
    icon: 'nb-gear',
    children: [
      {
        title: 'Transacciones',
        icon: 'nb-bar-chart',
        link: 'transacciones'
      }
    ],
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MenuModule {
}
