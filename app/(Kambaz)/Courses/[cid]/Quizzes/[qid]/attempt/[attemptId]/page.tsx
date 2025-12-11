"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "react-bootstrap";
import { Quiz, Question } from "../../../types";

export default function QuizAttemptPage() {
  const { cid, qid, attemptId } = useParams<{
    cid: string;
    qid: string;
    attemptId: string;
  }>();

  // --- state (all hooks declared up front) ---
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showTime, setShowTime] = useState(true);
  const [attemptIdState, setAttemptIdState] = useState<string | null>(
    attemptId || null
  );
  const [canTakeQuiz, setCanTakeQuiz] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /* =========================
     LOAD QUIZ + START ATTEMPT
     (runs once on mount)
     ========================== */
  useEffect(() => {
    const loadQuizAndStart = async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        // 1) Fetch quiz (course-scoped endpoint returns questions in our backend)
        const quizRes = await fetch(
          `http://localhost:4000/api/courses/${cid}/quizzes/${qid}`,
          { credentials: "include" }
        );

        if (!quizRes.ok) {
          const body = await quizRes.text();
          throw new Error(
            `Failed to load quiz: ${quizRes.status} ${quizRes.statusText} — ${body}`
          );
        }

        const quizData: Quiz = await quizRes.json();
        console.log("QUIZ DATA:", quizData);

        // 2) If backend didn't include `questions`, try fallback endpoint
        let questions: Question[] | undefined = (quizData as any).questions;
        if (!questions || !Array.isArray(questions)) {
          try {
            const qRes = await fetch(
              `http://localhost:4000/api/quizzes/${qid}/questions`,
              { credentials: "include" }
            );
            if (qRes.ok) {
              questions = await qRes.json();
            } else {
              console.warn(
                "Fallback questions endpoint not available or returned non-OK:",
                qRes.status,
                qRes.statusText
              );
            }
          } catch (e) {
            console.warn("Error fetching fallback questions endpoint:", e);
          }
        }

        // Attach questions if present
        const fullQuiz: Quiz = questions
          ? { ...quizData, questions }
          : quizData;
        setQuiz(fullQuiz);

        // 3) Start/resume attempt
        const startRes = await fetch(
          `http://localhost:4000/api/courses/${cid}/quizzes/${qid}/start`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!startRes.ok) {
          // start failed — likely attempts exhausted
          const errBody = await startRes.json().catch(() => null);
          console.warn(
            "Start attempt response not OK:",
            startRes.status,
            errBody
          );
          setCanTakeQuiz(false);
          setLoading(false);
          return;
        }

        const startData = await startRes.json();
        console.log("START DATA:", startData);
        setAttemptIdState(startData.attemptId);
        setCanTakeQuiz(true);
        setLoading(false);
      } catch (err: any) {
        console.error("LOAD QUIZ ERROR:", err);
        setErrorMsg(err?.message ?? "Failed to load quiz");
        setLoading(false);
      }
    };

    loadQuizAndStart();
  }, [cid, qid]);

  /* =========================
     LOAD LAST ATTEMPT (VIEW MODE)
     Only when quiz is loaded AND there is NO active attempt
     ========================== */
  useEffect(() => {
    const loadLastAttempt = async () => {
      if (!quiz || attemptIdState) return;

      try {
        const res = await fetch(
          `http://localhost:4000/api/courses/${cid}/quizzes/${qid}/last-attempt`,
          { credentials: "include" }
        );

        if (!res.ok) {
          console.warn("No last-attempt or non-OK response:", res.status);
          return;
        }

        const lastAttempt = await res.json();
        console.log("LAST ATTEMPT:", lastAttempt);

        if (lastAttempt?.answers) {
          const answerMap: Record<string, string> = {};
          lastAttempt.answers.forEach((a: any) => {
            // handle both shapes: { questionId, selectedAnswer } or { questionId, answer }
            answerMap[a.questionId] = a.selectedAnswer ?? a.answer ?? "";
          });
          setAnswers(answerMap);
          setSubmitted(true);
        }
      } catch (err) {
        console.error("LOAD LAST ATTEMPT ERROR:", err);
      }
    };

    loadLastAttempt();
  }, [quiz, cid, qid, attemptIdState]);

  /* =========================
     TIMER
     ========================== */
  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  /* =========================
     EARLY RENDERING / FALLBACKS
     (After hooks only)
     ========================== */

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <h3>Loading quiz…</h3>
        <p>If this hangs, check the network requests in DevTools.</p>
        {errorMsg && (
          <pre style={{ whiteSpace: "pre-wrap", color: "crimson" }}>
            {errorMsg}
          </pre>
        )}
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div style={{ padding: 24 }}>
        <h3>Error</h3>
        <pre style={{ whiteSpace: "pre-wrap", color: "crimson" }}>
          {errorMsg}
        </pre>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div style={{ padding: 24 }}>
        <h3>No quiz data returned</h3>
        <p>
          Make sure your backend `GET /api/courses/:cid/quizzes/:qid` returns
          quiz JSON.
        </p>
      </div>
    );
  }

  if (!canTakeQuiz) {
    return (
      <div style={{ padding: 24 }}>
        <h3>Attempts exhausted</h3>
        <p>You have used all your allowed attempts for this quiz.</p>
      </div>
    );
  }

  // guard if questions not present (defensive)
  const questions: Question[] = (quiz as any).questions ?? [];
  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <h3>No questions found</h3>
        <p>
          Check that the quiz includes `questions` or that
          `/api/quizzes/:qid/questions` exists.
        </p>
      </div>
    );
  }

  const currentQuestion: Question = questions[currentIndex];

  /* =========================
     Handlers & Helpers
     ========================== */
  const handleAnswerChange = (value: string) => {
    if (!currentQuestion?._id) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion._id!]: value }));
  };

  const calculateScore = () =>
    questions.reduce((score, q) => {
      if (q._id && answers[q._id] === q.answer) return score + q.points;
      return score;
    }, 0);

  const handleSubmit = async () => {
    if (!attemptIdState) {
      alert("No active attempt ID — cannot submit.");
      return;
    }

    const score = calculateScore();

    try {
      const res = await fetch(
        `http://localhost:4000/api/quiz-attempts/${attemptIdState}/submit`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            answers: Object.entries(answers).map(
              ([questionId, selectedAnswer]) => ({
                questionId,
                selectedAnswer,
              })
            ),
            score,
          }),
        }
      );

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(
          `Submit failed: ${res.status} ${res.statusText} — ${body}`
        );
      }

      setSubmitted(true);
      alert(`Quiz submitted! Your score: ${score}`);
    } catch (err: any) {
      console.error("SUBMIT ERROR:", err);
      alert("Failed to submit quiz: " + (err?.message ?? String(err)));
    }
  };

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} Minutes, ${secs} Seconds`;
  };

  /* =========================
     RENDER
     ========================== */
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
            {quiz.description || "Quiz instructions"}
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

              {/* Multiple Choice */}
              {currentQuestion.type === "multiple-choice" &&
                currentQuestion.options?.map((opt, idx) => (
                  <label
                    key={`${opt}-${idx}`}
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

              {/* True / False */}
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

              {/* Fill */}
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

            {currentIndex < questions.length - 1 ? (
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

          {submitted && (
            <div>
              <h3>
                Your Score: {calculateScore()} /{" "}
                {questions.reduce((s, q) => s + q.points, 0)}
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
            {questions.map((q, idx) => (
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
