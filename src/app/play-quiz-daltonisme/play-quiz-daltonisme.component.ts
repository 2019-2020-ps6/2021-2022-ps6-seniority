import { Component, OnInit } from '@angular/core';
import {Quiz} from "../models/quiz.model";
import {QuizGame} from "../models/quiz.game.model";
import {Question} from "../models/question.model";
import {Answer} from "../models/answer.model";
import {DaltonismeConfiguration, GlaucomeConfiguration} from "../models/handicap.model";
import {QuizService} from "../services/quiz.service";
import {QuizGameService} from "../services/quiz.game.service";
import {QuestionService} from "../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-play-quiz-daltonisme',
  templateUrl: './play-quiz-daltonisme.component.html',
  styleUrls: ['./play-quiz-daltonisme.component.css']
})

export class PlayQuizDaltonismeComponent implements OnInit {

  quiz ?: Quiz;
  quizGame ?: QuizGame;
  currentQuestion ?: Question;
  currentAnswers: Answer[] = [];
  hasAnswered ?: boolean;
  config ?: DaltonismeConfiguration;

  constructor(private quizService: QuizService, private quizGameService: QuizGameService, private questionService: QuestionService, private route: ActivatedRoute, private userService : UserService, private _router: Router) {
    this.quizGameService.gameQuiz$.subscribe(game => {
      this.quizGame = game;
    });
    this.quizGameService.question$.subscribe(question => {
      this.currentQuestion = question;
    })
    this.questionService.answers$.subscribe(answers => {
      this.currentAnswers = answers;
    })
    this.quizGameService.quiz$.subscribe(quiz => {
      this.quiz = quiz;
    })
    this.quizGameService.currentConfig$.subscribe(next => {
      this.config = next?.config;
    });
  }

  ngOnInit(): void {
    if (this.quiz) {
      this.quizGame = {
        points: 0,
        round: 0,
        quizId: this.quiz.id as number,
      };
      this.quizGameService.createGameQuiz(this.quizGame).then(() => {
        this.initComponent().then(() => this.playAudio(this.currentQuestion));
      })
    }
  }

  async updateGame(): Promise<PlayQuizDaltonismeComponent> {
    return new Promise(resolve => {
      if (this.quizGame) {
        this.quizGameService.updateGame().then(() => {
          this.initComponent().then(r => resolve(this));
        })
      }
    });
  }

  private initComponent() : Promise<Answer[]> {
    return new Promise(resolve => {
      if (this.quizGame) {
        this.quizGameService.getCurrentQuestion().then(question => {
          this.questionService.getAnswers(question).then(r => resolve(r));
        })
      }
    })
  }

  onClickAnswer() {
    this.hasAnswered = true;
  }

  private playAudio(newQuestion: Question | undefined) {
    if (!newQuestion || !this.config || !this.config?.activate_voice) return;
    const audio = this.questionService.getAudio(newQuestion);
    audio.load();
    audio.play().then(console.log);
    audio.onended = () => {
      setTimeout(() => {
        if (this.currentQuestion && this.currentAnswers) {
          const audio = this.questionService.getAudioAnswers(this.currentQuestion);
          audio.load();
          audio.play().then(console.log);
        }
      }, 2000);
    }
  }

  async nextQuestion() {
    if (this.quizGame && this.quiz && this.quizGame.round < await this.quizService.getNumberOfQuestions(this.quiz) - 1) {
      this.quizGame.round++;
      this.hasAnswered = false;
      this.updateGame().then(() => this.playAudio(this.currentQuestion));
    } else {
      this._router.navigateByUrl('/accueil').then(console.log);
    }
  }

  goodAnswerFunction = () => {
    if (this.quizGame) {
      this.quizGame.points++;
      this.hasAnswered = true;
    }
  }

  falseAnswerFunction = () => {
    this.hasAnswered = true;
  }

}
