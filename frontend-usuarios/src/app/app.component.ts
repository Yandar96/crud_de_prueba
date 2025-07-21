import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,          // Para <router-outlet>
    MenubarModule,         // Para p-menubar
    HttpClientModule,
  ],
  template: `
    <p-menubar [model]="items"></p-menubar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  items: MenuItem[] = [
    { label: 'Usuarios', routerLink: '/usuarios' },
    { label: 'Cargos', routerLink: '/cargos' }
  ];
}
