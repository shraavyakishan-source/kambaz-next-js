"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import React from "react";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();

  const links = [
    { label: "Home", path: `/Courses/${cid}/Home` },
    { label: "Modules", path: `/Courses/${cid}/Modules` },
    { label: "Piazza", path: "https://piazza.com/class/mf08v5tcamaem/post/35" },
    { label: "Zoom", path: "https://northeastern.zoom.us/" },
    { label: "Assignments", path: `/Courses/${cid}/Assignments` },
    {
      label: "Quizzes",
      path: `/Courses/${cid}/Quizzes`,
    },
    {
      label: "Grades",
      path: "https://northeastern.instructure.com/courses/225999/grades",
    },
    { label: "People", path: `/Courses/${cid}/People/Table` },
  ];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => {
        const isExternal = link.path.startsWith("http");
        const isActive = pathname.startsWith(link.path);

        return isExternal ? (
          <a
            key={link.label}
            href={link.path}
            target="_blank"
            rel="noopener noreferrer"
            className={`list-group-item border-0 ${
              isActive ? "active text-white bg-danger" : "text-danger"
            }`}
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={link.label}
            href={link.path}
            className={`list-group-item border-0 ${
              isActive ? "active text-white bg-danger" : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
