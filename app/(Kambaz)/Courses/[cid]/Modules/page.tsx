"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleContrlButton from "./ModuleContrlButton";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
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

interface ModulesReducerState {
  modules: Module[];
}

interface ReduxState {
  modulesReducer: ModulesReducerState;
}

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  // ✅ Clean fix: no `any`, no external import
  const { modules } = useSelector((state: ReduxState) => state.modulesReducer);

  const [moduleName, setModuleName] = useState("");

  const handleAddModule = () => {
    if (!moduleName.trim()) return;
    if (!cid || Array.isArray(cid)) return; // ensure cid is a string
    dispatch(addModule({ name: moduleName, course: cid }));
    setModuleName("");
  };

  const handleDeleteModule = (moduleId: string) => {
    dispatch(deleteModule(moduleId));
  };

  const handleEditModule = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1 me-4">
        <div className="mb-4">
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

                  <ModuleContrlButton
                    moduleId={module._id}
                    deleteModule={handleDeleteModule}
                    editModule={handleEditModule}
                  />
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
            ))}
        </ListGroup>
      </div>
    </div>
  );
}
