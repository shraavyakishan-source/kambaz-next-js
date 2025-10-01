"use client";
import Link from "next/link";
import { Button, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { BsGripVertical, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function Assignments() {
  return (
    <div className="p-3" style={{ maxWidth: "700px" }}>
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
          <Button variant="danger">+Assignment</Button>
        </div>
      </div>
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
          <ListGroup.Item className="d-flex align-items-center">
            <BsGripVertical className="me-2" />
            <IoDocumentTextOutline className="me-2 text-success" size={20} />
            <div className="flex-grow-1">
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link"
              >
                <div className="fw-bold text-danger text-decoration-none">
                  A1
                </div>
              </Link>
              <small className="text-muted">
                <span className="fw-bold text-danger">Multiple Modules</span>
                |Not available until May 6 at 12:00am | <br />
                <span className="text-dark">Due May 13 at 11:59pm</span> | 100
                pts
              </small>
            </div>
            <FaCheckCircle className="text-success ms-2" />
            <Button variant="link" className="text-secondary p-1 ms-2">
              <BsThreeDotsVertical />
            </Button>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex align-items-center">
            <BsGripVertical className="me-2" />
            <IoDocumentTextOutline className="me-2 text-success" size={20} />
            <div className="flex-grow-1">
              <div className="fw-bold text-danger">A2</div>
              <small className="text-muted">
                <span className="fw-bold text-danger">Multiple Modules</span>|
                Not available until May 13 at 12:00am | <br />
                <span className="text-dark">Due May 20 at 11:59pm</span> | 100
                pts
              </small>
            </div>
            <FaCheckCircle className="text-success ms-2" />
            <Button variant="link" className="text-secondary p-1 ms-2">
              <BsThreeDotsVertical />
            </Button>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex align-items-center">
            <BsGripVertical className="me-2" />
            <IoDocumentTextOutline className="me-2 text-success" size={20} />
            <div className="flex-grow-1">
              <div className="fw-bold text-danger">A3</div>
              <small className="text-muted">
                <span className="fw-bold text-danger">Multiple Modules</span>|
                Not available until May 20 at 12:00am | <br />
                <span className="text-dark">Due May 27 at 11:59pm</span> | 100
                pts
              </small>
            </div>
            <FaCheckCircle className="text-success ms-2" />
            <Button variant="link" className="text-secondary p-1 ms-2">
              <BsThreeDotsVertical />
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}
