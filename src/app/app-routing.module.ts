import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./Componentes/HomeComponente/home/home.component";
import { TramitesComponent } from "./Componentes/TramitesComponente/tramites/tramites.component";
import { LoginComponent } from "./Componentes/Login/login/login.component";
import { RegistrarComponent } from "./Componentes/Registrar/registrar/registrar.component";
import { TurnosComponent } from "./Componentes/Turnos/turnos/turnos.component";
import { CajerosComponent } from "./Componentes/Cajeros/cajeros/cajeros.component";
import { AuthGuard } from './Guards/auth.guard';
import { AccountInfoComponent } from "./Componentes/Usuario/account-info/account-info.component";
import { CatTramitesComponent } from "./Componentes/Catalogos/Tramites/cat-tramites/cat-tramites.component";
import { RoleGuard } from './Guards/role.guard';
import { UsuariosComponent } from "./Componentes/Catalogos/Usuarios/usuarios/usuarios.component";


const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'Tramites', component:TramitesComponent,canActivate:[AuthGuard]},
  {path:'Home',component:HomeComponent},
  {path:'Login',component:LoginComponent},
  {path:'Registrar',component:RegistrarComponent},
  {path:'Turnos',component:TurnosComponent,canActivate:[AuthGuard]},
  {path:'Cajeros',component:CajerosComponent,canActivate:[AuthGuard]},
  {path:'Informacion',component:AccountInfoComponent,canActivate:[AuthGuard]},
  {path:'CatTramites',component:CatTramitesComponent,canActivate:[RoleGuard]},
  {path:'Usuarios',component:UsuariosComponent,canActivate:[RoleGuard]}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
