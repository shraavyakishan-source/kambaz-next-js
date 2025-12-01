"use client";

import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as client from "./client";
import { Quiz } from "./types";

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
  const [formData, setFormData] = useState<Partial<Quiz>>({
    _id: quiz?._id,
    title: quiz?.title || "",
    description: quiz?.description || "",
    course: cid,
    points: quiz?.points ?? 20,
    numQuestions: quiz?.numQuestions ?? 0,
    published: quiz?.published ?? false,
    availableDate: quiz?.availableDate || "",
    untilDate: quiz?.untilDate || "",
    dueDate: quiz?.dueDate || "",
    shuffleAnswers: quiz?.shuffleAnswers ?? true,
    multipleAttempts: quiz?.multipleAttempts ?? false,
    showCorrectAnswers: quiz?.showCorrectAnswers || "Never",
    accessCode: quiz?.accessCode || "",
    oneQuestionAtATime: quiz?.oneQuestionAtATime ?? true,
    webcamRequired: quiz?.webcamRequired ?? false,
    lockQuestions: (quiz as any)?.lockQuestions ?? false,
    status: quiz?.status || "Draft",
  });

  useEffect(() => {
    if (quiz) {
      setFormData((prev) => ({ ...prev, ...quiz }));
    }
  }, [quiz]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const name = target.name;

    // For checkboxes
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: target.value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let saved: Quiz;
      if (formData._id) {
        saved = await client.updateQuizForCourse(formData._id!, formData);
      } else {
        saved = await client.createQuizForCourse(cid, formData);
      }
      onSave(saved);
      closeModal();
    } catch (err: any) {
      console.error("Failed to save quiz:", err);
      alert("Failed to save quiz: " + (err?.message || err));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="dueDate"
          value={formData.dueDate || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Available From</Form.Label>
        <Form.Control
          type="datetime-local"
          name="availableDate"
          value={formData.availableDate || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Available Until</Form.Label>
        <Form.Control
          type="datetime-local"
          name="untilDate"
          value={formData.untilDate || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          name="points"
          min={0}
          value={formData.points || 0}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Number of Questions</Form.Label>
        <Form.Control
          type="number"
          name="numQuestions"
          min={0}
          value={formData.numQuestions || 0}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Published"
          name="published"
          checked={!!formData.published}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Shuffle Answers"
          name="shuffleAnswers"
          checked={!!formData.shuffleAnswers}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={closeModal} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}
