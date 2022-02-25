import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./Componentes/HomeComponente/home/home.component";
import { TramitesComponent } from "./Componentes/TramitesComponente/tramites/tramites.component";


const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'Tramites', component:TramitesComponent},
  {path:'Home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
