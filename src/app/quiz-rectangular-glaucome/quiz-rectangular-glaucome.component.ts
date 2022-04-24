import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../models/answer.model";

@Component({
  selector: 'app-quiz-rectangular-glaucome',
  templateUrl: './quiz-rectangular-glaucome.component.html',
  styleUrls: ['./quiz-rectangular-glaucome.component.css']
})
export class QuizRectangularGlaucomeComponent implements OnInit {

  @Input() percentWidth : number = 0.5;
  @Input() choices : Answer[] = [];
  @Input() showResult ?: boolean;
  @Input() falseColor : string = "red";
  @Input() trueColor : string = "green";
  @Input() goodAnswerCallback ?: () => void;
  @Input() falseAnswerCallback ?: () => void;

  constructor() {
  }

  ngOnInit(): void {
  }

  get with() {
    return `${window.innerWidth * this.percentWidth}px`;
  }

  get height() {
    return `${window.innerHeight * this.percentWidth}px`;
  }

  correctColor(answer : Answer) {
    return answer.isCorrect ? this.trueColor : this.falseColor;
  }

  invokeFalseAnswerCallback() {
    this.falseAnswerCallback!();
  }

  invokeGoodAnswerCallback() {
    this.goodAnswerCallback!();
  }

  clickOnTile(answer : Answer) {
    if (answer.isCorrect)
      this.invokeGoodAnswerCallback();
    else
      this.invokeFalseAnswerCallback();
  }

}
