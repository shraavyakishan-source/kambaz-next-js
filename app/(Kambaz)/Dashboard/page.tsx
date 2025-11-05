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
import { enroll, unenroll } from "../Courses/enrollmentsReducer";
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

interface Enrollment {
  user: string;
  course: string;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/Images/img.jpeg",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);

  if (!currentUser) {
    return (
      <div className="p-4">
        <h3>Please sign in to view your Dashboard.</h3>
      </div>
    );
  }

  // ✅ Use proper type instead of `any`
  const userEnrollments = enrollments.filter(
    (e: Enrollment) => e.user === currentUser._id
  );
  const enrolledCourseIds = userEnrollments.map((e: Enrollment) => e.course);
  const enrolledCourses = courses.filter((c) =>
    enrolledCourseIds.includes(c._id)
  );

  const displayedCourses = showAllCourses ? courses : enrolledCourses;

  const handleAddCourse = () => {
    const newCourse = { ...course, _id: uuidv4(), author: currentUser._id };
    dispatch(addNewCourse(newCourse));
  };

  const handleUpdateCourse = () => {
    dispatch(updateCourse(course));
  };

  const handleDeleteCourse = (id: string) => {
    dispatch(deleteCourse(id));
  };

  const handleEnroll = (courseId: string) => {
    dispatch(enroll({ user: currentUser._id, course: courseId }));
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenroll({ user: currentUser._id, course: courseId }));
  };

  return (
    <div id="wd-dashboard" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Enrollments" : "Show All Courses"}
        </Button>
      </div>

      <h4 className="mb-4">
        Welcome, {currentUser.firstName} {currentUser.lastName} (
        {currentUser.role})
      </h4>

      {currentUser.role === "FACULTY" && (
        <>
          <h5>Instructor Tools (Faculty Only)</h5>
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
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <div className="d-flex mb-2">
            <Button
              className="btn btn-primary me-2"
              onClick={handleAddCourse}
              id="wd-add-new-course-click"
            >
              Add
            </Button>
            <Button
              className="btn btn-warning me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </Button>
          </div>
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Enrolled Courses"} (
        {displayedCourses.length})
      </h2>
      <hr />

      <Row xs={1} md={3} className="g-4">
        {displayedCourses.map((c: Course) => {
          const isEnrolled = enrolledCourseIds.includes(c._id);

          return (
            <Col key={c._id}>
              <Card style={{ width: "290px" }}>
                <Link
                  href={
                    isEnrolled || currentUser.role === "FACULTY"
                      ? `/Courses/${c._id}/Home`
                      : "/Dashboard"
                  }
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

                <div className="d-flex justify-content-between flex-wrap p-2">
                  {(currentUser.role === "STUDENT" ||
                    currentUser.role === "FACULTY") &&
                    (isEnrolled ? (
                      <Button
                        variant="danger"
                        onClick={() => handleUnenroll(c._id)}
                        className="me-2 mb-2"
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => handleEnroll(c._id)}
                        className="me-2 mb-2"
                      >
                        Enroll
                      </Button>
                    ))}

                  {currentUser.role === "FACULTY" && (
                    <div className="d-flex flex-wrap gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        href={`/Courses/${c._id}/Home`}
                      >
                        Go
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => setCourse(c)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteCourse(c._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
