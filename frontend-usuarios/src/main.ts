import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { UsuarioComponent } from './app/components/usuario/usuario.component';
import { CargoComponent } from './app/components/cargo/cargo.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideRouter([
      { path: 'usuarios', component: UsuarioComponent },
      { path: 'cargos', component: CargoComponent },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ])
  ]
}).catch((err) => console.error(err));
