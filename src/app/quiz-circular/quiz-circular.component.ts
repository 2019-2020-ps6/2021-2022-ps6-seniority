import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../models/answer.model";

@Component({
  selector: 'app-quiz-circular',
  templateUrl: './quiz-circular.component.html',
  styleUrls: ['./quiz-circular.component.css']
})
export class QuizCircularComponent implements OnInit {

  @Input() diameter : number = 400;
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

  get diameterStr() {
    return `${this.diameter}px`;
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
    console.log('ddd');
    if (answer.isCorrect)
      this.invokeGoodAnswerCallback();
    else
      this.invokeFalseAnswerCallback();
  }

}
