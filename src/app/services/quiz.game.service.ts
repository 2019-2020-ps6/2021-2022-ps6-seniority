import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuizGame} from "../models/quiz.game.model";
import {Question} from "../models/question.model";
import {Quiz} from "../models/quiz.model";

@Injectable({
  providedIn: 'root'
})

export class QuizGameService {

  private url: string = "http://localhost:9428/api/game";

  constructor(private http : HttpClient) {
  }

  async createGameQuiz(game : QuizGame) : Promise<QuizGame> {
    return new Promise(resolve => {
      this.http.post(this.url, {... game}).subscribe(next => {
        resolve(next as QuizGame);
      });
    });
  }

  async getCurrentQuestion(game : QuizGame) : Promise<Question> {
    return new Promise(resolve => {
      this.http.get(`${this.url}/${game.id}/currentQuestion`).subscribe(next => {
        resolve(next as Question);
      })
    })
  }

  async updateGame(game : QuizGame) : Promise<QuizGame> {
    return new Promise(resolve => {
      this.http.put(this.url, {... game}).subscribe(next => {
        resolve(next as QuizGame);
      });
    });
  }

}
