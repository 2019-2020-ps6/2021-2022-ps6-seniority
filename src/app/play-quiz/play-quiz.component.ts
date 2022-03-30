import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../models/quiz.model";
import {QuizService} from "../services/quiz.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {

  quiz ?: Quiz;

  constructor(private quizService : QuizService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.quizService.getQuizById(parseInt(this.route.snapshot.paramMap.get("id") as string)).then(q => {
      this.quiz = q;
    })
  }



}
