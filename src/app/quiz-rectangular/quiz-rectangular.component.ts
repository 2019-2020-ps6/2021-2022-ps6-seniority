import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../models/answer.model";

@Component({
  selector: 'app-quiz-rectangular',
  templateUrl: './quiz-rectangular.component.html',
  styleUrls: ['./quiz-rectangular.component.css']
})

export class QuizRectangularComponent implements OnInit {

  @Input() percentWidth : number = 0.5;
  @Input() choices : Answer[] = [];
  @Input() showResult ?: boolean;
  @Input() falseColor : string = "grey";
  @Input() trueColor : string = "blue";
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
