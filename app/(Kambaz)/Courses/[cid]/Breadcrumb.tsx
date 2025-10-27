"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";

interface Course {
  name: string | { title: string };
}

interface BreadcrumbProps {
  course: Course;
  onToggleSidebar: () => void; // <-- callback to toggle sidebar
}

export default function Breadcrumb({
  course,
  onToggleSidebar,
}: BreadcrumbProps) {
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop();

  const courseName =
    typeof course?.name === "string"
      ? course.name
      : course?.name?.title || "Rocket Propulsion";

  return (
    <div
      id="wd-breadcrumb"
      className="text-danger fs-5 mb-2 d-flex align-items-center"
      style={{ paddingTop: "10px" }}
    >
      {/* Hamburger icon */}
      <FaAlignJustify
        className="me-3 fs-4"
        style={{ cursor: "pointer" }}
        onClick={onToggleSidebar} // <-- trigger toggle
      />

      <span>
        {courseName} &gt;{" "}
        <span className="text-danger text-capitalize">{currentPage}</span>
      </span>
    </div>
  );
}
