import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Assignment, addAssignment } from "./reducer";

interface AssignmentEditorProps {
  cid: string;
  closeModal: () => void;
}

export default function AssignmentEditor({
  cid,
  closeModal,
}: AssignmentEditorProps) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  const handleSave = () => {
    const newAssignment: Assignment = {
      _id: uuidv4(),
      course: cid,
      title,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
    };

    dispatch(addAssignment(newAssignment));
    closeModal(); // close modal instead of router.push
  };

  const handleCancel = () => closeModal();

  return (
    <div className="p-3">
      {/* same FormControls for title, description, points, dates */}
      <Button variant="success" className="me-2" onClick={handleSave}>
        Save
      </Button>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
}
function uuidv4(): string {
  throw new Error("Function not implemented.");
}
