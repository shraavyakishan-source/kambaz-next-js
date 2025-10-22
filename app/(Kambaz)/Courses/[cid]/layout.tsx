import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
}

interface CoursesLayoutProps {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}

export default async function CoursesLayout({
  children,
  params,
}: Readonly<CoursesLayoutProps>) {
  const { cid } = await params;

  // Find the course by ID
  const course: Course | undefined = courses.find(
    (course) => course._id === cid
  );

  // Handle course not found
  if (!course) {
    return <div>Course not found</div>; // Or throw an error
  }

  return (
    <div id="wd-courses">
      <Breadcrumb course={course} />
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200">
              <CourseNavigation />
            </td>
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
