import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbMenuItem} from '@nebular/theme';

export const Menu: NbMenuItem[] = [
  {
    title: 'Flujo de caja',
    icon: 'nb-angle-double-left',
    home: true,
    link: 'flujo-de-caja'
  },
  {
    title: 'Costeo',
    icon: 'nb-keypad',
    link: 'costeo'
  },
  {
    title: 'Indicadores',
    icon: 'nb-bar-chart',
    link: 'indicadores'
  },
  {
    title: 'Usuarios',
    icon: 'nb-person',
    link: 'usuarios'
  },
  /* {
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
  }, */
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MenuModule {
}
