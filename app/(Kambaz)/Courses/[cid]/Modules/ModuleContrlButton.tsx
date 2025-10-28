"use client";
import { FaPencil } from "react-icons/fa6";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical, BsPlus } from "react-icons/bs"; // Added three dots icon
import React from "react";
import { Button } from "react-bootstrap";

interface ModuleControlButtonsProps {
  onAdd?: () => void; // Optional add button callback
  moduleId: string; // Unique ID for each module
  deleteModule: (moduleId: string) => void; // Delete handler
  editModule: (moduleId: string) => void; // Edit handler
}

export default function ModuleControlButtons({
  onAdd,
  moduleId,
  deleteModule,
  editModule,
}: ModuleControlButtonsProps) {
  return (
    <div className="d-flex align-items-center gap-2">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3"
      />
      {/*  DELETE ICON - Deletes the module when clicked
       */}
      <FaTrash
        className="text-danger me-2 mb-1"
        style={{ cursor: "pointer" }}
        onClick={() => deleteModule(moduleId)}
        title="Delete Module"
      />

      {/*  GREEN CHECKMARK ICON
       */}
      <FaCheckCircle
        style={{ color: "green", fontSize: "1.2rem", cursor: "pointer" }}
        title="Published"
      />

      {/*THREE DOTS ICON
       */}
      <BsThreeDotsVertical
        style={{ fontSize: "1.2rem", cursor: "pointer", color: "#333" }}
        title="More options"
      />

      {/*  ADD BUTTON
       */}
      {onAdd && (
        <Button
          variant="danger"
          size="sm"
          className="ms-auto"
          onClick={onAdd}
          title="Add Module"
        >
          <BsPlus />
        </Button>
      )}
    </div>
  );
}
