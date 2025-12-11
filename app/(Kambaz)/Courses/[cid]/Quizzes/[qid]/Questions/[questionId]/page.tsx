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

        // Normalize and ensure options exist per type
        const normalized = data.map((q: any) => {
          const base = {
            ...q,
            id: q._id,
          };

          // Ensure options array exists in a predictable shape
          if (!Array.isArray(base.options)) {
            if (base.type === "true-false") base.options = ["True", "False"];
            else if (base.type === "fill-in-the-blank")
              base.options = base.answer ? [base.answer] : [""];
            else base.options = ["", ""];
          }

          // Backwards compatibility: if fill-in-the-blank stored answer (string),
          // we use options array as canonical list of acceptable answers.
          if (base.type === "fill-in-the-blank") {
            if ((!base.options || base.options.length === 0) && base.answer) {
              base.options = [base.answer];
            }
          }

          return base;
        });

        if (normalized.length) {
          setQuestions(normalized);
        } else {
          setQuestions([
            {
              id: `temp-${Date.now()}`,
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
    qidParam: string | undefined,
    idx: number,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qidParam) return q;
        const copy = [...(q.options || [])];
        // If idx inside range -> set, else push
        if (idx >= 0 && idx < copy.length) copy[idx] = value;
        else copy.push(value);
        return { ...q, options: copy };
      })
    );
  };

  const addOption = (qidParam: string | undefined) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qidParam ? { ...q, options: [...(q.options || []), ""] } : q
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
      // For fill-in-the-blank ensure answer is at least first option
      const payload: any = {
        type: q.type,
        text: q.text,
        options: q.options || [],
        points: q.points,
      };

      if (q.type === "fill-in-the-blank") {
        payload.answer = (q.options && q.options[0]) || q.answer || "";
      } else {
        payload.answer = q.answer || "";
      }

      await updateQuestion(qid, q.id, payload);
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

    // Validate questions (robust for all types)
    const invalidQuestions: number[] = [];
    questions.forEach((q, index) => {
      const textContent = stripHtml(q.text);

      if (!textContent) {
        invalidQuestions.push(index + 1);
        return;
      }

      if (q.type === "multiple-choice") {
        const opts = q.options || [];
        if (opts.length < 2) {
          invalidQuestions.push(index + 1);
          return;
        }
        if (!q.answer || String(q.answer).trim() === "") {
          invalidQuestions.push(index + 1);
          return;
        }
      }

      if (q.type === "true-false") {
        const opts = q.options || [];
        if (opts.length < 1) {
          invalidQuestions.push(index + 1);
          return;
        }
        if (!q.answer || !opts.includes(q.answer)) {
          invalidQuestions.push(index + 1);
          return;
        }
      }

      if (q.type === "fill-in-the-blank") {
        const opts = q.options || [];
        if (opts.length === 0) {
          invalidQuestions.push(index + 1);
          return;
        }
        // no empty blanks allowed
        if (opts.some((v) => !String(v || "").trim())) {
          invalidQuestions.push(index + 1);
          return;
        }
      }
    });

    if (invalidQuestions.length > 0) {
      alert(`Please complete Question(s): ${invalidQuestions.join(", ")}`);
      return;
    }

    try {
      // 1) Save questions (create or update)
      await Promise.all(
        questions.map((q) => {
          const payload: any = {
            type: q.type,
            text: q.text?.trim() || "",
            options: q.options || [],
            points: q.points || 1,
          };

          if (q.type === "fill-in-the-blank") {
            payload.answer = (q.options && q.options[0]) || q.answer || "";
          } else {
            payload.answer = q.answer || "";
          }

          // If payload invalid skip (shouldn't happen due to validation)
          if (!payload.text) return;

          if (!q.id || String(q.id).startsWith("temp")) {
            return createQuestionForQuiz(qid, payload);
          }

          return updateQuestion(qid, q.id, payload);
        })
      );

      // 2) Publish quiz if needed
      if (publish) {
        await fetch(`http://localhost:4000/api/quizzes/${qid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ published: true }),
        });
      }

      // 3) Navigate back
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed. Check console for details.");
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const deleteOption = (qidParam: string | undefined, idx: number) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qidParam) return q;

        const updatedOptions = [...(q.options || [])];

        // capture removed value before splice
        const removed = updatedOptions.splice(idx, 1)[0];

        // If you delete the correct answer, clear it
        let updatedAnswer = q.answer;
        if (updatedAnswer === removed) {
          updatedAnswer = "";
        }

        // Ensure at least one blank for fill-in-the-blank
        if (q.type === "fill-in-the-blank" && updatedOptions.length === 0) {
          updatedOptions.push("");
        }

        return { ...q, options: updatedOptions, answer: updatedAnswer };
      })
    );
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
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => deleteOption(q.id, idx)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => addOption(q.id)}
              >
                + Add Another option
              </Button>
            </div>
          )}

          {/* True/False as editable options (Option B behavior) */}
          {q.type === "true-false" && (
            <div className="mt-3">
              <label className="fw-bold mb-2">True / False Options</label>

              {(q.options || ["True", "False"]).map((opt, idx) => (
                <div key={idx} className="d-flex align-items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name={`tf-${q.id}`}
                    checked={q.answer === opt}
                    onChange={() => updateQuestionState(q.id, "answer", opt)}
                  />

                  {/* Editable option text */}
                  <Form.Control
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(q.id, idx, e.target.value)}
                  />

                  {/* Delete option */}
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => deleteOption(q.id, idx)}
                  >
                    ✕
                  </Button>
                </div>
              ))}

              {/* Add another True/False option */}
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => addOption(q.id)}
              >
                + Add Option
              </Button>
            </div>
          )}

          {/* Fill in the Blank (multiple acceptable answers) */}
          {q.type === "fill-in-the-blank" && (
            <div className="mt-3">
              <label className="fw-bold mb-2">Correct Answer(s)</label>

              {(q.options || [q.answer || ""]).map((opt, idx) => (
                <div key={idx} className="d-flex align-items-center gap-2 mb-2">
                  <Form.Control
                    type="text"
                    value={opt}
                    placeholder={`Blank ${idx + 1}`}
                    onChange={(e) => updateOption(q.id, idx, e.target.value)}
                  />

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => deleteOption(q.id, idx)}
                  >
                    ✕
                  </Button>
                </div>
              ))}

              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => addOption(q.id)}
              >
                + Add Another Blank
              </Button>
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
