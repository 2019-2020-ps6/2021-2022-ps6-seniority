import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../services/theme.service";
import {Theme} from "../models/theme.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.css']
})
export class QuizCreationComponent implements OnInit {

  currentThemes ?: Theme[];
  quizForm : FormGroup;

  constructor(private themeService : ThemeService,public formBuilder : FormBuilder,private quizService : QuizService) {
    this.themeService.themes$.subscribe(next => {
      this.currentThemes = next;
    });
    this.quizForm = this.formBuilder.group({
      theme: [''],
      name: [''],
      comments : ['']
    });
    this.quizService.quizToAdd$.subscribe(console.log);
  }

  ngOnInit(): void {
    this.themeService.getAllThemes().then();
  }

  nextToQuestion() {
    this.quizService.updateQuizToAdd(this.quizForm.getRawValue());
  }

}

