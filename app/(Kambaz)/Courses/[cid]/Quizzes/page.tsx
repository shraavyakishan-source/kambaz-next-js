"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import {
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { BsGripVertical, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import QuizEditor from "./QuizEditor";
import {
  addQuiz,
  updateQuiz,
  deleteQuiz,
  togglePublish,
  Quiz,
} from "./reducer";
import Link from "next/link";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  // Filter quizzes for this course
  const quizzes = useSelector((state: RootState) =>
    state.quizzesReducer
      .filter((q) => q.course === cid)
      .sort((a, b) => {
        const dateA = a.availableDate ? new Date(a.availableDate).getTime() : 0;
        const dateB = b.availableDate ? new Date(b.availableDate).getTime() : 0;
        return dateA - dateB; // earliest first
      })
  );

  const [showEditor, setShowEditor] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);

  // 🟢 Open/close editor modal
  const openEditor = (quiz?: Quiz) => {
    setCurrentQuiz(quiz ?? null);
    setShowEditor(true);
  };
  const closeEditor = () => setShowEditor(false);

  // 🟢 Save quiz (either add or update)
  const handleSave = (updated: Quiz) => {
    if (updated._id && quizzes.some((q) => q._id === updated._id)) {
      dispatch(updateQuiz(updated));
    } else {
      dispatch(addQuiz({ ...updated, course: cid! }));
    }
    closeEditor();
  };

  // 🟢 Confirm delete modal
  const confirmDelete = (quiz: Quiz) => {
    setQuizToDelete(quiz);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (quizToDelete) {
      dispatch(deleteQuiz(quizToDelete._id));
      setQuizToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const cancelDelete = () => {
    setQuizToDelete(null);
    setShowDeleteConfirm(false);
  };

  // 🟢 Toggle publish/unpublish quiz
  const handleTogglePublish = (quizId: string) => {
    dispatch(togglePublish(quizId));
  };

  return (
    <div className="p-3" style={{ maxWidth: "700px" }}>
      {/* 🔍 Header with search + add button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "250px" }}>
          <InputGroup.Text className="bg-white">
            <BsSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search for Quiz" />
        </InputGroup>
        <Button variant="danger" onClick={() => openEditor()}>
          + Quiz
        </Button>
      </div>

      {/* 📋 Quizzes List */}
      <div className="border rounded">
        <div className="d-flex align-items-center bg-light p-2 border-bottom">
          <BsGripVertical className="me-2" />
          <strong>Assignment Quizzes</strong>
          <div className="ms-auto d-flex align-items-center">
            <Button variant="outline-secondary" size="sm">
              30% of Total
            </Button>
            <Button variant="link" className="text-secondary p-1 ms-2">
              <BsThreeDotsVertical />
            </Button>
          </div>
        </div>

        <ListGroup
          variant="flush"
          className="border-start border-3 border-success"
        >
          {quizzes.map((q) => (
            <ListGroup.Item
              key={q._id}
              className="d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center flex-grow-1">
                <BsGripVertical className="me-2" />
                <IoDocumentTextOutline
                  className="me-2 text-success"
                  size={20}
                />
                <Link
                  href={`/Courses/${cid}/Quizzes/${q._id}/QuizDetails`}
                  className="flex-grow-1 text-decoration-none"
                  style={{ cursor: "pointer" }}
                >
                  <span className="text-danger fw-bold">{q.title}</span>
                  <small className="text-muted d-block">
                    {q.published
                      ? q.availableDate
                        ? `Available until ${q.untilDate || "TBD"}`
                        : "Not available"
                      : "Not published"}
                    {" | "}
                    {q.dueDate ? `Due ${q.dueDate}` : "Due TBD"} {" | "}
                    {q.points ?? 10} pts | {q.numQuestions ?? 0} Questions
                  </small>
                </Link>

                {/* ✅ Published icon */}
                {q.published ? (
                  <FaCheckCircle
                    className="text-success ms-2 me-2"
                    title="Published"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTogglePublish(q._id)}
                  />
                ) : (
                  <span
                    role="button"
                    title="Unpublished"
                    className="text-secondary fs-5 ms-2 me-2"
                    onClick={() => handleTogglePublish(q._id)}
                  >
                    🚫
                  </span>
                )}
              </div>

              {/* ⚙️ Actions Dropdown */}
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
                  <Dropdown.Item onClick={() => handleTogglePublish(q._id)}>
                    {q.published ? "📤 Unpublish" : "📢 Publish"}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => alert("Copy quiz coming soon!")}
                  >
                    📋 Copy
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => alert("Sort feature coming soon!")}
                  >
                    ↕️ Sort
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      {/* 📝 Quiz Editor Modal */}
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

      {/* ❌ Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the quiz &quot;
          {quizToDelete?.title}&quot;?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
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
