import axios from "axios";
import type { Course } from "../types/Course";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;

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

// Get courses the current user is enrolled in
export const fetchMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get<Course[]>(
    `${COURSES_API}/enrollments/current`
  );
  return data;
};

// Create a new course (auto-enrolls creator)
export const createCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.post<Course>(COURSES_API, course);
  return data;
};

// Update a course
export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.put<Course>(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};

// Delete a course (unenrolls all users)
export const deleteCourse = async (
  courseId: string
): Promise<DeleteResponse> => {
  const { data } = await axiosWithCredentials.delete<DeleteResponse>(
    `${COURSES_API}/${courseId}`
  );
  return data;
};

// Enroll current user in a course
export const enroll = async (courseId: string): Promise<Course> => {
  const { data } = await axiosWithCredentials.post<Course>(
    `${COURSES_API}/enroll/${courseId}`
  );
  return data;
};

// Unenroll current user from a course
export const unenroll = async (courseId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${COURSES_API}/unenroll/${courseId}`);
};
// Fetch all enrollments for the current user
export const fetchEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/enrollments/current`
  );
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/users`
  );
  return response.data;
};
