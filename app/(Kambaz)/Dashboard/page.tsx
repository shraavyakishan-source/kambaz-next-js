"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import type { RootState } from "../store";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department?: string;
  credits?: number;
  description: string;
  author?: string;
  image?: string;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/Images/img.jpeg",
    description: "New Description",
  });

  const handleAddCourse = () => {
    const newCourse = { ...course, _id: uuidv4() };
    dispatch(addNewCourse(newCourse));
  };

  const handleUpdateCourse = () => {
    dispatch(updateCourse(course));
  };

  const handleDeleteCourse = (id: string) => {
    dispatch(deleteCourse(id));
  };

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h5>
        New Course
        <Button
          className="btn btn-primary float-end"
          onClick={handleAddCourse}
          id="wd-add-new-course-click"
        >
          Add
        </Button>
        <Button
          className="btn btn-warning float-end me-2"
          onClick={handleUpdateCourse}
          id="wd-update-course-click"
        >
          Update
        </Button>
      </h5>
      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        placeholder="Course Name"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        className="mb-2"
        placeholder="Course Description"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <Row xs={1} md={3} className="g-4">
        {courses.map((c: Course) => (
          <Col key={c._id}>
            <Card style={{ width: "290px" }}>
              <Link
                href={`/Courses/${c._id}/Home`}
                className="text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src={c.image || "/Images/img.jpeg"}
                  width="100%"
                  height={140}
                />
                <CardBody>
                  <CardTitle className="text-truncate">{c.name}</CardTitle>
                  <CardText
                    className="overflow-hidden"
                    style={{ height: "80px" }}
                  >
                    {c.description}
                  </CardText>
                </CardBody>
              </Link>

              <div className="p-2">
                <Button
                  variant="primary"
                  className="me-2"
                  href={`/Courses/${c._id}/Home`}
                >
                  Go
                </Button>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setCourse(c);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteCourse(c._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
