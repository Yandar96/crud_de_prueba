import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CargoComponent } from './components/cargo/cargo.component';

export const routes: Routes = [
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'cargos', component: CargoComponent },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' } // Redirección por defecto
];
