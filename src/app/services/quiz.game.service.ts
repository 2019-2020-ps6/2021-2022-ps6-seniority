import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuizGame} from "../models/quiz.game.model";
import {Question} from "../models/question.model";
import {Quiz} from "../models/quiz.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class QuizGameService {

  private url: string = "http://localhost:9428/api/game";
  private gameQuiz ?: QuizGame;
  private currentQuestion ?: Question;
  private quiz ?: Quiz;

  public gameQuiz$: BehaviorSubject<QuizGame | undefined> = new BehaviorSubject<QuizGame | undefined>(this.gameQuiz);
  public question$: BehaviorSubject<Question | undefined> = new BehaviorSubject<Question | undefined>(this.currentQuestion);
  public quiz$ : BehaviorSubject<Quiz | undefined> = new BehaviorSubject<Quiz | undefined>(this.quiz);

  constructor(private http : HttpClient) {
  }

  async createGameQuiz(game : QuizGame) : Promise<QuizGame> {
    return new Promise(resolve => {
      this.http.post(this.url, {... game}).subscribe(next => {
        this.gameQuiz = next as QuizGame;
        this.gameQuiz$.next(this.gameQuiz);
        resolve(this.gameQuiz);
      });
    });
  }

  async getCurrentQuestion() : Promise<Question> {
    return new Promise(resolve => {
      this.http.get(`${this.url}/${this.gameQuiz?.id}/currentQuestion`).subscribe(next => {
        this.currentQuestion = next as Question;
        this.question$.next(this.currentQuestion);
        resolve(this.currentQuestion);
      })
    })
  }

  async updateGame() : Promise<QuizGame> {
    return new Promise(resolve => {
      this.http.put(`${this.url}/${this.gameQuiz?.id}`, {... this.gameQuiz}).subscribe(next => {
        this.gameQuiz = next as QuizGame;
        this.gameQuiz$.next(this.gameQuiz);
        resolve(this.gameQuiz);
      });
    });
  }

}
