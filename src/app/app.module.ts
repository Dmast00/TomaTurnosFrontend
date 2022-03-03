import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { TramitesComponent } from './Componentes/TramitesComponente/tramites/tramites.component';
import { HomeComponent } from './Componentes/HomeComponente/home/home.component';
import { NavbarComponent } from './Componentes/NavbarComponente/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './Componentes/Login/login/login.component';
import { RegistrarComponent } from './Componentes/Registrar/registrar/registrar.component';
import { TurnosComponent } from './Componentes/Turnos/turnos/turnos.component';
import { CajerosComponent } from './Componentes/Cajeros/cajeros/cajeros.component';
import { ImprimirComponent } from './Componentes/Imprimir/imprimir/imprimir.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { NavbarLoggedinComponent } from './Componentes/NavbarComponente/navbar-loggedin/navbar-loggedin.component';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


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
    ImprimirComponent,
    NavbarLoggedinComponent,
    
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
