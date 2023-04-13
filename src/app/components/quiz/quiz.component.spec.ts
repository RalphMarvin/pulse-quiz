import { QuizComponent } from './quiz.component';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let quizServiceSpy: jasmine.SpyObj<QuizService>;

  let quizQuestions = [
    {
      category: 'Science',
      id: '622a1c3a7cc59eab6f95106e',
      correctAnswer: 'Dermatologist',
      answers: ['Permologist', 'Skin Clinician', 'Visologist', 'Dermatologist'],
      incorrectAnswers: ['Permologist', 'Skin Clinician', 'Visologist'],
      question: 'What is a skin specialist called?',
      tags: ['science'],
      type: 'Multiple Choice',
      difficulty: 'easy',
      regions: [],
      isNiche: false,
    },
    {
      category: 'History',
      id: '622a1c3c7cc59eab6f951908',
      correctAnswer: 'Vesuvius',
      incorrectAnswers: ['Etna', 'Krakatoa', 'Pelee'],
      answers: ['Vesuvius', 'Etna', 'Krakatoa', 'Pelee'],
      question: 'What volcano destroyed Pompeii?',
      tags: ['italy', 'volcanoes', 'the_ancient_world'],
      type: 'Multiple Choice',
      difficulty: 'easy',
      regions: [],
      isNiche: false,
    },
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('QuizService', ['getQuestions']);

    TestBed.configureTestingModule({
      declarations: [QuizComponent],
      providers: [{ provide: QuizService, useValue: spy }],
    });

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    quizServiceSpy = TestBed.inject(QuizService) as jasmine.SpyObj<QuizService>;
    quizServiceSpy.getQuestions.and.returnValue(Promise.resolve(quizQuestions));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize questions', () => {
    expect(component.questions).toEqual([]);
    component.ngOnInit();
    expect(component.questions!.length).toBe(2);
  });

  it('should show the first question', () => {
    component.questions = quizQuestions;
    component.showFirstQuestion();
    expect(component.currentQuestion!.question).toBe(
      'What is a skin specialist called?'
    );
  });

  it('should select an answer', () => {
    component.currentQuestion = quizQuestions[0];
    component.selectAnswer('Dermatologist');
    expect(component.selectedAnswer).toBe('Dermatologist');
    expect(component.score).toBe(1);
  });

  it('should go to the next question', () => {
    component.questions = quizQuestions;
    component.currentQuestion = component.questions[0];
    component.selectedAnswer = 'Dermatologist';
    component.nextQuestion();
    expect(component.currentQuestion).toBe(component.questions[1]);
    expect(component.selectedAnswer).toBeNull();
  });

  it('should end the game', () => {
    component.questions = quizQuestions;
    component.currentQuestion = component.questions![1];
    component.score = 1;
    component.isGameOver = false;
    component.endGame();
    expect(component.isGameOver).toBeTrue();
    expect(component.score).toBe(0);
  });

  it('should restart the game', () => {
    component.questions = quizQuestions;
    component.currentQuestion = component.questions[1];
    component.score = 1;
    component.isGameOver = true;
    component.restartGame();
    expect(component.isGameOver).toBeFalse();
    expect(component.score).toBe(0);
    expect(component.questions.length).toBe(0);
    expect(quizServiceSpy.getQuestions).toHaveBeenCalledTimes(2);
  });
});
