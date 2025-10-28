"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database";

export interface Assignment {
  _id: string;
  title: string;
  description?: string;
  course: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

const initialState: Assignment[] = db.assignments || [];

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // ✅ Add a new assignment
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.push(action.payload);
    },

    // ✅ Delete an assignment by id
    deleteAssignment: (state, action: PayloadAction<string>) => {
      return state.filter((a) => a._id !== action.payload);
    },

    // ✅ Update an existing assignment
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const updated = action.payload;
      const index = state.findIndex((a) => a._id === updated._id);
      if (index !== -1) {
        state[index] = updated;
      }
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
