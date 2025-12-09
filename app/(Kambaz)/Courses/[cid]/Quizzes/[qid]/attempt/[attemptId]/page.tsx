"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { Quiz, Question } from "../../../types";

export default function QuizAttemptPage() {
  const { cid, qid, attemptId } = useParams<{
    cid: string;
    qid: string;
    attemptId: string;
  }>();

  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showTime, setShowTime] = useState(true);

  // ✅ Load quiz with questions
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const quizRes = await fetch(
          `http://localhost:4000/api/courses/${cid}/quizzes/${qid}`
        );
        const quizData = await quizRes.json();

        const qRes = await fetch(
          `http://localhost:4000/api/quizzes/${qid}/questions`
        );
        const questions = await qRes.json();

        setQuiz({ ...quizData, questions });
      } catch (err) {
        console.error("LOAD QUIZ ERROR", err);
      }
    };

    loadQuiz();
  }, [cid, qid]);

  // ✅ Timer
  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  if (!quiz) return <div>Loading quiz…</div>;

  const currentQuestion: Question = quiz.questions[currentIndex];

  const handleAnswerChange = (value: string) => {
    if (!currentQuestion?._id) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion._id!]: value }));
  };

  const handleSubmit = () => setSubmitted(true);

  const calculateScore = () =>
    quiz.questions.reduce((score, q) => {
      if (q._id && answers[q._id] === q.answer) return score + q.points;
      return score;
    }, 0);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} Minutes, ${secs} Seconds`;
  };

  if (!currentQuestion) return null;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", fontFamily: "Arial" }}>
      <div style={{ display: "flex", gap: 20 }}>
        {/* Main */}
        <div style={{ flex: 3 }}>
          <p style={{ color: "#555" }}>
            Started:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            at{" "}
            {new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>

          <h2 style={{ fontSize: 26, marginBottom: 10 }}>{quiz.title}</h2>

          <p style={{ marginBottom: 20 }}>
            {quiz.description || "These are the quiz instructions"}
          </p>

          {/* Question Card */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 4,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                background: "#f5f5f5",
                padding: "10px 15px",
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <span>Question {currentIndex + 1}</span>
              <span>{currentQuestion.points} pts</span>
            </div>

            <div style={{ padding: 15 }}>
              <p style={{ marginBottom: 15 }}>{currentQuestion.text}</p>

              {currentQuestion.type === "multiple-choice" &&
                currentQuestion.options?.map((opt) => (
                  <label
                    key={opt}
                    style={{ display: "block", marginBottom: 10 }}
                  >
                    <input
                      type="radio"
                      name={currentQuestion._id}
                      value={opt}
                      checked={answers[currentQuestion._id!] === opt}
                      onChange={() => handleAnswerChange(opt)}
                      disabled={submitted}
                    />{" "}
                    {opt}
                  </label>
                ))}

              {currentQuestion.type === "true-false" &&
                ["True", "False"].map((opt) => (
                  <label
                    key={opt}
                    style={{ display: "block", marginBottom: 10 }}
                  >
                    <input
                      type="radio"
                      name={currentQuestion._id}
                      value={opt}
                      checked={answers[currentQuestion._id!] === opt}
                      onChange={() => handleAnswerChange(opt)}
                      disabled={submitted}
                    />{" "}
                    {opt}
                  </label>
                ))}

              {currentQuestion.type === "fill-in-the-blank" && (
                <input
                  type="text"
                  value={answers[currentQuestion._id!] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  disabled={submitted}
                  style={{
                    width: "100%",
                    padding: 8,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                  }}
                />
              )}

              {submitted && (
                <p
                  style={{
                    marginTop: 10,
                    color:
                      answers[currentQuestion._id!] === currentQuestion.answer
                        ? "green"
                        : "red",
                  }}
                >
                  Correct Answer: {currentQuestion.answer}
                </p>
              )}
            </div>
          </div>

          {/* Nav Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <Button
              variant="danger"
              onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>

            {currentIndex < quiz.questions.length - 1 ? (
              <Button
                variant="danger"
                onClick={() => setCurrentIndex((i) => i + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="danger"
                onClick={handleSubmit}
                disabled={submitted}
              >
                Submit Quiz
              </Button>
            )}
          </div>

          {/* Score (no Edit button!) */}
          {submitted && (
            <div>
              <h3>
                Your Score: {calculateScore()} /{" "}
                {quiz.questions.reduce((s, q) => s + q.points, 0)}
              </h3>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ flex: 1 }}>
          <h3>Questions</h3>

          <div
            style={{
              fontSize: 14,
              margin: "10px 0",
              color: "#444",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Time Elapsed</span>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#0070f3",
                cursor: "pointer",
              }}
              onClick={() => setShowTime((s) => !s)}
            >
              {showTime ? "Hide Time" : "Show Time"}
            </button>
          </div>

          {showTime && <div style={{ marginBottom: 15 }}>{formatTime()}</div>}

          <ul style={{ listStyle: "none", padding: 0 }}>
            {quiz.questions.map((q, idx) => (
              <li key={q._id} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: 4,
                    color: "#b00020",
                    cursor: "pointer",
                    fontWeight: idx === currentIndex ? "bold" : "normal",
                  }}
                >
                  Question {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
