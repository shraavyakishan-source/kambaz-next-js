"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Quiz {
  _id: string;
  title: string;
  dueDate?: string;
  points?: number;
  numQuestions?: number;
  course: string;
  status?: string; // e.g., "Available", "Closed"
  published?: boolean; // ✅ Corrected, single optional field
}

const initialState: Quiz[] = [
  {
    _id: uuidv4(),
    title: "Q1 - HTML",
    dueDate: "Sep 21 at 1pm",
    points: 29,
    numQuestions: 11,
    course: "CS1234",
    status: "Closed",
    published: false, // ✅ Default unpublished
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
  },
];

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.push({ ...action.payload, _id: uuidv4(), published: false });
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      const index = state.findIndex((q) => q._id === action.payload._id);
      if (index !== -1) state[index] = { ...action.payload };
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      return state.filter((q) => q._id !== action.payload);
    },
    togglePublish: (state, action: PayloadAction<string>) => {
      const quiz = state.find((q) => q._id === action.payload);
      if (quiz) quiz.published = !quiz.published;
    },
  },
});

export const { addQuiz, updateQuiz, deleteQuiz, togglePublish } =
  quizSlice.actions;
export default quizSlice.reducer;
