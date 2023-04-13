import { Component } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  score?: number;
  showError?: boolean;
  isLoading?: boolean;
  isGameOver?: boolean;
  questionNumber?: number;
  currentQuestion?: Question;
  questions?: Array<Question>;
  selectedAnswer: string | null;

  constructor(private quizService: QuizService) {
    this.score = 0;
    this.isLoading = true;
    this.showError = false;
    this.isGameOver = false;
    this.questionNumber = 1;
    this.selectedAnswer = null;
    this.questions = new Array<Question>();
  }

  ngOnInit() {
    this.getQuizQuestions();
  }

  async getQuizQuestions() {
    try {
      this.questions = await this.quizService.getQuestions();
      this.showFirstQuestion();
      this.isLoading = false;
    } catch (error: any) {
      this.isLoading = false;
      this.showError = error.status === 0;
    }
  }

  showFirstQuestion() {
    this.currentQuestion = this.questions![0];
    this.selectedAnswer = null;
  }

  selectAnswer(answer: any) {
    this.selectedAnswer = answer;
    if (answer === this.currentQuestion!.correctAnswer) {
      this.score!++;
    }
  }

  nextQuestion() {
    const index = this.questions!.indexOf(this.currentQuestion!);
    this.questionNumber!++;
    if (index < this.questions!.length - 1) {
      this.currentQuestion = this.questions![index + 1];
      this.selectedAnswer = null;
    } else {
      this.isGameOver = true;
    }
  }

  endGame() {
    const answer = window.confirm('Are you sure you want to end this current game?');
    if (answer) {
      this.restartGame();
    }
  }

  restartGame() {
    this.score = 0;
    this.questionNumber = 1;
    this.isGameOver = false;
    this.getQuizQuestions();
  }
}
