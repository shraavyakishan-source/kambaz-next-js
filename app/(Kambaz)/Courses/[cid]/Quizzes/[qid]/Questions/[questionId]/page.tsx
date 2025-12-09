"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button, Form } from "react-bootstrap";
import "react-quill-new/dist/quill.snow.css";
import {
  fetchQuestionsForQuiz,
  createQuestionForQuiz,
  updateQuestion,
  deleteQuestion,
} from "../../../../Quizzes/client";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type QType = "multiple-choice" | "true-false" | "fill-in-the-blank";

interface UIQuestion {
  id?: string;
  quiz?: string;
  type: QType;
  text?: string;
  options?: string[];
  answer?: string;
  points?: number;
}

export default function QuestionsEditorPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const [questions, setQuestions] = useState<UIQuestion[]>([]);

  // Fetch questions from backend
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestionsForQuiz(qid);

        // ✅ Normalize MongoDB _id → id so state updates target only one question
        const normalized = data.map((q: any) => ({
          ...q,
          id: q._id,
        }));

        if (normalized.length) {
          setQuestions(normalized);
        } else {
          setQuestions([
            {
              id: `temp-${Date.now()}`, // ✅ give temporary unique ID
              type: "multiple-choice",
              text: "",
              options: ["", ""],
              answer: "",
              points: 1,
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      }
    };

    loadQuestions();
  }, [qid]);

  const updateQuestionState = (
    id: string | undefined,
    field: keyof UIQuestion,
    value: any
  ) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (
    qid: string | undefined,
    idx: number,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qid) return q;
        const copy = [...(q.options || [])];
        copy[idx] = value;
        return { ...q, options: copy };
      })
    );
  };

  const addOption = (qid: string | undefined) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid ? { ...q, options: [...(q.options || []), ""] } : q
      )
    );
  };

  const addQuestion = async () => {
    const newQ: UIQuestion = {
      quiz: qid,
      type: "multiple-choice",
      text: "",
      options: ["", ""],
      answer: "",
      points: 1,
    };
    try {
      const created = await createQuestionForQuiz(qid, newQ);
      setQuestions((prev) => [...prev, { ...created, id: created._id }]);
    } catch (err) {
      console.error("Failed to create question:", err);
    }
  };

  const removeQuestion = async (id: string | undefined) => {
    if (!id) return;
    try {
      await deleteQuestion(qid, id);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  const updateSingleQuestion = async (q: UIQuestion) => {
    if (!q.id) return;
    try {
      await updateQuestion(qid, q.id, {
        type: q.type,
        text: q.text,
        options: q.options,
        answer: q.answer,
        points: q.points,
      });
      alert("Question updated!");
    } catch (err) {
      console.error("Failed to update question:", err);
    }
  };

  const handleSave = async (publish = false) => {
    const stripHtml = (html: string | undefined) => {
      if (!html) return "";
      return html.replace(/<[^>]*>/g, "").trim();
    };

    // Validate questions
    const invalidQuestions: number[] = [];
    questions.forEach((q, index) => {
      const textContent = stripHtml(q.text);
      const answerContent = stripHtml(q.answer);

      if (!textContent || !answerContent) {
        invalidQuestions.push(index + 1);
      }
    });

    if (invalidQuestions.length > 0) {
      alert(`Please complete Question(s): ${invalidQuestions.join(", ")}`);
      return;
    }

    try {
      // 1️⃣ Save questions
      await Promise.all(
        questions.map((q) => {
          const payload = {
            type: q.type,
            text: q.text?.trim() || "",
            options: q.options || [],
            answer: q.answer?.trim() || "",
            points: q.points || 1,
          };

          if (!payload.text || !payload.answer) return;

          if (!q.id || q.id.startsWith("temp")) {
            return createQuestionForQuiz(qid, payload);
          }

          return updateQuestion(qid, q.id, payload);
        })
      );

      // 2️⃣ Publish quiz if needed ✅
      if (publish) {
        await fetch(`http://localhost:4000/api/quizzes/${qid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ published: true }),
        });
      }

      // 3️⃣ Navigate back
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  return (
    <div className="container p-4">
      <h3 className="mb-4">Edit Questions</h3>

      {questions.map((q, index) => (
        <div
          key={q.id || index}
          className="border rounded p-3 mb-4 bg-white shadow-sm"
        >
          {/* Header Row */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              className="form-control w-50 fw-bold"
              placeholder={`Question ${index + 1}`}
              value={`Question ${index + 1}`}
              disabled
            />
            <Form.Select
              className="w-25"
              value={q.type}
              onChange={(e) =>
                updateQuestionState(q.id, "type", e.target.value as QType)
              }
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True / False</option>
              <option value="fill-in-the-blank">Fill in the Blank</option>
            </Form.Select>
            <div className="d-flex align-items-center gap-2">
              <span>pts:</span>
              <Form.Control
                type="number"
                className="w-50"
                value={q.points || 1}
                onChange={(e) =>
                  updateQuestionState(q.id, "points", Number(e.target.value))
                }
              />
            </div>
          </div>

          {/* Question Editor */}
          <div className="mb-3">
            <label className="fw-bold mb-1">Question</label>
            <ReactQuill
              theme="snow"
              value={q.text || ""}
              onChange={(val) => updateQuestionState(q.id, "text", val)}
            />
          </div>

          {/* Multiple Choice Options */}
          {q.type === "multiple-choice" && (
            <div className="mt-3">
              <label className="fw-bold mb-2 d-block">
                Answers (select correct one)
              </label>
              {(q.options || []).map((opt, idx) => (
                <div key={idx} className="d-flex align-items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name={`correct-${q.id}`}
                    checked={q.answer === opt && opt !== ""}
                    onChange={() => updateQuestionState(q.id, "answer", opt)}
                  />
                  <Form.Control
                    type="text"
                    value={opt}
                    placeholder={`Choice ${idx + 1}`}
                    onChange={(e) => updateOption(q.id, idx, e.target.value)}
                  />
                </div>
              ))}
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => addOption(q.id)}
              >
                + Add Another Answer
              </Button>
            </div>
          )}

          {/* True/False */}
          {q.type === "true-false" && (
            <div className="mt-3">
              <Form.Check
                type="radio"
                name={`tf-${q.id}`}
                label="True"
                checked={q.answer === "True"}
                onChange={() => updateQuestionState(q.id, "answer", "True")}
              />
              <Form.Check
                type="radio"
                name={`tf-${q.id}`}
                label="False"
                checked={q.answer === "False"}
                onChange={() => updateQuestionState(q.id, "answer", "False")}
              />
            </div>
          )}

          {/* Fill in Blank */}
          {q.type === "fill-in-the-blank" && (
            <div className="mt-3">
              <Form.Control
                type="text"
                placeholder="Correct Answer"
                value={q.answer || ""}
                onChange={(e) =>
                  updateQuestionState(q.id, "answer", e.target.value)
                }
              />
            </div>
          )}

          {/* Buttons for each question */}
          <div className="text-end mt-3 d-flex justify-content-between">
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => removeQuestion(q.id)}
            >
              Delete Question
            </Button>
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => updateSingleQuestion(q)}
            >
              Update
            </Button>
          </div>
        </div>
      ))}

      {/* Add Question Button */}
      <div className="mb-4">
        <Button variant="outline-danger" onClick={addQuestion}>
          + Add Another Question
        </Button>
      </div>

      {/* Page-level Actions */}
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
  );
}
