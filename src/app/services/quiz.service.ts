import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Quiz} from "../models/quiz.model";
import {Question} from "../models/question.model";
import {BehaviorSubject} from "rxjs";
import {Answer} from "../models/answer.model";

interface QuizHandler {
  quiz?: Quiz;
  questions: Map<Question, Answer[]>;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private url: string = "http://localhost:9428/api/quizzes";
  private quizToAdd: QuizHandler = {
    questions: new Map<Question, Answer[]>()
  };

  public quizToAdd$: BehaviorSubject<QuizHandler> = new BehaviorSubject<QuizHandler>(this.quizToAdd);

  constructor(private http: HttpClient) {
  }

  async getQuizzes(): Promise<Quiz[]> {
    return new Promise(resolve => {
      this.http.get(this.url).subscribe(next => {
        resolve(next as Quiz[]);
      });
    });
  }

  async getQuizById(id: number): Promise<Quiz | undefined> {
    return this.getQuizzes().then(quizzes => quizzes.filter(quiz => quiz.id === id).pop());
  }

  async getNumberOfQuestions(quiz: Quiz): Promise<number> {
    return new Promise(resolve => {
      this.http.get(`${this.url}/${quiz.id}/questions`).subscribe(next => {
        resolve((next as Array<Question>).length);
      });
    })
  }

  updateQuizToAdd(quiz: Quiz) {
    this.quizToAdd.quiz = Object.fromEntries(Object.entries(quiz).filter(([_, v]) => v !== "")) as Quiz;
    this.quizToAdd$.next(this.quizToAdd);
    console.log(this.quizToAdd);
  }

  addAnswer(question: Question | undefined, answer: Answer) {
    if (!question) return;
    if (!this.quizToAdd.questions.has(question)) {
      this.quizToAdd.questions.set(question, []);
    }
    this.quizToAdd.questions.get(question)?.push(answer);
    this.quizToAdd$.next(this.quizToAdd);
  }

  addQuestion(question: Question | undefined) {
    if (!question) return;
    if (!this.quizToAdd.questions.has(question)) {
      this.quizToAdd.questions.set(question, []);
    }
    this.quizToAdd$.next(this.quizToAdd);
  }

  removeQuestionInQuizToAdd(question: Question) {
    this.quizToAdd.questions.delete(question);
    this.quizToAdd$.next(this.quizToAdd);
  }

  getQuizToAdd() {
    return this.quizToAdd;
  }

  async registerNewQuiz(): Promise<boolean> {
    return new Promise(resolve => {
      this.http.post(this.url, {...this.quizToAdd.quiz}).subscribe(next => {
        const quizCreated = next as Quiz;
        const questionsAnswers = this.quizToAdd.questions;
        const firstPromises : Promise<any>[] = [];
        questionsAnswers.forEach((value, key) => {
          const url_question = `${this.url}/${quizCreated.id}/questions`;
          firstPromises.push(new Promise(res1 => {
            this.http.post(url_question, {...key}).subscribe(question => {
              const questionCreated = question as Question;
              const secondPromises : Promise<any>[] = [];
              value.forEach(val => {
                secondPromises.push(new Promise(res2 => {
                  const url_response = `${url_question}/${questionCreated.id}/answers`;
                  this.http.post(url_response, {...val}).subscribe(next => {
                    res2(next);
                  });
                }));
              });
              Promise.all(secondPromises).then(result => res1(result));
            });
          }));
        });
        Promise.all(firstPromises).then(() => resolve(true));
      });
    });
  }

}
