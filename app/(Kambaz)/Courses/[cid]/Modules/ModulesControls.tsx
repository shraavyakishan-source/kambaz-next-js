"use client";
import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FaPlus, FaBan } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";

interface ModulesControlsProps {
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: ModulesControlsProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <div
      id="wd-modules-controls"
      className="d-flex justify-content-end align-items-center gap-2 text-nowrap"
    >
      {/* Collapse All Button */}
      <Button
        variant="secondary"
        size="lg"
        id="wd-collapse-all"
        style={{
          backgroundColor: "#e8ebed",
          color: "#000",
          border: "1px solid #ccc",
          marginRight: "8px",
        }}
      >
        Collapse All
      </Button>

      {/* View Progress Button */}
      <Button
        variant="secondary"
        size="lg"
        id="wd-view-progress"
        style={{
          backgroundColor: "#e8ebed",
          color: "#000",
          border: "1px solid #ccc",
          marginRight: "8px",
        }}
      >
        View Progress
      </Button>

      {/* Publish Dropdown */}
      <Dropdown>
        <DropdownToggle
          variant="secondary"
          size="lg"
          id="wd-publish-all-btn"
          style={{
            backgroundColor: "#e8ebed",
            color: "#000",
            border: "1px solid #ccc",
            marginRight: "8px",
          }}
        >
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <FaBan className="me-2 text-muted" /> Unpublish all modules and
            items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            <FaBan className="me-2 text-muted" /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* + Module Button */}
      <Button
        variant="danger"
        size="lg"
        id="wd-add-module-btn"
        onClick={handleShow}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      {/* Module Editor Dialog */}
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          addModule(); // call parent function
          handleClose(); // close modal after adding
        }}
      />
    </div>
  );
}
