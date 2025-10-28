"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { addAssignment, updateAssignment, Assignment } from "./reducer";

interface AssignmentEditorProps {
  cid: string;
  assignment?: Assignment; // optional for editing
  closeModal: () => void;
  onSave: (updatedAssignment: Assignment) => void;
}

export default function AssignmentEditor({
  cid,
  assignment,
  closeModal,
}: AssignmentEditorProps) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(assignment?.title || "");
  const [description, setDescription] = useState(assignment?.description || "");
  const [points, setPoints] = useState(assignment?.points || 100);
  const [dueDate, setDueDate] = useState(assignment?.dueDate || "");
  const [availableFrom, setAvailableFrom] = useState(
    assignment?.availableFrom || ""
  );
  const [availableUntil, setAvailableUntil] = useState(
    assignment?.availableUntil || ""
  );

  // Update state if the assignment prop changes (important when editing different items)
  useEffect(() => {
    setTitle(assignment?.title || "");
    setDescription(assignment?.description || "");
    setPoints(assignment?.points || 100);
    setDueDate(assignment?.dueDate || "");
    setAvailableFrom(assignment?.availableFrom || "");
    setAvailableUntil(assignment?.availableUntil || "");
  }, [assignment]);

  const handleSave = () => {
    if (!title) return alert("Please enter a title");

    const newOrUpdatedAssignment: Assignment = {
      _id: assignment?._id || uuidv4(),
      course: cid,
      title,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
    };

    if (assignment?._id) {
      dispatch(updateAssignment(newOrUpdatedAssignment)); // edit existing
    } else {
      dispatch(addAssignment(newOrUpdatedAssignment)); // add new
    }

    closeModal();
  };

  const handleCancel = () => closeModal();

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter assignment name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Assignment Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value) || 0)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Assign</Form.Label>
        <Row className="g-2">
          <Col>
            <Form.Control
              type="date"
              placeholder="Due"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Row className="g-2">
          <Col>
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="date"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Until</Form.Label>
            <Form.Control
              type="date"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Form>
  );
}
