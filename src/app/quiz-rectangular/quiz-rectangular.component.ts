import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Answer} from "../models/answer.model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-quiz-rectangular',
  templateUrl: './quiz-rectangular.component.html',
  styleUrls: ['./quiz-rectangular.component.css']
})

export class QuizRectangularComponent implements OnInit, OnChanges {
  @Input() darkColor : boolean = false;
  @Input() percentWidth : number = 0.6;
  @Input() choices : Answer[] = [];
  @Input() showResult ?: boolean;
  @Input() textColor : string = "black";
  @Input() falseColor : string = "red";
  @Input() trueColor : string = "green";
  @Input() boldAnswers : boolean = true;
  @Input() fontSize : number = 32;
  @Input() goodAnswerCallback ?: () => void;
  @Input() falseAnswerCallback ?: () => void;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showResult'])
    {
      if(!this.showResult)
        this.textColor = "black";
    }
  }

  get with() {
    return `${window.innerWidth * this.percentWidth}px`;
  }

  get height() {
    return `${window.innerHeight * this.percentWidth}px`;
  }

  fontSizeReturn() {
    return `${this.fontSize}px`;
  }

  boldAnswersReturn(boldAnswers : boolean) {
    return boldAnswers ? "bold" : "normal";
  }

  textColorReturn() {
    return this.textColor;
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
    if(this.darkColor){
      this.textColor = "white";
    }
    if (answer.isCorrect)
      this.invokeGoodAnswerCallback();
    else
      this.invokeFalseAnswerCallback();
  }

}
