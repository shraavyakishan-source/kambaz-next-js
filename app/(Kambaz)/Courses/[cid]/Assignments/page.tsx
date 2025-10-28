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
} from "react-bootstrap";
import { BsGripVertical, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import AssignmentEditor from "./AssignmentEditor";
import {
  addAssignment,
  updateAssignment,
  deleteAssignment,
  Assignment,
} from "./reducer";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  const assignments = useSelector((state: RootState) =>
    state.assignmentsReducer.filter((a) => a.course === cid)
  );

  // Modal state
  const [showEditor, setShowEditor] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState<Assignment | null>(
    null
  );

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] =
    useState<Assignment | null>(null);

  const openEditor = (assignment?: Assignment) => {
    setCurrentAssignment(assignment ?? null);
    setShowEditor(true);
  };
  const closeEditor = () => setShowEditor(false);

  const handleSave = (updated: Assignment) => {
    if (updated._id && assignments.some((a) => a._id === updated._id)) {
      dispatch(updateAssignment(updated));
    } else {
      dispatch(addAssignment(updated));
    }
    closeEditor();
  };

  const confirmDelete = (assignment: Assignment) => {
    setAssignmentToDelete(assignment);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete._id));
      setAssignmentToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const cancelDelete = () => {
    setAssignmentToDelete(null);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="p-3" style={{ maxWidth: "700px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "250px" }}>
          <InputGroup.Text className="bg-white">
            <BsSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search..." />
        </InputGroup>
        <div>
          <Button variant="light" className="me-2 border">
            +Group
          </Button>
          <Button variant="danger" onClick={() => openEditor()}>
            +Assignment
          </Button>
        </div>
      </div>

      {/* Assignments List */}
      <div className="border rounded">
        <div className="d-flex align-items-center bg-light p-2 border-bottom">
          <BsGripVertical className="me-2" />
          <strong>ASSIGNMENTS</strong>
          <div className="ms-auto d-flex align-items-center">
            <Button variant="outline-secondary" size="sm">
              40% of Total
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
          {assignments.map((a) => (
            <ListGroup.Item key={a._id} className="d-flex align-items-center">
              <BsGripVertical className="me-2" />
              <IoDocumentTextOutline className="me-2 text-success" size={20} />
              <div
                className="flex-grow-1"
                style={{ cursor: "pointer" }}
                onClick={() => openEditor(a)}
              >
                <span className="wd-assignment-link text-danger fw-bold text-decoration-none">
                  {a.title}
                </span>
                <small className="text-muted d-block">
                  <span className="fw-bold text-danger">Multiple Modules</span>{" "}
                  | Due {a.dueDate ?? "TBD"} | {a.points ?? 100} pts
                </small>
              </div>
              <FaCheckCircle className="text-success ms-2 me-2" />
              <FaTrash
                className="text-danger ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => confirmDelete(a)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      {/* Assignment Editor Modal */}
      <Modal show={showEditor} onHide={closeEditor} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentAssignment?._id ? "Edit Assignment" : "New Assignment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AssignmentEditor
            assignment={currentAssignment ?? undefined}
            cid={cid!}
            closeModal={closeEditor}
            onSave={handleSave}
          />
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the assignment "
          {assignmentToDelete?.title}"?
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
