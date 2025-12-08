import axios from "axios";
import { Quiz } from "./types";

// Base server URL (this will work locally and on Vercel)
const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

// Base API for courses
const COURSES_API = `${HTTP_SERVER}/api/courses`;
// Base API for quizzes (non-course-specific endpoints)
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

// Fetch all quizzes for a course
export const fetchQuizzesForCourse = async (cid: string): Promise<Quiz[]> => {
  const { data } = await axios.get(`${COURSES_API}/${cid}/quizzes`);
  return data;
};

// Fetch a single quiz by course ID and quiz ID
export const fetchQuizById = async (
  cid: string,
  qid: string
): Promise<Quiz> => {
  const { data } = await axios.get(`${COURSES_API}/${cid}/quizzes/${qid}`);
  return data;
};

// Create a new quiz for a course
export const createQuizForCourse = async (
  cid: string,
  quiz: Partial<Quiz>
): Promise<Quiz> => {
  const { data } = await axios.post(`${COURSES_API}/${cid}/quizzes`, quiz);
  return data;
};

// Update an existing quiz
export const updateQuizForCourse = async (
  qid: string,
  quiz: Partial<Quiz>
): Promise<Quiz> => {
  const { data } = await axios.put(`${QUIZZES_API}/${qid}`, quiz);
  return data;
};

// Delete a quiz
export const deleteQuizForCourse = async (qid: string) => {
  const { data } = await axios.delete(`${QUIZZES_API}/${qid}`);
  return data;
};

// Toggle publish/unpublish a quiz
export const togglePublishQuiz = async (qid: string): Promise<Quiz> => {
  const { data } = await axios.put(`${QUIZZES_API}/${qid}/publish`);
  return data;
};
