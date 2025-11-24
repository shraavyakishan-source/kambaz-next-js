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
import type { RootState } from "../store";
import type { Course } from "../types/Course";
import {
  fetchAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  enroll as enrollAPI,
  unenroll as unenrollAPI,
} from "../Courses/client";

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
  const [loading, setLoading] = useState(true);

  // Fetch all courses on mount
  useEffect(() => {
    if (!currentUser) return;
    const loadCourses = async () => {
      try {
        const data = await fetchAllCourses();
        dispatch(setCourses(data));
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, [dispatch, currentUser]);

  if (!currentUser)
    return (
      <div className="p-4">
        <h3>Please sign in to view your Dashboard.</h3>
      </div>
    );
  if (loading) return <div className="p-4">Loading courses...</div>;

  const userEnrollments = enrollments.filter((e) => e.user === currentUser._id);
  const enrolledCourseIds = userEnrollments.map((e) => e.course);
  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c) => enrolledCourseIds.includes(c._id));

  const canEdit =
    currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  // Add a new course
  const onAddNewCourse = async () => {
    if (!currentUser) return;
    const newCourse: Course = { ...course, _id: crypto.randomUUID() };
    try {
      const saved = await createCourse(newCourse);
      dispatch(setCourses([...courses, saved]));
      setCourse({ ...blankCourse });
    } catch (err) {
      console.error("Failed to create course", err);
    }
  };

  // Update a course
  const onUpdateCourse = async () => {
    try {
      if (!course._id) return;
      const updated = await updateCourse(course);
      dispatch(
        setCourses(courses.map((c) => (c._id === updated._id ? updated : c)))
      );
      setCourse({ ...blankCourse });
    } catch (err) {
      console.error("Failed to update course", err);
    }
  };

  // Delete a course
  const onDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
    } catch (err) {
      console.error("Failed to delete course", err);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollAPI(courseId);
    } catch (err) {
      console.error("Enroll failed", err);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await unenrollAPI(courseId);
    } catch (err) {
      console.error("Unenroll failed", err);
    }
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

      {canEdit && (
        <>
          <h5>Instructor/Admin Tools</h5>
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
          <div className="d-flex mb-2 gap-2">
            <Button variant="primary" onClick={onAddNewCourse}>
              Add
            </Button>
            <Button variant="secondary" onClick={onUpdateCourse}>
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

                  {canEdit && (
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
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDeleteCourse(c._id)}
                      >
                        Delete
                      </Button>
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
