import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {ProfilComponent} from "./profil/profil.component";
import {LoginComponent} from "./login/login.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {AjoutSeniorComponent} from "./ajout-senior/ajout-senior.component";
import {PlayQuizComponent} from "./play-quiz/play-quiz.component";

const routes: Routes = [
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : 'profil', component : ProfilComponent},
  {path : 'accueil', component : AccueilComponent},
  {path : 'ajoutsenior', component : AjoutSeniorComponent},
  {path : 'quiz/play/:id', component : PlayQuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
