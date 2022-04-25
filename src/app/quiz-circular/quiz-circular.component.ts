import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Answer} from "../models/answer.model";

@Component({
  selector: 'app-quiz-circular',
  templateUrl: './quiz-circular.component.html',
  styleUrls: ['./quiz-circular.component.css']
})
export class QuizCircularComponent implements OnInit, OnDestroy {

  @Input() percentWidth : number = 0.4;
  @Input() choices : Answer[] = [];
  @Input() showResult ?: boolean;
  @Input() falseColor : string = "red";
  @Input() trueColor : string = "green";
  @Input() fontSize : number = 20;
  @Input() goodAnswerCallback ?: () => void;
  @Input() falseAnswerCallback ?: () => void;
  @Input() circle : boolean = true;
  width = window.innerWidth;
  selections : boolean[] = [true,false,false,false];

  constructor() {
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.selectWithArrows);
    window.addEventListener('resize',this.resize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown',this.selectWithArrows);
    window.removeEventListener('resize',this.resize);
  }

  selectWithArrows = (ev : KeyboardEvent) => {
    if (ev.key === 'Enter') {
      let answer = this.choices[this.selections.map((value, index) => value ? index : -1).filter(v => v!=-1)[0]];
      if (answer.isCorrect)
        this.invokeGoodAnswerCallback();
      else
        this.invokeFalseAnswerCallback();
    }
    if (this.showResult) return;
    if (ev.key.startsWith('Arrow')) this.selections.fill(false);
    switch (ev.key) {
      case 'ArrowUp' : this.selections[0] = true;break;
      case 'ArrowDown' : this.selections[3] = true;break;
      case 'ArrowLeft' : this.selections[2] = true;break;
      case 'ArrowRight' : this.selections[1] = true;break;
    }
  }

  resize = (ev : Event) => {
    this.width = window.innerWidth;
  }

  get diameterStr() {
    return `${this.width * this.percentWidth}px`;
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
