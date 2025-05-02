export type Question = {
  description: string;
  options: string[];
  answer: string;
};

export type QuizData = {
  questions: Question[];
};
