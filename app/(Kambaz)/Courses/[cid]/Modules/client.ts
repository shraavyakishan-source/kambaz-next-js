import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const MODULES_API = `${HTTP_SERVER}/api/courses`; // we'll append /:courseId/modules

export const fetchModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${MODULES_API}/${courseId}/modules`
  );
  return data;
};

export const createModuleForCourse = async (
  courseId: string,
  moduleData: any
) => {
  const { data } = await axiosWithCredentials.post(
    `${MODULES_API}/${courseId}/modules`,
    moduleData
  );
  return data;
};

export const updateModuleForCourse = async (
  courseId: string,
  moduleId: string,
  updates: any
) => {
  const { data } = await axiosWithCredentials.put(
    `${MODULES_API}/${courseId}/modules/${moduleId}`,
    updates
  );
  return data;
};

export const deleteModuleForCourse = async (
  courseId: string,
  moduleId: string
) => {
  const { data } = await axiosWithCredentials.delete(
    `${MODULES_API}/${courseId}/modules/${moduleId}`
  );
  return data;
};
