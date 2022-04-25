import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Answer} from "../models/answer.model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-quiz-rectangular',
  templateUrl: './quiz-rectangular.component.html',
  styleUrls: ['./quiz-rectangular.component.css']
})

export class QuizRectangularComponent implements OnInit, OnChanges, OnDestroy {
  @Input() darkColor : boolean = false;
  @Input() percentWidth : number = 0.6;
  @Input() percentHeight : number = 0.5;
  @Input() choices : Answer[] = [];
  @Input() showResult ?: boolean;
  @Input() textColor : string = "black";
  @Input() falseColor : string = "red";
  @Input() trueColor : string = "green";
  @Input() boldAnswers : boolean = true;
  @Input() fontSize : number = 32;
  @Input() goodAnswerCallback ?: () => void;
  @Input() falseAnswerCallback ?: () => void;
  width_ : number = window.innerWidth;
  height_: number = window.innerHeight;

  ngOnInit(): void {
    window.addEventListener('resize',this.resize);
  }

  ngOnDestroy() : void {
    window.removeEventListener('resize',this.resize);
  }

  resize = (ev : Event) => {
    this.width_ = window.innerWidth;
    this.height_ = window.innerHeight;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showResult'])
    {
      if(!this.showResult)
        this.textColor = "black";
    }
  }

  get width() {
    return `${this.width_ * this.percentWidth}px`;
  }

  get height() {
    return `${this.height_ * this.percentHeight}px`;
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
