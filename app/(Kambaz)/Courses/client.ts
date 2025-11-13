import axios from "axios";
import type { Course } from "../types/Course";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

// --- Response type for delete ---
interface DeleteResponse {
  success: boolean;
  message?: string;
}

// --- API Functions ---

// Get all courses
export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axios.get<Course[]>(COURSES_API);
  return data;
};

// Get courses for current user (requires session cookie)
export const findMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get<Course[]>(
    `${USERS_API}/current/courses`
  );
  return data;
};

// Enroll current user in a course
export const enroll = async (courseId: string): Promise<Course> => {
  const { data } = await axiosWithCredentials.post<Course>(
    `${USERS_API}/current/courses`,
    { courseId }
  );
  return data;
};

// Unenroll current user from a course
export const unenroll = async (courseId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${USERS_API}/current/courses`, {
    data: { courseId },
  });
};

// Create a new course
export const createCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.post<Course>(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

// Delete a course
export const deleteCourse = async (
  courseId: string
): Promise<DeleteResponse> => {
  const { data } = await axios.delete<DeleteResponse>(
    `${COURSES_API}/${courseId}`
  );
  return data;
};

// Update a course
export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axios.put<Course>(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};
