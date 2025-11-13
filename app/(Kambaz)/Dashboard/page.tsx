"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
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
import { setCourses } from "../Courses/reducer";
import { enroll, unenroll } from "../Courses/enrollmentsReducer"; // frontend-only Redux actions
import type { RootState } from "../store";
import type { Course } from "../types/Course";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const blankCourse: Course = {
    _id: "",
    name: "",
    number: "",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    description: "",
    image: "/Images/img.jpeg",
  };

  const [course, setCourse] = useState<Course>({ ...blankCourse });
  const [showAllCourses, setShowAllCourses] = useState(false);

  // ✅ Redux enrollments for the current user
  const userEnrollments = enrollments.filter(
    (e) => e.user === currentUser?._id
  );
  const enrolledCourseIds = userEnrollments.map((e) => e.course);

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c) => enrolledCourseIds.includes(c._id));

  if (!currentUser) {
    return (
      <div className="p-4">
        <h3>Please sign in to view your Dashboard.</h3>
      </div>
    );
  }

  // ✅ Add a new course
  const onAddNewCourse = () => {
    const newCourse = {
      ...course,
      _id: crypto.randomUUID(),
      author: currentUser._id,
    };
    dispatch(setCourses([...courses, newCourse]));
    setCourse({ ...blankCourse });
  };

  // ✅ Delete a course
  const onDeleteCourse = (courseId: string) => {
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  // ✅ Update a course
  const onUpdateCourse = () => {
    dispatch(
      setCourses(courses.map((c) => (c._id === course._id ? course : c)))
    );
    setCourse({ ...blankCourse });
  };

  // ✅ Frontend-only enroll/unenroll
  const handleEnroll = (courseId: string) => {
    if (!currentUser || !currentUser._id) return;
    dispatch(enroll({ user: currentUser._id, course: courseId }));
  };

  const handleUnenroll = (courseId: string) => {
    if (!currentUser || !currentUser._id) return;
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
            <button
              onClick={onAddNewCourse}
              className="btn btn-primary float-end me-2"
              id="wd-add-new-course-click"
            >
              Add
            </button>
            <button
              onClick={onUpdateCourse}
              className="btn btn-secondary float-end"
              id="wd-update-course-click"
            >
              Update
            </button>
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
          const isFaculty = currentUser.role === "FACULTY";
          const isEnrolled = enrolledCourseIds.includes(c._id);

          return (
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

                <div className="d-flex flex-wrap gap-2 p-2">
                  {!isFaculty && (
                    <>
                      {isEnrolled ? (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleUnenroll(c._id)}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleEnroll(c._id)}
                        >
                          Enroll
                        </Button>
                      )}
                    </>
                  )}

                  {isFaculty && (
                    <>
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
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={(event) => {
                          event.preventDefault();
                          onDeleteCourse(c._id);
                        }}
                      >
                        Delete
                      </button>
                    </>
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
