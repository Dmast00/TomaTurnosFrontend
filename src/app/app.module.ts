import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TramitesComponent } from './Componentes/TramitesComponente/tramites/tramites.component';
import { HomeComponent } from './Componentes/HomeComponente/home/home.component';
import { NavbarComponent } from './Componentes/NavbarComponente/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './Componentes/Login/login/login.component';
import { RegistrarComponent } from './Componentes/Registrar/registrar/registrar.component';
import { TurnosComponent } from './Componentes/Turnos/turnos/turnos.component';
import { CajerosComponent } from './Componentes/Cajeros/cajeros/cajeros.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";


import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthGuard } from "./Guards/auth.guard";
import { UsuarioComponent } from './Componentes/Usuario/usuario/usuario.component';
import { AccountInfoComponent } from './Componentes/Usuario/account-info/account-info.component';
import { UsuariosComponent } from './Componentes/Catalogos/Usuarios/usuarios/usuarios.component';
import { CatTramitesComponent } from './Componentes/Catalogos/Tramites/cat-tramites/cat-tramites.component';







@NgModule({
  declarations: [
    AppComponent,
    TramitesComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegistrarComponent,
    TurnosComponent,
    CajerosComponent,
    UsuarioComponent,
    AccountInfoComponent,
    UsuariosComponent,
    CatTramitesComponent,


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
