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
import * as client from "../Courses/client";

import type { Course } from "../types/Course";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
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

  // ✅ Fetch current user's courses when logged in
  useEffect(() => {
    const fetchCourses = async () => {
      if (!currentUser) return;
      try {
        const myCourses = await client.findMyCourses();
        dispatch(setCourses(myCourses));
      } catch (error) {
        console.error("❌ Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, [currentUser, dispatch]);

  if (!currentUser) {
    return (
      <div className="p-4">
        <h3>Please sign in to view your Dashboard.</h3>
      </div>
    );
  }

  const displayedCourses = courses; // for now, backend handles filtering

  // ✅ Add a new course
  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse] as Course[])); // ✅ cast fixes TS issue
      setCourse({ ...blankCourse });
    } catch (error) {
      console.error("❌ Failed to add course:", error);
    }
  };

  // ✅ Delete a course
  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
    } catch (error) {
      console.error("❌ Failed to delete course:", error);
    }
  };

  // ✅ Update a course
  const onUpdateCourse = async () => {
    try {
      const updated = await client.updateCourse(course);
      dispatch(
        setCourses(
          courses.map((c) => (c._id === updated._id ? updated : c)) as Course[]
        )
      );
      setCourse({ ...blankCourse });
    } catch (error) {
      console.error("❌ Failed to update course:", error);
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

                {isFaculty && (
                  <div className="d-flex flex-wrap gap-2 p-2">
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
                        onDeleteCourse(c._id); // ✅ correctly passes course ID
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
