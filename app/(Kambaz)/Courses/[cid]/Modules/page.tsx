"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleContrlButton from "./ModuleContrlButton";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";
import { MdAnnouncement } from "react-icons/md";
import { FaHome, FaBell } from "react-icons/fa";

export default function Modules() {
  return (
    <div className="d-flex">
      <div className="flex-grow-1 me-4">
        <div className="mb-4">
          <ModulesControls />
        </div>
        <ListGroup className="rounded-0" id="wd-modules">
          <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              Week 1
              <ModuleContrlButton />
              <LessonControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <span className="flex-grow-1">LEARNING OBJECTIVES</span>
                <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <span className="flex-grow-1">Introduction to the course</span>
                <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <span className="flex-grow-1">
                  Learn what is Web Development
                </span>
                <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <span className="flex-grow-1">LESSON 1</span>
                <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <span className="flex-grow-1">LESSON 2</span>
                <LessonControlButtons />
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>

          <br></br>

          <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              Week 2
              <ModuleContrlButton />
              <LessonControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <span className="flex-grow-1">LEARNING OBJECTIVES</span>
                <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <span className="flex-grow-1">LESSON 1</span>
                <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <span className="flex-grow-1">LESSON 2</span>
                <LessonControlButtons />
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>

      <div id="wd-course-status" style={{ width: "300px" }}>
        <h2>Course Status</h2>
        <div className="d-flex">
          <div className="w-50 pe-1">
            <Button
              variant="secondary"
              size="lg"
              className="w-100 text-nowrap "
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
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <BiImport className="me-2 fs-5" /> Import Existing Content
        </Button>

        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
        </Button>

        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <FaHome className="me-2 fs-5" /> Choose Home Page
        </Button>

        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <FaBell className="me-2 fs-5" /> View Course Notifications
        </Button>

        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <MdAnnouncement className="me-2 fs-5" /> New Announcement
        </Button>
      </div>
    </div>
  );
}
