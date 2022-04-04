import {Component, OnInit} from '@angular/core';
import {Quiz} from "../models/quiz.model";
import {QuizService} from "../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizGame} from "../models/quiz.game.model";
import {QuizGameService} from "../services/quiz.game.service";
import {Question} from "../models/question.model";
import {QuestionService} from "../services/question.service";
import {Answer} from "../models/answer.model";

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {

  quiz ?: Quiz;
  quizGame ?: QuizGame;
  currentQuestion ?: Question;
  currentAnswers ?: Answer[];
  hasAnswered ?: boolean;

  constructor(private quizService: QuizService, private quizGameService: QuizGameService, private questionService: QuestionService, private route: ActivatedRoute,private _router: Router) {
  }

  ngOnInit(): void {
    this.quizService.getQuizById(parseInt(this.route.snapshot.paramMap.get('id') as string)).then(q => {
      this.quiz = q;
      if (this.quiz?.id) {
        this.quizGame = {
          points: 0,
          round: 0,
          quizId: this.quiz?.id,
        };
        this.updateGame().then(() => this.playAudio(this.currentQuestion));
      }
    });
  }

  async updateGame() : Promise<PlayQuizComponent> {
    return new Promise(resolve => {
      if (this.quizGame) {
        this.quizGameService.createGameQuiz(this.quizGame).then(game => {
          this.quizGame = game;
          return this.quizGame;
        }).then(game => {
          this.quizGameService.getCurrentQuestion(game).then(question => {
            this.currentQuestion = question;
            return this.currentQuestion;
          }).then(question => {
            this.questionService.getAnswers(question).then(answers => {
              this.currentAnswers = answers;
              resolve(this);
            });
          })
        });
      }
    });
  }

  onClickAnswer() {
    this.hasAnswered = true;
  }

  private playAudio(newQuestion : Question | undefined) {
    if (!newQuestion) return;
    const audio = this.questionService.getAudio(newQuestion);
    audio.load();
    audio.play().then(r => console.log('played !'));
  }

  async nextQuestion() {
    if (this.quizGame && this.quiz && this.quizGame.round < await this.quizService.getNumberOfQuestions(this.quiz) - 1) {
      this.quizGame.round++;
      this.hasAnswered = false;
      this.updateGame().then(() => this.playAudio(this.currentQuestion));
    }else{
      this._router.navigateByUrl('/accueil').then(console.log);
    }
  }

}
