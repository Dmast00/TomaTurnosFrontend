import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./Componentes/HomeComponente/home/home.component";
import { TramitesComponent } from "./Componentes/TramitesComponente/tramites/tramites.component";
import { LoginComponent } from "./Componentes/Login/login/login.component";
import { RegistrarComponent } from "./Componentes/Registrar/registrar/registrar.component";


const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'Tramites', component:TramitesComponent},
  {path:'Home',component:HomeComponent},
  {path:'Login',component:LoginComponent},
  {path:'Registrar',component:RegistrarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
