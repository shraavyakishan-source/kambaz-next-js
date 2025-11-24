"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleContrlButton from "./ModuleContrlButton";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchModulesForCourse,
  createModuleForCourse,
  updateModuleForCourse,
  deleteModuleForCourse,
} from "./client";
import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  setModules,
} from "./reducer";

// Types
interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  lessons?: Lesson[];
  editing?: boolean;
  course: string;
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

  const { modules } = useSelector((state: ReduxState) => state.modulesReducer);

  const [moduleName, setModuleName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch modules on mount / when cid changes
  useEffect(() => {
    if (!cid || Array.isArray(cid)) return;

    const loadModules = async () => {
      try {
        console.log("Fetching modules for course:", cid);
        const data = await fetchModulesForCourse(cid);
        console.log("Modules fetched:", data);
        dispatch(setModules(data));
        setLoading(false);
      } catch (err) {
        console.error("Failed to load modules", err);
        setLoading(false);
      }
    };

    loadModules();
  }, [cid, dispatch]);

  // Add new module
  const handleAddModule = async () => {
    if (!moduleName.trim() || !cid || Array.isArray(cid)) return;

    try {
      const saved = await createModuleForCourse(cid, { name: moduleName });
      console.log("Module created:", saved);
      const data = await fetchModulesForCourse(cid);
      dispatch(setModules(data));
      setModuleName("");
    } catch (err) {
      console.error("Create module failed", err);
    }
  };

  // Delete module
  const handleDeleteModule = async (moduleId: string) => {
    if (!cid || Array.isArray(cid)) return;

    try {
      await deleteModuleForCourse(cid, moduleId);
      const data = await fetchModulesForCourse(cid);
      dispatch(setModules(data));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Toggle editing
  const handleEditModule = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };

  // Update module
  const handleUpdateModule = async (m: Module) => {
    if (!cid || Array.isArray(cid)) return;

    try {
      await updateModuleForCourse(cid, m._id, {
        name: m.name,
        description: m.description,
        lessons: m.lessons,
      });
      const data = await fetchModulesForCourse(cid);
      dispatch(setModules(data));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) return <div>Loading modules...</div>;

  return (
    <div className="d-flex">
      <div className="flex-grow-1 me-4">
        {/* Add Module Control */}
        <div className="mb-4">
          <ModulesControls
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={handleAddModule}
          />
        </div>

        {/* Modules List */}
        {modules.length === 0 ? (
          <div>No modules found for this course.</div>
        ) : (
          <ListGroup className="rounded-0" id="wd-modules">
            {modules.map((module) => (
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
                        value={module.name}
                        onChange={(e) =>
                          dispatch(
                            updateModule({ ...module, name: e.target.value })
                          )
                        }
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            await handleUpdateModule({
                              ...module,
                              editing: false,
                            });
                          }
                        }}
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

                {/* Lessons */}
                {module.lessons && module.lessons.length > 0 && (
                  <ListGroup
                    className="wd-lessons rounded-0"
                    style={{
                      backgroundColor: "#f5f5f5ff",
                      color: "#515151ff",
                      border: "1px solid #ccc",
                    }}
                  >
                    {module.lessons.map((lesson) => (
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
        )}
      </div>
    </div>
  );
}
