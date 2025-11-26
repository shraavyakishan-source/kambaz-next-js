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
  fetchEnrollments,
  createCourse,
  updateCourse,
  deleteCourse,
  enroll as enrollAPI,
  unenroll as unenrollAPI,
} from "../Courses/client";

import {
  addEnrollment,
  removeEnrollment,
  setEnrollments,
} from "../Courses/enrollmentsReducer";

export default function Dashboard() {
  const dispatch = useDispatch();

  const courses = useSelector((s: RootState) => s.coursesReducer.courses);
  const enrollments = useSelector(
    (s: RootState) => s.enrollmentsReducer.enrollments
  );
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  );

  const [loading, setLoading] = useState(true);
  const [showAllCourses, setShowAllCourses] = useState(false);

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

  // ------------------------------------
  // LOAD DATA FROM DATABASE
  // ------------------------------------
  useEffect(() => {
    if (!currentUser) return;

    const load = async () => {
      try {
        setLoading(true);

        const list = await fetchAllCourses();
        dispatch(setCourses(list));

        const enrs = await fetchEnrollments();
        dispatch(setEnrollments(enrs));
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [currentUser, dispatch]);

  // ------------------------------------
  // SAFE USER CHECKS
  // ------------------------------------
  const userId = currentUser?._id ?? "";

  const userEnrollments = enrollments.filter((e) => e.user === userId);
  const enrolledCourseIds = new Set(userEnrollments.map((e) => e.course));

  const canEdit =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c) => enrolledCourseIds.has(c._id));

  // ------------------------------------
  // CRUD + ENROLLMENT ACTIONS
  // ------------------------------------
  const onAddNewCourse = async () => {
    try {
      const saved = await createCourse(course);
      dispatch(setCourses([...courses, saved]));
      setCourse({ ...blankCourse });
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  const onUpdateCourse = async () => {
    if (!course._id) return;

    try {
      const saved = await updateCourse(course);
      dispatch(
        setCourses(courses.map((c) => (c._id === saved._id ? saved : c)))
      );
      setCourse({ ...blankCourse });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollAPI(courseId);
      dispatch(addEnrollment({ user: userId, course: courseId }));
    } catch (err) {
      console.error("Enroll error:", err);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await unenrollAPI(courseId);
      dispatch(removeEnrollment({ user: userId, course: courseId }));
    } catch (err) {
      console.error("Unenroll error:", err);
    }
  };

  // ------------------------------------
  // UI
  // ------------------------------------
  if (!currentUser)
    return <div className="p-4">Please sign in to view dashboard.</div>;

  return (
    <div className="p-4" id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Dashboard</h1>

        <Button
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Courses" : "Show All Courses"}
        </Button>
      </div>

      <h4 className="mb-4">
        Welcome, {currentUser?.firstName} {currentUser?.lastName} (
        {currentUser?.role})
      </h4>

      {canEdit && (
        <>
          <h5>Instructor / Admin Tools</h5>

          <FormControl
            className="mb-2"
            value={course.name}
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />

          <FormControl
            className="mb-2"
            value={course.description}
            placeholder="Course Description"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />

          <div className="d-flex gap-2 mb-3">
            <Button onClick={onAddNewCourse} variant="primary">
              Add
            </Button>
            <Button onClick={onUpdateCourse} variant="secondary">
              Update
            </Button>
          </div>
        </>
      )}

      <h2>
        {showAllCourses ? "All Courses" : "My Enrolled Courses"} (
        {displayedCourses.length})
      </h2>
      <hr />

      <Row xs={1} md={3} className="g-4">
        {displayedCourses.map((c) => {
          const isEnrolled = enrolledCourseIds.has(c._id);

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
                    height={140}
                  />
                  <CardBody>
                    <CardTitle>{c.name}</CardTitle>
                    <CardText style={{ maxHeight: "70px", overflow: "hidden" }}>
                      {c.description}
                    </CardText>
                  </CardBody>
                </Link>

                <div className="d-flex gap-2 p-2 flex-wrap">
                  {showAllCourses &&
                    (isEnrolled ? (
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
                    ))}

                  {canEdit && (
                    <>
                      <Button
                        href={`/Courses/${c._id}/Home`}
                        variant="primary"
                        size="sm"
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
