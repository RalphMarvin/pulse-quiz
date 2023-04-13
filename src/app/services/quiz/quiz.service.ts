import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/question.model';
import { Utils } from 'src/app/utils/Utils';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuestions(): Promise<Array<Question>> {
    return new Promise((resolve, reject) => {
      const url = 'https://the-trivia-api.com/api/questions?limit=10&categories=science,history&difficulty=easy';
      this.http.get<Array<Question>>(url).subscribe({
        next: (response: Array<Question>) => {
          this.initializeAnswers(response);
          resolve(response);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  private initializeAnswers(response: Question[]) {
    response.map((question) => {
      this.addCorrectAnswerToIncorrectAnswersList(question);
      const allAnswers = question.incorrectAnswers;
      Utils.shuffleArray(allAnswers);
      this.updateAnswersList(question, allAnswers);
      return question;
    });
  }

  private updateAnswersList(question: Question, allAnswers: string[]) {
    question.answers = allAnswers;
  }

  private addCorrectAnswerToIncorrectAnswersList(question: Question) {
    // The API returns the correct answer and the incorrect answers seperately.
    // This just add the correct answer to the incorrect ones so its easier to
    // get a list of all answers, both incorrect and correct.
    question.incorrectAnswers.push(question.correctAnswer);
  }
}
