"use client";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleContrlButton from "./ModuleContrlButton";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
}

{
  /*import { MdDoNotDisturbAlt, MdAnnouncement } from "react-icons/md";
import { FaCheckCircle, FaHome, FaBell } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";*/
}

export default function Modules() {
  const { cid } = useParams();
  const allModules: Module[] = db.modules || [];
  const courseModules = allModules.filter((m: Module) => m.course === cid);

  const hasModules = courseModules.length > 0;

  return (
    <div className="d-flex">
      {/* Left: Modules list */}
      <div className="flex-grow-1 me-4">
        <div className="mb-4">
          <ModulesControls />
        </div>

        <ListGroup className="rounded-0" id="wd-modules">
          {hasModules ? (
            courseModules.map((module: Module) => (
              <ListGroupItem
                key={module._id}
                className="wd-module p-0 mb-5 fs-5 border-gray"
              >
                <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                  <div>
                    <BsGripVertical className="me-2 fs-3" />
                    {module.name}
                  </div>
                  <ModuleContrlButton />
                </div>

                {module.lessons && module.lessons.length > 0 && (
                  <ListGroup
                    className="wd-lessons rounded-0"
                    style={{
                      backgroundColor: "#f5f5f5ff",
                      color: "#515151ff",
                      border: "1px solid #ccc",
                    }}
                  >
                    {module.lessons.map((lesson: Lesson) => (
                      <ListGroupItem
                        key={lesson._id}
                        className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <BsGripVertical className="me-2 fs-3" />

                          {lesson.name}
                        </div>
                        <LessonControlButtons />
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )}
              </ListGroupItem>
            ))
          ) : (
            <>
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
                    <span className="flex-grow-1">
                      Introduction to the course
                    </span>
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

              {/* small spacer */}
              <div style={{ height: 8 }} />

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
            </>
          )}
        </ListGroup>
      </div>

      {/*Course Status 
      <div id="wd-course-status" style={{ width: "300px" }}>
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
            marginRight: "8px",
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
            marginRight: "8px",
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
            marginRight: "8px",
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
            marginRight: "8px",
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
            marginRight: "8px",
          }}
        >
          <MdAnnouncement className="me-2 fs-5" /> New Announcement
        </Button>
      </div> */}
    </div>
  );
}
