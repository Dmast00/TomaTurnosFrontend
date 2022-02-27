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

@NgModule({
  declarations: [
    AppComponent,
    TramitesComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegistrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
