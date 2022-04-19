import { Component, OnInit } from '@angular/core';
import {Theme} from "../models/theme.model";
import {ThemeService} from "../services/theme.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-creation-theme',
  templateUrl: './quiz-creation-theme.component.html',
  styleUrls: ['./quiz-creation-theme.component.css']
})
export class QuizCreationThemeComponent implements OnInit {

  currentThemes ?: Theme[];
  theme : string = "";

  constructor(private themeService : ThemeService,private _router: Router) {
    this.themeService.themes$.subscribe(next => {
      this.currentThemes = next;
    })
  }

  ngOnInit(): void {
    this.themeService.getAllThemes().then();
  }

  addTheme() {
    let theme : Theme = {
      value : this.theme
    };
    this.themeService.addTheme(theme).then(next => {
      if (next) {
        this._router.navigateByUrl("/quiz/creation").then(console.log);
      }
    });
  }

}
