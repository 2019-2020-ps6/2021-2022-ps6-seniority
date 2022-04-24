import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { LoginComponent } from './login/login.component';
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfilComponent } from './profil/profil.component';
import {MatButtonModule} from "@angular/material/button";
import { AccueilComponent } from './accueil/accueil.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {HttpClientModule} from "@angular/common/http";
import { AjoutSeniorComponent } from './ajout-senior/ajout-senior.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { QuizzesComponent } from './quizzes/quizzes.component';
import { PlayQuizGlaucomeComponent } from './play-quiz-glaucome/play-quiz-glaucome.component';
import { QuizCircularComponent } from './quiz-circular/quiz-circular.component';
import { QuizCreationComponent } from './quiz-creation/quiz-creation.component';
import { QuizCreationThemeComponent } from './quiz-creation-theme/quiz-creation-theme.component';
import {MatListModule} from "@angular/material/list";
import { QuizCreationQuestionsComponent } from './quiz-creation-questions/quiz-creation-questions.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { ProfilCreationSeniorComponent } from './profil-creation-senior/profil-creation-senior.component';
import {DatePipe} from "@angular/common";
import { SeniorProfilComponent } from './senior-profil/senior-profil.component';
import { ConfigurationEditGlaucomeComponent } from './configuration-edit-glaucome/configuration-edit-glaucome.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import { SelectSeniorPlayQuizComponent } from './select-senior-play-quiz/select-senior-play-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfilComponent,
    AccueilComponent,
    AjoutSeniorComponent,
    QuizzesComponent,
    PlayQuizGlaucomeComponent,
    QuizCircularComponent,
    QuizCreationComponent,
    QuizCreationThemeComponent,
    QuizCreationQuestionsComponent,
    ProfilCreationSeniorComponent,
    SeniorProfilComponent,
    ConfigurationEditGlaucomeComponent,
    SelectSeniorPlayQuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    FormsModule,
    MatSlideToggleModule,
    MatSliderModule
  ],
  providers: [
    {provide : MAT_DATE_LOCALE, useValue : 'fr-FR'},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
