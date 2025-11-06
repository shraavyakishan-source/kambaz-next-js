"use client";
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Quiz } from "./reducer";

interface QuizEditorProps {
  quiz?: Quiz;
  cid: string;
  closeModal: () => void;
  onSave: (quiz: Quiz) => void;
}

export default function QuizEditor({
  quiz,
  cid,
  closeModal,
  onSave,
}: QuizEditorProps) {
  const [formData, setFormData] = useState<Quiz>({
    _id: quiz?._id || "",
    title: quiz?.title || "",
    dueDate: quiz?.dueDate || "",
    points: quiz?.points || 10,
    numQuestions: quiz?.numQuestions || 0,
    course: cid,
    status: quiz?.status || "Available",
  });

  useEffect(() => {
    if (quiz) setFormData(quiz);
  }, [quiz]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    closeModal();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Title */}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Due Date */}
      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          placeholder="e.g. Dec 7 at 1pm"
        />
      </Form.Group>

      {/* Points */}
      <Form.Group className="mb-3">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          name="points"
          value={formData.points}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Number of Questions */}
      <Form.Group className="mb-3">
        <Form.Label>Number of Questions</Form.Label>
        <Form.Control
          type="number"
          name="numQuestions"
          value={formData.numQuestions}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Status */}
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Available">Available</option>
          <option value="Closed">Closed</option>
          <option value="Not Available">Not Available</option>
        </Form.Select>
      </Form.Group>

      {/* Buttons */}
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={closeModal} className="me-2">
          Cancel
        </Button>
        <Button variant="danger" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}
