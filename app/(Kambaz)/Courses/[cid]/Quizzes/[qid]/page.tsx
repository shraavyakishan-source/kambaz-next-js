"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { Tabs, Tab, Button } from "react-bootstrap";
import {
  updateQuiz,
  togglePublish,
  QuizType,
  AssignmentGroup,
  Quiz,
} from "../reducer";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function QuizDetailsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const quiz = useSelector((state: RootState) =>
    state.quizzesReducer.find((q) => q._id === qid)
  );

  const [activeTab, setActiveTab] = useState("details");

  // 🟢 Form states
  const [title, setTitle] = useState(quiz?.title || "");
  const [description, setDescription] = useState(quiz?.description || "");
  const [quizType, setQuizType] = useState(quiz?.quizType || "Graded Quiz");
  const [assignmentGroup, setAssignmentGroup] = useState(
    quiz?.assignmentGroup || "Quizzes"
  );
  const [points, setPoints] = useState(quiz?.points || 0);
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [timeLimit, setTimeLimit] = useState(20);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState("Never");
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestions, setLockQuestions] = useState(false);
  const [dueDate, setDueDate] = useState(quiz?.dueDate || "");
  const [availableDate, setAvailableDate] = useState(quiz?.availableDate || "");
  const [untilDate, setUntilDate] = useState(quiz?.untilDate || "");

  if (!quiz) {
    return (
      <div className="p-4 text-center text-muted">
        <h5>Quiz not found</h5>
      </div>
    );
  }

  // 🟢 Handle Save
  const handleSave = (publish: boolean = false) => {
    const updatedQuiz = {
      ...quiz,
      title,
      description,
      quizType,
      assignmentGroup,
      points,
      shuffleAnswers,
      timeLimit,
      multipleAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestions,
      dueDate,
      availableDate,
      untilDate,
      //published: publish,
    };
    //Will publish the quiz once save&publish is clicked
    dispatch(updateQuiz(updatedQuiz));

    if (publish) {
      dispatch(togglePublish(quiz._id));
      router.push(`/Courses/${cid}/Quizzes`);
      return;
    }
    router.push(`/Courses/${cid}/Quizzes/${qid}/QuizDetails`);
  };

  // 🟢 Handle Cancel
  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-danger fw-bold">{title}</h3>
        <div className="d-flex align-items-center gap-3">
          <span className="text-secondary">
            Points: <strong>{points}</strong>
          </span>
          <span>{quiz.published ? "✅ Published" : "🚫 Not Published"}</span>
          <Button variant="outline-secondary" size="sm">
            ⋮
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "details")}
        className="mb-3"
      >
        {/* DETAILS TAB */}
        <Tab eventKey="details" title="Details">
          <div className="container py-4">
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="wd-name" className="form-label fw-bold">
                Title
              </label>
              <input
                id="wd-name"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label fw-bold">Quiz Instructions</label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline"],
                    ["link", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                  ],
                }}
              />
            </div>

            {/* Fields */}
            <form>
              <div className="row g-3 align-items-start">
                {/* Quiz Type */}
                <div className="col-md-4 text-md-end">
                  <label className="form-label">Quiz Type</label>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select w-50"
                    value={quizType}
                    onChange={(e) => setQuizType(e.target.value as QuizType)} // ✅ cast
                  >
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                  </select>
                </div>

                {/* Assignment Group */}
                <div className="col-md-4 text-md-end">
                  <label className="form-label">Assignment Group</label>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select w-50"
                    value={assignmentGroup}
                    onChange={(e) =>
                      setAssignmentGroup(e.target.value as AssignmentGroup)
                    } // ✅ cast
                  >
                    <option value="Quizzes">Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                  </select>
                </div>

                {/* Shuffle Answers */}
                <div className="col-md-4 text-md-end">
                  <label className="form-label">Shuffle Answers</label>
                </div>

                <div className="col-md-8 d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={shuffleAnswers}
                    onChange={(e) => setShuffleAnswers(e.target.checked)}
                    className="form-check-input me-2"
                  />
                  <span>{shuffleAnswers ? "Enabled" : "Disabled"}</span>
                </div>

                {/* Time Limit */}
                <div className="col-md-4 text-md-end">
                  <label className="form-label">Time Limit</label>
                </div>

                <div className="col-md-8 d-flex align-items-center gap-3">
                  {/* Checkbox */}
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={timeLimit > 0}
                      onChange={
                        (e) =>
                          e.target.checked ? setTimeLimit(30) : setTimeLimit(0) // default to 30 min
                      }
                    />
                    <label className="form-check-label">
                      Enable Time Limit
                    </label>
                  </div>

                  {/* Input field—visible only when enabled */}
                  {timeLimit > 0 && (
                    <input
                      type="number"
                      className="form-control w-25"
                      value={timeLimit}
                      min={1}
                      onChange={(e) => setTimeLimit(Number(e.target.value))}
                    />
                  )}
                </div>

                {/* Multiple Attempts */}
                <div className="col-md-4 text-md-end">
                  <label className="form-label">Multiple Attempts</label>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select w-25"
                    value={multipleAttempts ? "Yes" : "No"}
                    onChange={(e) =>
                      setMultipleAttempts(e.target.value === "Yes")
                    }
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                {/* Show Correct Answers */}
                <div className="col-md-4 text-md-end">
                  <label className="form-label">Show Correct Answers</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control w-50"
                    value={showCorrectAnswers}
                    onChange={(e) => setShowCorrectAnswers(e.target.value)}
                  />
                </div>

                {/* Access Code */}
                <div className="col-md-4 text-md-end">
                  <label className="form-label">Access Code</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control w-50"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Leave blank for none"
                  />
                </div>

                {/* One Question at a Time */}
                <div className="col-md-4 text-md-end">
                  <label className="form-label">One Question at a Time</label>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select w-25"
                    value={oneQuestionAtATime ? "Yes" : "No"}
                    onChange={(e) =>
                      setOneQuestionAtATime(e.target.value === "Yes")
                    }
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>

                {/* Webcam Required */}
                <div className="col-md-4 text-md-end">
                  <label className="form-label">Webcam Required</label>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select w-25"
                    value={webcamRequired ? "Yes" : "No"}
                    onChange={(e) =>
                      setWebcamRequired(e.target.value === "Yes")
                    }
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                {/* Lock Questions */}
                <div className="col-md-4 text-md-end">
                  <label className="form-label">
                    Lock Questions After Answering
                  </label>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select w-25"
                    value={lockQuestions ? "Yes" : "No"}
                    onChange={(e) => setLockQuestions(e.target.value === "Yes")}
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                {/* Dates */}
                <div className="col-md-4 text-md-end">
                  <label className="form-label">Due Date</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="datetime-local"
                    className="form-control w-50"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <div className="col-md-4 text-md-end">
                  <label className="form-label">Available Date</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="datetime-local"
                    className="form-control w-50"
                    value={availableDate}
                    onChange={(e) => setAvailableDate(e.target.value)}
                  />
                </div>

                <div className="col-md-4 text-md-end">
                  <label className="form-label">Until Date</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="datetime-local"
                    className="form-control w-50"
                    value={untilDate}
                    onChange={(e) => setUntilDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 d-flex justify-content-end gap-2">
                <Button variant="outline-secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => handleSave(false)}>
                  Save
                </Button>
                <Button variant="success" onClick={() => handleSave(true)}>
                  Save & Publish
                </Button>
              </div>
            </form>
          </div>
        </Tab>

        {/* QUESTIONS TAB */}
        <Tab eventKey="questions" title="Questions">
          <div className="p-3">
            <p className="text-muted">No questions yet.</p>
            <Button variant="danger" size="sm">
              + Add Question
            </Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
