import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Answer} from "../models/answer.model";

@Component({
  selector: 'app-quiz-circular',
  templateUrl: './quiz-circular.component.html',
  styleUrls: ['./quiz-circular.component.css']
})
export class QuizCircularComponent implements OnInit {

  @Input() percentWidth : number = 0.4;
  @Input() choices : Answer[] = [];
  @Input() showResult ?: boolean;
  @Input() falseColor : string = "red";
  @Input() trueColor : string = "green";
  @Input() fontSize : number = 20;
  @Input() goodAnswerCallback ?: () => void;
  @Input() falseAnswerCallback ?: () => void;
  @Input() circle : boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  get diameterStr() {
    return `${window.innerWidth * this.percentWidth}px`;
  }

  fontSizeReturn() {
    return `${this.fontSize}px`;
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
