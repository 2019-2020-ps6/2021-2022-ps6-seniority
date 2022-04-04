import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../models/quiz.model";
import {QuizService} from "../services/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {QuizGame} from "../models/quiz.game.model";
import {QuizGameService} from "../services/quiz.game.service";
import {Question} from "../models/question.model";
import {Answer} from "../models/answer.model";
import {QuestionService} from "../services/question.service";

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {

  quiz?: Quiz;
  quizGame ?: QuizGame;
  currentQuestion ?: Question;
  currentAnswers ?: Answer[];


  constructor(private quizService : QuizService, private quizGameService : QuizGameService, private questionService : QuestionService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.quizService.getQuizById(parseInt(this.route.snapshot.paramMap.get('id') as string)).then(q => {
      this.quiz = q;
      if(this.quiz?.id) {
        this.quizGame = {
          points : 0,
          round : 0,
          quizId : this.quiz?.id,
        };
        this.quizGameService.createGameQuiz(this.quizGame).
          then(game => {
            this.quizGame = game;
            return this.quizGame;
        }).then(game => {
          this.quizGameService.getCurrentQuesiton(game).then(question => {
            this.currentQuestion = question;
            return this.currentQuestion;
          }).then(question => {
            this.questionService.getAnswers(question).then(answers => this.currentAnswers = answers);
          });
        })
      }
    });
  }



}
