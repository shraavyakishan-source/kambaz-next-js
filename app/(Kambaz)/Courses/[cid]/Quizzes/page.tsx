"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  ListGroup,
  Modal,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";

import { BsGripVertical, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

import Link from "next/link";
import QuizEditor from "./QuizEditor";
import * as client from "./client";
import { Quiz } from "./types";

import { useSelector } from "react-redux";
import type { RootState } from "..//../../store"; // adjust path if needed

// Format date helper
function format(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const canEdit =
    currentUser?.role === "ADMIN" || currentUser?.role === "FACULTY";

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const [showEditor, setShowEditor] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await client.fetchQuizzesForCourse(cid!);
      data.sort((a, b) => {
        const ad = a.availableDate ? new Date(a.availableDate).getTime() : 0;
        const bd = b.availableDate ? new Date(b.availableDate).getTime() : 0;
        return ad - bd;
      });
      setQuizzes(data);
      setLoading(false);
    };
    load();
  }, [cid]);

  const openEditor = (quiz?: Quiz) => {
    setCurrentQuiz(quiz ?? null);
    setShowEditor(true);
  };

  const closeEditor = () => {
    setCurrentQuiz(null);
    setShowEditor(false);
  };

  const handleSave = (savedQuiz: Quiz) => {
    if (savedQuiz._id && quizzes.some((q) => q._id === savedQuiz._id)) {
      setQuizzes((prev) =>
        prev.map((q) => (q._id === savedQuiz._id ? savedQuiz : q))
      );
    } else {
      setQuizzes((prev) => [...prev, savedQuiz]);
      router.push(`/Courses/${cid}/Quizzes/${savedQuiz._id}/QuizDetails`);
    }
    closeEditor();
  };

  const confirmDelete = (quiz: Quiz) => {
    setQuizToDelete(quiz);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!quizToDelete) return;
    await client.deleteQuizForCourse(quizToDelete._id);
    setQuizzes((prev) => prev.filter((q) => q._id !== quizToDelete._id));
    setShowDeleteConfirm(false);
  };

  const handleTogglePublish = async (qid: string) => {
    const updated = await client.togglePublishQuiz(qid);
    setQuizzes((prev) =>
      prev.map((q) => (q._id === updated._id ? updated : q))
    );
  };

  if (loading) return <p>Loading quizzes...</p>;
  if (!currentUser) return <p>Loading user info...</p>;

  return (
    <div className="p-3" style={{ maxWidth: "700px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "250px" }}>
          <InputGroup.Text className="bg-white">
            <BsSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search for Quiz" />
        </InputGroup>

        {canEdit && (
          <Button variant="danger" onClick={() => openEditor()}>
            + Quiz
          </Button>
        )}
      </div>

      {/* Quizzes List */}
      <div className="border rounded">
        <div className="d-flex align-items-center bg-light p-2 border-bottom">
          <BsGripVertical className="me-2" />
          <strong>Assignment Quizzes</strong>
        </div>

        <ListGroup variant="flush">
          {quizzes.map((q) => (
            <ListGroup.Item key={q._id}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2" />
                  <IoDocumentTextOutline
                    className="me-2 text-success"
                    size={20}
                  />
                  <Link
                    href={`/Courses/${cid}/Quizzes/${q._id}/QuizDetails`}
                    className="text-decoration-none"
                  >
                    <span className="text-danger fw-bold">{q.title}</span>
                  </Link>
                </div>

                <div className="d-flex align-items-center">
                  {canEdit && (
                    <>
                      {q.published ? (
                        <FaCheckCircle
                          className="text-success me-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleTogglePublish(q._id)}
                        />
                      ) : (
                        <span
                          style={{ cursor: "pointer" }}
                          className="text-secondary fs-5 me-3"
                          onClick={() => handleTogglePublish(q._id)}
                        >
                          🚫
                        </span>
                      )}

                      <Dropdown align="end">
                        <Dropdown.Toggle
                          as="button"
                          className="btn btn-link text-secondary p-0"
                          bsPrefix="custom-toggle"
                        >
                          <BsThreeDotsVertical />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => openEditor(q)}>
                            ✏️ Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => confirmDelete(q)}>
                            🗑 Delete
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleTogglePublish(q._id)}
                          >
                            {q.published ? "📤 Unpublish" : "📢 Publish"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  )}
                </div>
              </div>

              {/* Only show details if they exist */}
              {(q.availableDate || q.dueDate || q.points || q.numQuestions) && (
                <div className="text-muted small ms-4 mt-1">
                  {[
                    q.availableDate
                      ? `Available until ${format(q.availableDate)}`
                      : null,
                    q.dueDate ? `Due ${format(q.dueDate)}` : null,
                    q.points != null ? `${q.points} pts` : null,
                    q.numQuestions != null
                      ? `${q.numQuestions} Questions`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      {/* Quiz Editor Modal */}
      <Modal show={showEditor} onHide={closeEditor} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentQuiz?._id ? "Edit Quiz" : "New Quiz"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuizEditor
            quiz={currentQuiz ?? undefined}
            cid={cid!}
            closeModal={closeEditor}
            onSave={handleSave}
          />
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{quizToDelete?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
