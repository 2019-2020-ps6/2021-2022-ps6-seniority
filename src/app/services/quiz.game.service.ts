import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuizGame} from "../models/quiz.game.model";
import {Quiz} from "../models/quiz.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class QuizGameService {

  private url: string = "http://localhost:9428/api/quizzes";
  private quizGame ?: QuizGame;

  constructor(private http : HttpClient) {
  }

  async createGameQuiz(game : QuizGame) : Promise<QuizGame> {
    return new Promise(resolve => {
      this.http.post(this.url, {game}).subscribe(next => {
        this.quizGame = next as QuizGame;
        resolve(this.quizGame)
      });
    });
  }
}
