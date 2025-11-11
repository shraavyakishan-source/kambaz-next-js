"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  // Assignment state
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  // Module state
  const [module, setModule] = useState({
    id: "M101",
    name: "Web Development",
    description: "Covers React, Node.js, and Express basics",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* --- ASSIGNMENT SECTION --- */}
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>

      <h4 className="mt-3">Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-secondary me-2"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Assignment Title
      </a>

      <h4 className="mt-3">Modifying Properties</h4>
      <div className="mb-3">
        <FormControl
          className="w-75"
          id="wd-assignment-title"
          defaultValue={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <a
          id="wd-update-assignment-title"
          className="btn btn-primary mt-2"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Assignment Title
        </a>
      </div>

      <div className="mb-3">
        <FormControl
          className="w-75"
          id="wd-assignment-score"
          type="number"
          defaultValue={assignment.score.toString()}
          onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })
          }
        />
        <a
          id="wd-update-assignment-score"
          className="btn btn-primary mt-2"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Assignment Score
        </a>
      </div>

      <div className="mb-3">
        <label className="me-2">Completed:</label>
        <input
          type="checkbox"
          id="wd-assignment-completed"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <a
          id="wd-update-assignment-completed"
          className="btn btn-primary ms-2"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Assignment Completion
        </a>
      </div>

      <hr />

      {/* --- MODULE SECTION --- */}
      <h4>Module Object</h4>
      <a
        id="wd-get-module"
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <a
        id="wd-get-module-name"
        className="btn btn-secondary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>

      <div className="mt-3">
        <FormControl
          className="w-75"
          id="wd-module-name"
          defaultValue={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
        <a
          id="wd-update-module-name"
          className="btn btn-primary mt-2"
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Module Name
        </a>
      </div>

      <div className="mt-3">
        <FormControl
          className="w-75"
          id="wd-module-description"
          defaultValue={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
        <a
          id="wd-update-module-description"
          className="btn btn-primary mt-2"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Module Description
        </a>
        <hr />
      </div>
    </div>
  );
}
