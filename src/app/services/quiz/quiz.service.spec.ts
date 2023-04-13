import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QuizService } from './quiz.service';
import { Question } from 'src/app/models/question.model';
import { Utils } from 'src/app/utils/Utils';

describe('QuizService', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizService],
    });
    service = TestBed.inject(QuizService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve questions', () => {
    const mockQuestions: Question[] = [
      {
        id: '1',
        category: 'science',
        difficulty: 'easy',
        question: 'What is the chemical symbol for gold?',
        correctAnswer: 'Au',
        incorrectAnswers: ['Ag', 'Cu', 'Ni'],
        answers: [],
        tags: [],
        type: '',
        regions: [],
        isNiche: false,
      },
      {
        id: '2',
        category: 'history',
        difficulty: 'easy',
        question: 'Who was the first president of the United States?',
        correctAnswer: 'George Washington',
        incorrectAnswers: [
          'Abraham Lincoln',
          'Thomas Jefferson',
          'John F. Kennedy',
        ],
        answers: [],
        tags: [],
        type: '',
        regions: [],
        isNiche: false,
      },
    ];

    service.getQuestions().then((questions) => {
      expect(questions).toEqual(mockQuestions);
      expect(questions[0].answers).toContain(mockQuestions[0].correctAnswer);
      expect(questions[1].answers).toContain(mockQuestions[1].correctAnswer);
    });

    const req = httpMock.expectOne(
      'https://the-trivia-api.com/api/questions?limit=10&categories=science,history&difficulty=easy'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestions);

    mockQuestions.forEach((question) => {
      expect(question.incorrectAnswers).toContain(question.correctAnswer);
      const allAnswers = question.incorrectAnswers.slice();
      allAnswers.push(question.correctAnswer);
      Utils.shuffleArray(allAnswers);
      expect(question.answers).toEqual(allAnswers);
    });
  });

  it('should handle errors', () => {
    const mockError = { message: 'Internal Server Error' };
    service.getQuestions().catch((error) => {
      expect(error).toEqual(mockError);
    });

    const req = httpMock.expectOne(
      'https://the-trivia-api.com/api/questions?limit=10&categories=science,history&difficulty=easy'
    );
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });
});
