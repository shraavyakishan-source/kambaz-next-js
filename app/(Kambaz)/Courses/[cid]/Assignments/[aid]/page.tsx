"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AssignmentEditorBootstrap() {
  const { cid, aid } = useParams(); // e.g., RS101, A101
  const assignment = db.assignments.find((a) => a._id === aid);

  if (!assignment) {
    return (
      <div className="container py-4">
        <h3 className="text-danger">Assignment not found.</h3>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="container py-4">
      {/* Assignment Title */}
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <input
          id="wd-name"
          className="form-control"
          defaultValue={assignment.title}
        />
      </div>

      {/* Description */}
      <div className="card mb-4">
        <div className="card-body">
          <p>
            The assignment is
            <span className="fw-bold text-danger"> available online</span>.
          </p>
          <p>
            Submit your work for <strong>{assignment.title}</strong> in course{" "}
            <strong>{cid}</strong>.
          </p>
          <p>Include all necessary project files and documentation.</p>
        </div>
      </div>

      {/* Form Fields */}
      <form>
        <div className="row g-3 align-items-start">
          {/* Points */}
          <div className="col-md-4 text-md-end">
            <label htmlFor="wd-points" className="form-label">
              Points
            </label>
          </div>
          <div className="col-md-8">
            <input
              id="wd-points"
              className="form-control w-50"
              defaultValue="100"
            />
          </div>

          {/* Assignment Group */}
          <div className="col-md-4 text-md-end">
            <label className="form-label">Assignment Group</label>
          </div>
          <div className="col-md-8">
            <select className="form-select w-50" defaultValue="Assignment">
              <option value="Assignment">ASSIGNMENTS</option>
            </select>
          </div>

          {/* Grade Display */}
          <div className="col-md-4 text-md-end">
            <label className="form-label">Display Grade as</label>
          </div>
          <div className="col-md-8">
            <select className="form-select w-50" defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
            </select>
          </div>

          {/* Submission Type */}
          <div className="col-md-4 text-md-end">
            <label className="form-label">Submission Type</label>
          </div>
          <div className="col-md-8">
            <select className="form-select w-50" defaultValue="Online">
              <option value="Online">Online</option>
            </select>
          </div>

          {/* Online Entry Options */}
          <div className="col-md-4 text-md-end">
            <label className="form-label">Online Entry Options</label>
          </div>
          <div className="col-md-8">
            {[
              "Text Entry",
              "Website URL",
              "Media Recordings",
              "Student Annotation",
              "File Uploads",
            ].map((option, idx) => (
              <div className="form-check" key={idx}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`chk${idx}`}
                  defaultChecked={option === "Website URL"}
                />
                <label className="form-check-label" htmlFor={`chk${idx}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>

          {/* Assign To */}
          <div className="col-md-4 text-md-end">
            <label htmlFor="wd-Everyone" className="form-label">
              Assign
            </label>
          </div>
          <div className="col-md-8">
            <label htmlFor="wd-Everyone" className="form-label">
              Assign to
            </label>
            <input
              id="wd-Everyone"
              className="form-control w-50"
              defaultValue="Everyone"
            />
          </div>

          {/* Due Date */}
          <div className="col-md-4 text-md-end">
            <label htmlFor="wd-due-date" className="form-label">
              Due
            </label>
          </div>
          <div className="col-md-8">
            <input
              type="datetime-local"
              id="wd-due-date"
              className="form-control w-50"
              defaultValue="2024-05-13T23:59"
            />
          </div>

          {/* Available and Until Dates */}
          <div className="col-md-4 text-md-end"></div>
          <div className="col-md-8 d-flex gap-3">
            <div>
              <label htmlFor="wd-available-date" className="form-label">
                Available from
              </label>
              <input
                type="datetime-local"
                id="wd-available-date"
                className="form-control w-auto"
                defaultValue="2024-05-16T23:59"
              />
            </div>
            <div>
              <label htmlFor="wd-until-date" className="form-label">
                Until
              </label>
              <input
                type="date"
                id="wd-until-date"
                className="form-control w-auto"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 d-flex justify-content-end gap-2">
          <Link
            href={`/Courses/${cid}/Assignments`}
            className="btn btn-outline-secondary"
          >
            Cancel
          </Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">
            Save
          </Link>
        </div>
      </form>
    </div>
  );
}
