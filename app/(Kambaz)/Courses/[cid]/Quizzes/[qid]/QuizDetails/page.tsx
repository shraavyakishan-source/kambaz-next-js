"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../store";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  );

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const canEdit =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  // Load quiz
  useEffect(() => {
    async function loadQuiz() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/courses/${cid}/quizzes/${qid}`,
          { credentials: "include" }
        );

        if (!res.ok) {
          setQuiz(null);
        } else {
          const data = await res.json();
          setQuiz(data);
        }
      } catch (err) {
        console.error(err);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    }

    loadQuiz();
  }, [cid, qid]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!quiz) return <p className="text-center mt-4">Quiz not found.</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex gap-3 justify-content-center">
        <Button
          variant="secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          Back
        </Button>
        {/* Start Quiz button for students */}
        {currentUser?.role === "STUDENT" && (
          <Button
            className="d-flex justify-content-center"
            variant="danger"
            onClick={async () => {
              try {
                const res = await fetch(
                  `http://localhost:4000/api/courses/${cid}/quizzes/${qid}/start`,
                  { method: "POST", credentials: "include" }
                );

                const data = await res.json();

                if (!res.ok) {
                  alert(data.message || "You cannot take this quiz");
                  return;
                }

                router.push(
                  `/Courses/${cid}/Quizzes/${qid}/attempt/${data.attemptId}`
                );
              } catch (err) {
                console.error(err);
                alert("Network error. Please try again.");
              }
            }}
          >
            Start Quiz
          </Button>
        )}

        {canEdit && (
          <>
            <Button
              variant="secondary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
            >
              ✏️ Edit
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                router.push(`/Courses/${cid}/Quizzes/${qid}/preview`)
              }
            >
              Preview Quiz
            </Button>
          </>
        )}
      </div>

      <hr />
      <h2 className="mb-4 d-flex justify-content-center">{quiz.title}</h2>

      <div className="d-flex justify-content-center w-100">
        <Card className="p-4 mb-4" style={{ width: "80%", minWidth: "700px" }}>
          <div
            className="d-flex justify-content-between mx-auto"
            style={{ width: "80%" }}
          >
            <div className="text-start">
              <p>
                <strong>Quiz Type </strong>
              </p>
              <p>
                <strong>Points</strong>
              </p>
              <p>
                <strong>Assignment Group</strong>
              </p>
              <p>
                <strong>Shuffle Answers</strong>
              </p>
              <p>
                <strong>Time Limit</strong>
              </p>
              <p>
                <strong>Multiple Attempts</strong>
              </p>
              <p>
                <strong>How many Attempts</strong>
              </p>
              <p>
                <strong>Show Correct Answers</strong>
              </p>
              <p>
                <strong>One Question at a Time</strong>
              </p>
              <p>
                <strong>Webcam Required</strong>
              </p>
              <p>
                <strong>Lock Questions After Answering</strong>
              </p>
              <p>
                <strong>Access Code</strong>
              </p>
            </div>

            <div className="text-end">
              <p>{quiz.quizType || "—"}</p>
              <p>{quiz.points || "—"}</p>
              <p>{quiz.assignmentGroup || "—"}</p>
              <p>{quiz.shuffleAnswers ? "Yes" : "No"}</p>
              <p>{quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "None"}</p>
              <p>{quiz.multipleAttempts ? "Yes" : "No"}</p>
              <p>{quiz.howManyAttempts || "1"}</p>
              <p>{quiz.showCorrectAnswers}</p>
              <p>{quiz.oneQuestionAtATime ? "Yes" : "No"}</p>
              <p>{quiz.webcamRequired ? "Yes" : "No"}</p>
              <p>{quiz.lockQuestions ? "Yes" : "No"}</p>
              <p>{quiz.accessCode || "None"}</p>
            </div>
          </div>

          <hr className="mt-4" />

          <div className="mt-4" style={{ width: "80%", margin: "0 auto" }}>
            <p>
              <strong>Description:</strong>
              <br />
              {quiz.description
                ? quiz.description.replace(/<[^>]+>/g, "").trim()
                : "No description"}
            </p>
          </div>

          <table
            className="table mt-4"
            style={{ width: "85%", margin: "0 auto" }}
          >
            <thead>
              <tr>
                <th>Due</th>
                <th>For</th>
                <th>Available from</th>
                <th>Until</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{quiz.dueDate || "—"}</td>
                <td>Everyone</td>
                <td>{quiz.availableDate || "—"}</td>
                <td>{quiz.untilDate || "—"}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
