export interface Quiz {
  _id: string;
  title: string;
  description?: string;
  quizType: string;
  assignmentGroup: string;
  points: number;
  course: string;

  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestions: boolean;

  dueDate?: string;
  availableDate?: string;
  untilDate?: string;

  numQuestions: number;
  published: boolean;
  status: string;
  questions: Question[];
}
export type Question = {
  _id?: string;
  quiz: string;
  type: "multiple-choice" | "true-false" | "fill-in-the-blank";
  text: string;
  options?: string[];
  answer: string;
  points: number;
};
