import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: initialCourses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }) => {
      state.courses.push({ ...course, _id: uuidv4() });
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (course: any) => course._id !== courseId
      );
    },
    updateCourse: (state, { payload: updatedCourse }) => {
      const index = state.courses.findIndex(
        (c: any) => c._id === updatedCourse._id
      );
      if (index !== -1) state.courses[index] = updatedCourse;
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
