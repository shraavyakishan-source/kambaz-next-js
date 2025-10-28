"use client";
import React from "react";
import Modules from "../Modules/page";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home" className="d-flex">
      {/* Left side: Modules */}
      <div className="flex-grow-1 me-4">
        <Modules />
      </div>

      {/* Right side: Course Status */}
      <div style={{ width: 320 }}>
        <CourseStatus />
      </div>
    </div>
  );
}
