"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { Button, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { BsGripVertical, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function Assignments() {
  const { cid } = useParams(); // course ID from the URL, e.g. RS101
  const assignments = db.assignments.filter((a: any) => a.course === cid);

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
          <Button variant="danger">+Assignment</Button>
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
          {assignments.map((a: any) => (
            <ListGroup.Item key={a._id} className="d-flex align-items-center">
              <BsGripVertical className="me-2" />
              <IoDocumentTextOutline className="me-2 text-success" size={20} />
              <div className="flex-grow-1">
                {/* Link encodes course + assignment ID */}
                <Link
                  href={`/Courses/${cid}/Assignments/${a._id}`}
                  className="wd-assignment-link text-danger fw-bold text-decoration-none"
                >
                  {a.title}
                </Link>
                <small className="text-muted d-block">
                  <span className="fw-bold text-danger">Multiple Modules</span>{" "}
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
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
