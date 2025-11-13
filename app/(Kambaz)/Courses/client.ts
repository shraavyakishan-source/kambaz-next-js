import axios from "axios";
import type { Course } from "../types/Course";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

// Define a proper Course type
// client.ts

// get all courses
export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

// get courses for current user (requires session cookie)
export const findMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

// enroll current user in a course
export const enroll = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    { courseId }
  );
  return data;
};

// unenroll current user from a course
export const unenroll = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/current/courses`,
    {
      data: { courseId },
    }
  );
  return data;
};

// create a new course
export const createCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

// delete a course
export const deleteCourse = async (courseId: string): Promise<any> => {
  const { data } = await axios.delete(`${COURSES_API}/${courseId}`);
  return data;
};

// update a course
export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};
