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
import { TurnosComponent } from './Componentes/Turnos/turnos.component';
import { CajerosComponent } from './Componentes/Cajeros/cajeros.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthGuard } from "./Guards/auth.guard";
import { AccountInfoComponent } from './Componentes/Usuario/account-info/account-info.component';
import { UsuariosComponent } from './Componentes/Catalogos/Usuarios/usuarios/usuarios.component';
import { CatTramitesComponent } from './Componentes/Catalogos/Tramites/cat-tramites/cat-tramites.component';
import { CrearModalComponent } from './Componentes/Catalogos/Tramites/crear-modal/crear-modal.component';
import { EditarModalComponent } from './Componentes/Catalogos/Tramites/editar-modal/editar-modal.component';
import { EliminarModalComponent } from './Componentes/Catalogos/Tramites/eliminar-modal/eliminar-modal.component';
import { EliminarUModalComponent } from './Componentes/Catalogos/Usuarios/eliminar-u-modal/eliminar-u-modal.component';
import { AddRoleUModalComponent } from './Componentes/Catalogos/Usuarios/add-role-u-modal/add-role-u-modal.component';
import { RestablecerComponent } from './Componentes/Catalogos/Usuarios/restablecer/restablecer.component';
import { PerfilComponent } from './Componentes/Usuario/perfil/perfil.component';
import { ChangeEmailComponent } from './Componentes/Usuario/change-email/change-email.component';
import { ConfirmEmailComponent } from './Componentes/Usuario/confirm-email/confirm-email.component';
import { ChangePasswordComponent } from './Componentes/Usuario/change-password/change-password.component';
import {MatSelectModule} from '@angular/material/select';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";










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
    AccountInfoComponent,
    UsuariosComponent,
    CatTramitesComponent,
    CrearModalComponent,
    EditarModalComponent,
    EliminarModalComponent,
    EliminarUModalComponent,
    AddRoleUModalComponent,
    RestablecerComponent,
    PerfilComponent,
    ChangeEmailComponent,
    ConfirmEmailComponent,
    ChangePasswordComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
   
  ],
  providers: [
    AuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
