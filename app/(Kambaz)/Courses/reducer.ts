import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database";
import { v4 as uuidv4 } from "uuid";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department?: string;
  credits?: number;
  description: string;
  author?: string;
  image?: string;
}

// --- Utility functions for persistence ---
const loadCourses = (): Course[] => {
  if (typeof window === "undefined") return initialCourses;
  try {
    const saved = localStorage.getItem("courses");
    return saved ? JSON.parse(saved) : initialCourses;
  } catch {
    return initialCourses;
  }
};

const saveCourses = (courses: Course[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("courses", JSON.stringify(courses));
  }
};

// --- Slice ---
const initialState = {
  courses: loadCourses(),
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }) => {
      const newCourse = { ...course, _id: uuidv4() };
      state.courses.push(newCourse);
      saveCourses(state.courses);
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((course) => course._id !== courseId);
      saveCourses(state.courses);
    },
    updateCourse: (state, { payload: updatedCourse }) => {
      const index = state.courses.findIndex((c) => c._id === updatedCourse._id);
      if (index !== -1) {
        state.courses[index] = updatedCourse;
        saveCourses(state.courses);
      }
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
