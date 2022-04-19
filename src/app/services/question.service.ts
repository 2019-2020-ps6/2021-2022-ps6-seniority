import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuizGame} from "../models/quiz.game.model";
import {Question} from "../models/question.model";
import {Answer} from "../models/answer.model";
import {BehaviorSubject} from "rxjs";
import {Quiz} from "../models/quiz.model";

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  private url: string = "http://localhost:9428/api/quizzes";
  private answers : Answer[] = [];

  public answers$ : BehaviorSubject<Answer[]> = new BehaviorSubject<Answer[]>(this.answers);

  constructor(private http : HttpClient) {
  }

  async getAnswers(question : Question) : Promise<Answer[]> {
    return new Promise(resolve => {
      this.http.get(`${this.url}/${question.quizId}/questions/${question.id}/answers`).subscribe(next => {
        this.answers = next as Answer[];
        this.answers$.next(this.answers);
        resolve(this.answers);
      })
    })
  }

  getAudio(question : Question){
    const audio = new Audio();
    audio.src = `${this.url}/${question.quizId}/questions/${question.id}/audio`;
    return audio;
  }

  getAudioAnswers(question : Question) {
    const audio = new Audio();
    audio.src = `${this.url}/${question.quizId}/questions/${question.id}/answers/audio`;
    return audio;
  }

}
