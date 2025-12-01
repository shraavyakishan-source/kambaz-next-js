import axios from "axios";
import { Quiz } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const fetchQuizzesForCourse = async (cid: string): Promise<Quiz[]> => {
  const { data } = await axios.get(`${API_BASE}/api/courses/${cid}/quizzes`);
  return data;
};

export const createQuizForCourse = async (
  cid: string,
  quiz: Partial<Quiz>
): Promise<Quiz> => {
  const { data } = await axios.post(
    `${API_BASE}/api/courses/${cid}/quizzes`,
    quiz
  );
  return data;
};

export const updateQuizForCourse = async (
  qid: string,
  quiz: Partial<Quiz>
): Promise<Quiz> => {
  const { data } = await axios.put(`${API_BASE}/api/quizzes/${qid}`, quiz);
  return data;
};

export const deleteQuizForCourse = async (qid: string) => {
  const { data } = await axios.delete(`${API_BASE}/api/quizzes/${qid}`);
  return data;
};

export const togglePublishQuiz = async (qid: string): Promise<Quiz> => {
  const { data } = await axios.put(`${API_BASE}/api/quizzes/${qid}/publish`);
  return data;
};
