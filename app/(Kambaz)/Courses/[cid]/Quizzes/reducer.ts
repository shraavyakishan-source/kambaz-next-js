"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// --------------------
// TYPE DEFINITIONS
// --------------------
export type QuizType =
  | "Graded Quiz"
  | "Practice Quiz"
  | "Graded Survey"
  | "Ungraded Survey";

export type AssignmentGroup = "Quizzes" | "Exams" | "Assignments" | "Project";

// --------------------
// QUIZ INTERFACE
// --------------------
export interface Quiz {
  _id: string;
  title: string;
  dueDate?: string;
  points?: number;
  numQuestions?: number;
  course: string;
  status?: string;
  published: boolean;

  description?: string;
  quizType: QuizType;
  assignmentGroup: AssignmentGroup;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  showCorrectAnswers?: string;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  availableDate?: string;
  untilDate?: string;
}

// --------------------
// INITIAL STATE
// --------------------
const initialState: Quiz[] = [
  {
    _id: uuidv4(),
    title: "Q1 - HTML",
    dueDate: "Sep 21 at 1pm",
    points: 29,
    numQuestions: 11,
    course: "CS1234",
    status: "Closed",
    published: false,
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: "Never",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
  },
  {
    _id: uuidv4(),
    title: "Q2 - CSS",
    dueDate: "Oct 5 at 1am",
    points: 27,
    numQuestions: 7,
    course: "CS1234",
    status: "Closed",
    published: false,
    quizType: "Practice Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 15,
    multipleAttempts: false,
    showCorrectAnswers: "After Due Date",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
  },
];

// --------------------
// SLICE DEFINITION
// --------------------
const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<Partial<Quiz>>) => {
      const newQuiz: Quiz = {
        _id: uuidv4(),
        title: action.payload.title ?? "Untitled Quiz",
        course: action.payload.course ?? "Unknown Course",
        dueDate: action.payload.dueDate,
        points: action.payload.points ?? 0,
        numQuestions: action.payload.numQuestions ?? 0,
        status: action.payload.status ?? "Draft",
        published: false,
        description: action.payload.description ?? "",
        quizType: action.payload.quizType ?? "Graded Quiz",
        assignmentGroup: action.payload.assignmentGroup ?? "Quizzes",
        shuffleAnswers: action.payload.shuffleAnswers ?? true,
        timeLimit: action.payload.timeLimit ?? 20,
        multipleAttempts: action.payload.multipleAttempts ?? false,
        showCorrectAnswers: action.payload.showCorrectAnswers ?? "Never",
        accessCode: action.payload.accessCode ?? "",
        oneQuestionAtATime: action.payload.oneQuestionAtATime ?? true,
        webcamRequired: action.payload.webcamRequired ?? false,
        lockQuestionsAfterAnswering:
          action.payload.lockQuestionsAfterAnswering ?? false,
        availableDate: action.payload.availableDate,
        untilDate: action.payload.untilDate,
      };
      state.push(newQuiz);
    },

    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      const index = state.findIndex((q) => q._id === action.payload._id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },

    deleteQuiz: (state, action: PayloadAction<string>) => {
      return state.filter((q) => q._id !== action.payload);
    },

    togglePublish: (state, action: PayloadAction<string>) => {
      const quiz = state.find((q) => q._id === action.payload);
      if (quiz) {
        quiz.published = !quiz.published;
        quiz.status = quiz.published ? "Published" : "Draft";
      }
    },
  },
});

// --------------------
// EXPORTS
// --------------------
export const { addQuiz, updateQuiz, deleteQuiz, togglePublish } =
  quizSlice.actions;
export default quizSlice.reducer;
