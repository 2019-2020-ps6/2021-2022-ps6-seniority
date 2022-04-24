import { Component, OnInit } from '@angular/core';
import {Quiz} from "../models/quiz.model";
import {QuizGame} from "../models/quiz.game.model";
import {Senior} from "../models/senior.model";
import {UserService} from "../services/user.service";
import {QuizService} from "../services/quiz.service";
import {QuizGameService} from "../services/quiz.game.service";
import {Configuration, Handicap} from "../models/handicap.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-senior-play-quiz-glaucome',
  templateUrl: './select-senior-play-quiz.component.html',
  styleUrls: ['./select-senior-play-quiz.component.css']
})
export class SelectSeniorPlayQuizComponent implements OnInit {

  quiz ?: Quiz;
  seniors : Senior[] = [];
  selectedId : string = "";
  selectConfigs : Map<string | undefined,Handicap<any>>;

  constructor(private userService : UserService,private quizGameService : QuizGameService,private _router : Router) {
    this.selectConfigs = new Map<string | undefined, Handicap<any>>();
    this.userService.seniors$.subscribe(next => {
      this.seniors = next;
    });
    this.quizGameService.quiz$.subscribe(next => {
      this.quiz = next;
    });
    this.userService.userSelectedConfig$.subscribe(next => {
      this.selectConfigs = next;
    });
  }

  ngOnInit(): void {
  }

  launch() {
    const senior : Senior = this.seniors.filter(s => s.id === this.selectedId)[0];
    const hand : Handicap<any> = <Handicap<any>>this.selectConfigs.get(senior.id);
    this.quizGameService.updateCurrentConfig(hand);
    this._router.navigateByUrl(`/quiz/play/${<Configuration>(hand.config).type.toLowerCase()}`).then();
  }

}
