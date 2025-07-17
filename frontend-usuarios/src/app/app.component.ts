
import { Component } from '@angular/core';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule, // <- IMPORTANTE
    UsuarioComponent
  ],
  template: `<app-usuario />`
})
export class AppComponent {}
