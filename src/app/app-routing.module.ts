import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {ProfilComponent} from "./profil/profil.component";
import {LoginComponent} from "./login/login.component";
import {AccueilComponent} from "./accueil/accueil.component";

const routes: Routes = [
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : 'profil', component : ProfilComponent},
  {path : 'accueil', component : AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
