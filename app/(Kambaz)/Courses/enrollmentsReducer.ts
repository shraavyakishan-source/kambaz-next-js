// app/Courses/enrollmentsReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../Database";

interface Enrollment {
  user: string;
  course: string;
}

const initialState: { enrollments: Enrollment[] } = {
  enrollments: db.enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<Enrollment>) => {
      const exists = state.enrollments.some(
        (e) =>
          e.user === action.payload.user && e.course === action.payload.course
      );
      if (!exists) {
        state.enrollments.push(action.payload);
      }
    },
    unenroll: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.filter(
        (e) =>
          !(
            e.user === action.payload.user && e.course === action.payload.course
          )
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
