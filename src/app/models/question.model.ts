export interface Question {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: Array<string>;
  answers: Array<string>;
  question: string;
  tags: Array<string>;
  type: string;
  difficulty: string;
  regions: Array<string>;
  isNiche: boolean;
}
