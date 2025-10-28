"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleContrlButton from "./ModuleContrlButton";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSelector, useDispatch } from "react-redux";
import React from "react";

interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

{
  /*import { MdDoNotDisturbAlt, MdAnnouncement } from "react-icons/md";
import { FaCheckCircle, FaHome, FaBell } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";*/
}

export default function Modules() {
  const { cid } = useParams();

  // Get Redux modules state
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  // State variable for the module name (used in ModuleEditor dialog)
  const [moduleName, setModuleName] = useState("");

  // FUNCTION TO ADD A NEW MODULE
  // Using Redux instead of local setModules
  const handleAddModule = () => {
    if (!moduleName.trim()) return;
    dispatch(addModule({ name: moduleName, course: cid }));
    setModuleName(""); // clear the input after dispatching
  };

  // FUNCTION TO DELETE A MODULE (Redux)
  const handleDeleteModule = (moduleId: string) => {
    dispatch(deleteModule(moduleId));
  };

  // FUNCTION TO EDIT/RENAME A MODULE (Redux)
  const handleEditModule = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };

  return (
    <div className="d-flex">
      {/* Left: Modules list */}
      <div className="flex-grow-1 me-4">
        <div className="mb-4">
          {/* Pass Redux-based addModule logic */}
          <ModulesControls
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={handleAddModule}
          />
        </div>

        <ListGroup className="rounded-0" id="wd-modules">
          {modules
            .filter((module: Module) => module.course === cid)
            .map((module: Module) => (
              <ListGroupItem
                key={module._id}
                className="wd-module p-0 mb-5 fs-5 border-gray"
              >
                <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                  <div>
                    <BsGripVertical className="me-2 fs-3" />
                    {/* Show module name or editable field */}
                    {!module.editing && module.name}
                    {module.editing && (
                      <FormControl
                        className="w-50 d-inline-block"
                        onChange={(e) =>
                          dispatch(
                            updateModule({ ...module, name: e.target.value })
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            dispatch(
                              updateModule({ ...module, editing: false })
                            );
                          }
                        }}
                        defaultValue={module.name}
                        autoFocus
                      />
                    )}
                  </div>

                  {/* Control buttons for edit/delete */}
                  <ModuleContrlButton
                    moduleId={module._id}
                    deleteModule={handleDeleteModule}
                    editModule={handleEditModule}
                  />
                </div>

                {/* Render lessons only if this module has any */}
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
            ))}
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
