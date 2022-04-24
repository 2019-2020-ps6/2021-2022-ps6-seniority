import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Quiz} from "../models/quiz.model";
import {QuizService} from "../services/quiz.service";
import {Router} from "@angular/router";
import {QuizGameService} from "../services/quiz.game.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  quizzes?: Quiz[];

  constructor(private userService : UserService,private gameQuizService : QuizGameService,private quizService : QuizService, private _router: Router) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().then(value => this.quizzes = value);
  }

  playQuiz(quiz : Quiz) {
    this.gameQuizService.quiz$.next(quiz);
    this._router.navigateByUrl(`/quiz/play/selection`).then(console.log);
  }

}
