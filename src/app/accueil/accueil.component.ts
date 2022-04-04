import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Quiz} from "../models/quiz.model";
import {QuizService} from "../services/quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  quizzes?: Quiz[];

  constructor(private userService : UserService,private quizService : QuizService, private _router: Router) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().then(value => this.quizzes = value);
  }

  playQuiz(quiz : Quiz) {
    this._router.navigateByUrl(`/quiz/play/${quiz.id}`).then(console.log);
  }

}
