import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuizGame} from "../models/quiz.game.model";
import {Question} from "../models/question.model";
import {Answer} from "../models/answer.model";
import {Theme} from "../models/theme.model";
import {User} from "../models/user.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  private url: string = "http://localhost:9428/api/themes";
  private themes ?: Theme[];

  public themes$ : BehaviorSubject<Theme[] | undefined> = new BehaviorSubject<Theme[] | undefined>(this.themes);

  constructor(private http : HttpClient) {
  }

  async getAllThemes() : Promise<Theme[]> {
    return new Promise(resolve => {
      this.http.get(this.url).subscribe(next => {
        this.themes = next as Theme[];
        this.themes$.next(this.themes);
        resolve(this.themes);
      })
    })
  }

  addTheme(theme : Theme) : Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.post(this.url,{... theme}).subscribe(next => {
        if (next)
          resolve(true);
        resolve(false);
        this.getAllThemes().then();
      });
    });
  }

}
