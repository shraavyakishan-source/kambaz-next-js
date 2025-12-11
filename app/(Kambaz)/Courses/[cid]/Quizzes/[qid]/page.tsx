"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tabs, Tab, Button } from "react-bootstrap";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { deleteQuestion } from "../../Quizzes/client";
import { Question } from "../../Quizzes/types";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function QuizDetailsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    async function loadQuestions() {
      const res = await fetch(
        `http://localhost:4000/api/quizzes/${qid}/questions`
      );
      const data = await res.json();
      setQuestions(data);
    }
    loadQuestions();
  }, [qid]);

  const [activeTab, setActiveTab] = useState("details");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizType, setQuizType] = useState("Graded Quiz");
  const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");
  const [points, setPoints] = useState(0);
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [timeLimit, setTimeLimit] = useState(20);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState("Never");
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestions, setLockQuestions] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [untilDate, setUntilDate] = useState("");

  useEffect(() => {
    async function loadQuiz() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/courses/${cid}/quizzes/${qid}`
        );
        const data = await res.json();

        setQuiz(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setQuizType(data.quizType || "Graded Quiz");
        setAssignmentGroup(data.assignmentGroup || "Quizzes");
        setPoints(data.points || 0);
        setShuffleAnswers(data.shuffleAnswers ?? true);
        setTimeLimit(data.timeLimit ?? 20);
        setMultipleAttempts(data.multipleAttempts ?? false);
        setShowCorrectAnswers(data.showCorrectAnswers || "Never");
        setAccessCode(data.accessCode || "");
        setOneQuestionAtATime(data.oneQuestionAtATime ?? true);
        setWebcamRequired(data.webcamRequired ?? false);
        setLockQuestions(data.lockQuestions ?? false);
        setDueDate(data.dueDate || "");
        setAvailableDate(data.availableDate || "");
        setUntilDate(data.untilDate || "");
      } catch {
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    }

    loadQuiz();
  }, [cid, qid]);

  const handleSave = async (publish = false) => {
    const payload = {
      title,
      description,
      quizType,
      assignmentGroup,
      points,
      shuffleAnswers,
      timeLimit,
      multipleAttempts,
      howManyAttempts: quiz?.howManyAttempts ?? 1,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestions,
      dueDate,
      availableDate,
      untilDate,
      published: publish ? true : quiz?.published,
    };

    try {
      await fetch(`http://localhost:4000/api/quizzes/${qid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (publish) {
        // ✅ After Save & Publish → go back to Quiz List
        router.push(`/Courses/${cid}/Quizzes`);
      } else {
        // ✅ After Save → go to Quiz Details Page
        router.push(`/Courses/${cid}/Quizzes/${qid}/QuizDetails`);
      }
    } catch (err) {
      console.error("Failed to save quiz", err);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!quiz) return <p className="text-center mt-4">Quiz not found.</p>;

  const removeQuestion = async (questionId: string) => {
    if (!questionId) return;

    try {
      await deleteQuestion(qid, questionId);

      // Update UI after delete
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
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

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "details")}
        className="mb-3"
      >
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
              />
            </div>

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
                    onChange={(e) => setQuizType(e.target.value)}
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
                    onChange={(e) => setAssignmentGroup(e.target.value)}
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

                {/* How Many Attempts */}
                {multipleAttempts && (
                  <>
                    <div className="col-md-4 text-md-end">
                      <label className="form-label">How Many Attempts</label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="number"
                        className="form-control w-25"
                        min={1}
                        value={quiz.howManyAttempts ?? 1}
                        onChange={(e) =>
                          setQuiz({
                            ...quiz,
                            howManyAttempts: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  </>
                )}

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
            </form>

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
          </div>
        </Tab>

        {/* questions tab */}

        <Tab eventKey="questions" title="Questions">
          <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Questions</h5>
              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  router.push(`/Courses/${cid}/Quizzes/${qid}/Questions/new`)
                }
              >
                + Add Question
              </Button>
            </div>

            <div className="list-group">
              {questions.length === 0 ? (
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>No questions yet</strong>
                  </div>
                </div>
              ) : (
                questions.map((q) => (
                  <div
                    key={q.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{q.text.replace(/<[^>]*>/g, "").trim()}</strong> (
                      {q.type}, {q.points} pts)
                    </div>

                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() =>
                          router.push(
                            `/Courses/${cid}/Quizzes/${qid}/Questions/${q.id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => removeQuestion(q._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
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
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
