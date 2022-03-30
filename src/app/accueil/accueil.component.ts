import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Quiz} from "../models/quiz.model";
import {QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  quizzes?: Quiz[];

  constructor(private userService : UserService,private quizService : QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().then(value => this.quizzes = value);
  }

}
