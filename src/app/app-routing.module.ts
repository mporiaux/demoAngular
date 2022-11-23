import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ClientsComponent} from "./components/clients/clients.component";
import {CommandesComponent} from "./components/commandes/commandes.component";
import {ExercicesComponent} from "./components/exercices/exercices.component";
//routes pour composants
const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"clients",component:ClientsComponent},
  {path:"commandes",component:CommandesComponent},
  {path:"exercices",component:ExercicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
