"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Tabs, Tab, Button } from "react-bootstrap";

export default function QuizDetailsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const quiz = useSelector((state: RootState) =>
    state.quizzesReducer.find((q) => q._id === qid)
  );

  const [activeTab, setActiveTab] = useState("details");

  if (!quiz) {
    return (
      <div className="p-4 text-center text-muted">
        <h5>Quiz not found</h5>
      </div>
    );
  }

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-danger fw-bold">{quiz.title}</h3>
        <div className="d-flex align-items-center gap-3">
          <span className="text-secondary">
            Points: <strong>{quiz.points ?? 0}</strong>
          </span>
          <span>{quiz.published ? "✅ Published" : "🚫 Not Published"}</span>
          <Button variant="outline-secondary" size="sm">
            ⋮
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "details")}
        className="mb-3"
      >
        <Tab eventKey="details" title="Details">
          <div className="p-3">
            <p>
              <strong>Due Date:</strong> {quiz.dueDate ?? "TBD"}
            </p>
            <p>
              <strong>Status:</strong> {quiz.status ?? "Available"}
            </p>
            <p>
              <strong>Number of Questions:</strong> {quiz.numQuestions ?? 0}
            </p>
            <p>
              <strong>Course ID:</strong> {quiz.course}
            </p>
          </div>
        </Tab>

        <Tab eventKey="questions" title="Questions">
          <div className="p-3">
            <p className="text-muted">No questions yet.</p>
            <Button variant="danger" size="sm">
              + Add Question
            </Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
