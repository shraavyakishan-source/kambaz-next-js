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
}
