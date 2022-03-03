import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./Componentes/HomeComponente/home/home.component";
import { TramitesComponent } from "./Componentes/TramitesComponente/tramites/tramites.component";
import { LoginComponent } from "./Componentes/Login/login/login.component";
import { RegistrarComponent } from "./Componentes/Registrar/registrar/registrar.component";
import { TurnosComponent } from "./Componentes/Turnos/turnos/turnos.component";
import { CajerosComponent } from "./Componentes/Cajeros/cajeros/cajeros.component";
import { ImprimirComponent } from "./Componentes/Imprimir/imprimir/imprimir.component";

const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'Tramites', component:TramitesComponent},
  {path:'Home',component:HomeComponent},
  {path:'Login',component:LoginComponent},
  {path:'Registrar',component:RegistrarComponent},
  {path:'Turnos',component:TurnosComponent},
  {path:'Cajeros',component:CajerosComponent},
  {path:'Imprimir',component:ImprimirComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
