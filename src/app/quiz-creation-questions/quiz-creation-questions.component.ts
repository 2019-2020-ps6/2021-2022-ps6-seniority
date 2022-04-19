import {Component, OnInit} from '@angular/core';
import {Answer} from "../models/answer.model";
import {Question} from "../models/question.model";
import {QuizService} from "../services/quiz.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-quiz-creation-questions',
  templateUrl: './quiz-creation-questions.component.html',
  styleUrls: ['./quiz-creation-questions.component.css']
})
export class QuizCreationQuestionsComponent implements OnInit {

  selectedQuestion ?: Question;
  answers ?: Answer[];

  constructor(private quizService: QuizService,private _router : Router,private snackBar : MatSnackBar) {
    this.answers = [];
    this.quizService.quizToAdd$.subscribe(next => {
      console.log(quizService.getQuizToAdd())
      if (this.selectedQuestion && next.questions.has(this.selectedQuestion)) {
        this.answers = next.questions.get(this.selectedQuestion);
      }
    });
  }

  ngOnInit(): void {
  }

  addNewChoice() {
    if (!this.adding_disabled) {
      this.quizService.addAnswer(this.selectedQuestion, {
        type: "string",
        isCorrect: false,
        value: '',
      })
    }
  }

  get adding_disabled() {
    return this.answers && this.answers.length >= 4;
  }

  changeAnswer(i: number) {
    if (!this.answers) return;
    this.answers[i].isCorrect = true;
    for (let j = 0; j < this.answers.length; j++) {
      if (i == j) continue;
      this.answers[j].isCorrect = false;
    }
  }

  deleteChoice(i: number) {
    if (this.answers)
      this.answers.splice(i, 1);
  }

  get questions() {
    return Array.from(this.quizService.getQuizToAdd().questions.keys());
  }

  selectQuestion(question: Question) {
    this.selectedQuestion = question;
    this.answers = this.quizService.getQuizToAdd().questions.get(this.selectedQuestion);
  }

  addQuestion() {
    const newQuestion: Question = {
      quizId: 0,
      label: ''
    }
    this.selectQuestion(newQuestion);
    this.quizService.addQuestion(newQuestion);
  }

  deleteQuestion(question: Question) {
    this.quizService.removeQuestionInQuizToAdd(question);
    if (this.selectedQuestion === question)
      this.selectedQuestion = undefined;
  }

  canRegisterQuiz() {
    const quizBuilder = this.quizService.getQuizToAdd();
    return quizBuilder.quiz && quizBuilder.questions && quizBuilder.questions.size >= 1 && Array.from(quizBuilder.questions.entries()).every(entry => this.isValidQuestion(entry[0], entry[1]));
  }

  isValidQuestion(question: Question | undefined, answers: Answer[] | undefined) {
    return question && question.label !== '' && answers && answers.filter(ans => ans.value !== '').length >= 2 && answers.filter(ans => ans.isCorrect).length === 1;
  }

  testQuestionValidity(question: Question) {
    return this.isValidQuestion(question, this.quizService.getQuizToAdd().questions.get(question));
  }

  getColorValidity(question: Question) {
    return this.testQuestionValidity(question) ? "green" : "red";
  }

  saveQuiz() {
    if (this.canRegisterQuiz())
      this.quizService.registerNewQuiz().then(res => {
        if (res) {
          this.snackBar.open('Quiz ajouté avec succès','OK', {
            duration : 3000
          });
          this._router.navigateByUrl('/accueil').then()
        }
      });
  }

}
