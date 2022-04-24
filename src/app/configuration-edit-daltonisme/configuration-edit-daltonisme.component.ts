import { Component, OnInit } from '@angular/core';
import {Senior} from "../models/senior.model";
import {DaltonismeConfiguration, Handicap} from "../models/handicap.model";
import {Answer} from "../models/answer.model";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-configuration-edit-daltonisme',
  templateUrl: './configuration-edit-daltonisme.component.html',
  styleUrls: ['./configuration-edit-daltonisme.component.css']
})
export class ConfigurationEditDaltonismeComponent implements OnInit {

  senior ?: Senior;
  configuration ?: Handicap<DaltonismeConfiguration>;
  falseChoices : Answer[] = [
    {
      value : "Rome",
      isCorrect : true,
    },
    {
      value : "Milan",
      isCorrect : false,
    },
    {
      value : "Venice",
      isCorrect : false,
    },
    {
      value : "Paris",
      isCorrect : false
    }
  ];

  hasAnswered : boolean = false;
  fullScreenPreview : boolean = false;

  constructor(private userService : UserService, private _router : Router, private matSnackBar : MatSnackBar) {
    this.userService.senior$.subscribe(next => {
      this.senior = next;
    });
    this.userService.handicap$.subscribe(next => {
      if (next?.config.type === 'Daltonisme') {
        this.configuration = next;
      }
    })
  }

  ngOnInit(): void {
  }

  goodAnswerFunction = () => {
    this.hasAnswered = true;
  }

  falseAnswerFunction = () => {
    this.hasAnswered = true;
  }

  restartPreview() {
    this.hasAnswered = false;
  }

  activateFullScreenPreview() {
    this.fullScreenPreview = !this.fullScreenPreview;
  }

  save() {
    if (!this.configuration) return;
    this.userService.updateHandicapConfig(this.configuration).then(res => {
      if (res){
        this.matSnackBar.open('Configuration mis à jour !','OK', {
          duration : 3000
        });
        this._router.navigateByUrl('/profil/senior/profil').then();
      }
    })
  }

}
