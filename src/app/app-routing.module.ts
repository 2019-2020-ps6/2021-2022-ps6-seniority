import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {ProfilComponent} from "./profil/profil.component";
import {LoginComponent} from "./login/login.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {AjoutSeniorComponent} from "./ajout-senior/ajout-senior.component";
import {PlayQuizGlaucomeComponent} from "./play-quiz-glaucome/play-quiz-glaucome.component";
import {QuizCreationComponent} from "./quiz-creation/quiz-creation.component";
import {QuizCreationThemeComponent} from "./quiz-creation-theme/quiz-creation-theme.component";
import {QuizCreationQuestionsComponent} from "./quiz-creation-questions/quiz-creation-questions.component";
import {AuthGuard} from "./auth.guard";
import {ProfilCreationSeniorComponent} from "./profil-creation-senior/profil-creation-senior.component";
import {SeniorProfilComponent} from "./senior-profil/senior-profil.component";
import {ConfigurationEditGlaucomeComponent} from "./configuration-edit-glaucome/configuration-edit-glaucome.component";
import {SelectSeniorPlayQuizComponent} from "./select-senior-play-quiz/select-senior-play-quiz.component";
import {ConfigurationEditDaltonismeComponent} from "./configuration-edit-daltonisme/configuration-edit-daltonisme.component";

const routes: Routes = [
  {path : '', redirectTo : '/login', pathMatch : 'full'},
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : 'quiz/play/selection', component : SelectSeniorPlayQuizComponent, canActivate : [AuthGuard]},
  {path : 'profil', component : ProfilComponent , canActivate : [AuthGuard]},
  {path : 'profil/creation/senior', component : ProfilCreationSeniorComponent, canActivate : [AuthGuard]},
  {path : 'profil/senior/profil', component : SeniorProfilComponent, canActivate : [AuthGuard]},
  {path : 'accueil', component : AccueilComponent, canActivate : [AuthGuard]},
  {path : 'ajoutsenior', component : AjoutSeniorComponent, canActivate : [AuthGuard]},
  {path : 'quiz/play/glaucome', component : PlayQuizGlaucomeComponent, canActivate : [AuthGuard]},
  {path : 'quiz/creation', component: QuizCreationComponent, canActivate : [AuthGuard]},
  {path : 'quiz/creation/theme' , component : QuizCreationThemeComponent, canActivate : [AuthGuard]},
  {path : 'quiz/creation/questions' , component : QuizCreationQuestionsComponent, canActivate : [AuthGuard]},
  {path : 'configuration/edit/glaucome', component : ConfigurationEditGlaucomeComponent, canActivate : [AuthGuard]},
  {path : 'configuration/edit/daltonisme', component : ConfigurationEditDaltonismeComponent, canActivate : [AuthGuard]},
  { path: '**', component : LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
