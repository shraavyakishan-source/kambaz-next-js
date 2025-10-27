"use client";

import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useParams } from "next/navigation";
import React from "react";

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

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams(); // get course id from URL
  const { courses } = useSelector((state: RootState) => state.coursesReducer); // read from Redux store

  const course: Course | undefined = courses.find((c: Course) => c._id === cid);

  // ✅ Sidebar visibility state
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div id="wd-courses">
      {/* Breadcrumb with working toggle */}
      <Breadcrumb course={course} onToggleSidebar={toggleSidebar} />
      <hr />
      <table>
        <tbody>
          <tr>
            {/* Conditionally render sidebar */}
            {isSidebarVisible && (
              <td valign="top" width="200">
                <CourseNavigation />
              </td>
            )}
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
