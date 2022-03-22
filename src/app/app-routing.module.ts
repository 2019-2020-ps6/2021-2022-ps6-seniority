import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {ProfilComponent} from "./profil/profil.component";

const routes: Routes = [
  {path : 'register',component : RegisterComponent},
  {path : 'profil/:id', component : ProfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
