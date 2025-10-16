"use client";
import { MdDoNotDisturbAlt, MdAnnouncement } from "react-icons/md";
import { FaCheckCircle, FaHome, FaBell } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";

export default function CourseStatus() {
  return (
    <div className="d-flex">
      <div id="wd-course-status" style={{ width: 300 }}>
        <h2>Course Status</h2>

        <div className="d-flex">
          <div className="w-50 pe-1">
            <Button
              variant="secondary"
              size="lg"
              className="w-100 text-nowrap"
              style={{
                backgroundColor: "#e8ebed",
                color: "#000",
                border: "1px solid #ccc",
                marginRight: "8px",
              }}
            >
              <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
            </Button>
          </div>
          <div className="w-50">
            <Button variant="success" size="lg" className="w-100">
              <FaCheckCircle className="me-2 fs-5" /> Publish
            </Button>
          </div>
        </div>

        <br />

        <Button
          variant="secondary"
          size="lg"
          className="w-100 mt-1 text-start"
          style={{
            backgroundColor: "#e8ebed",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <BiImport className="me-2 fs-5" /> Import Existing Content
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="w-100 mt-1 text-start"
          style={{
            backgroundColor: "#e8ebed",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="w-100 mt-1 text-start"
          style={{
            backgroundColor: "#e8ebed",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <FaHome className="me-2 fs-5" /> Choose Home Page
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="w-100 mt-1 text-start"
          style={{
            backgroundColor: "#e8ebed",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <FaBell className="me-2 fs-5" /> View Course Notifications
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="w-100 mt-1 text-start"
          style={{
            backgroundColor: "#e8ebed",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <MdAnnouncement className="me-2 fs-5" /> New Announcement
        </Button>
      </div>
    </div>
  );
}
