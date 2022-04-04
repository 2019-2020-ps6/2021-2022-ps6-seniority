import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Quiz} from "../models/quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private url: string = "http://localhost:9428/api/quizzes";

  constructor(private http : HttpClient) {
  }

  async getQuizzes() : Promise<Quiz[]>{
    return new Promise(resolve => {
      this.http.get(this.url).subscribe(next => {
        resolve(next as Quiz[]);
      });
    });
  }

  async getQuizById(id : number) : Promise<Quiz | undefined>{
    return this.getQuizzes().then(quizzes => quizzes.filter(quiz => quiz.id === id).pop());
  }
}
