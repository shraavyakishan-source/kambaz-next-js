"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuiz() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/courses/${cid}/quizzes/${qid}`
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
          Preview
        </Button>

        <Button
          variant="secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
        >
          ✏️ Edit
        </Button>
      </div>
      <hr />
      <h2 className="mb-4">{quiz.title}</h2>

      <Card className="p-3 mb-4">
        <p>
          <strong>Due Date:</strong> {quiz.dueDate}
        </p>
        <p>
          <strong>Available From:</strong> {quiz.availableDate || "—"}
        </p>
        <p>
          <strong>Until:</strong> {quiz.untilDate || "—"}
        </p>
        <p>
          <strong>Points:</strong> {quiz.points || "—"}
        </p>
        <p>
          <strong>Questions:</strong> {quiz.numQuestions}
        </p>
        <p>
          <strong>Status:</strong> {quiz.status}
        </p>
        <p>
          <strong>Published:</strong>{" "}
          {quiz.published ? "✅ Published" : "🚫 Unpublished"}
        </p>
        <hr />
        <p>
          <strong>Description:</strong> {quiz.description || "No description"}
        </p>
        <p>
          <strong>Quiz Type:</strong> {quiz.quizType}
        </p>
        <p>
          <strong>Assignment Group:</strong> {quiz.assignmentGroup}
        </p>
        <p>
          <strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}
        </p>
        <p>
          <strong>Time Limit:</strong>{" "}
          {quiz.timeLimit ? `${quiz.timeLimit} min` : "None"}
        </p>
        <p>
          <strong>Multiple Attempts:</strong>{" "}
          {quiz.multipleAttempts ? "Allowed" : "Not allowed"}
        </p>
        <p>
          <strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}
        </p>
        <p>
          <strong>Access Code:</strong> {quiz.accessCode || "None"}
        </p>
        <p>
          <strong>One Question at a Time:</strong>{" "}
          {quiz.oneQuestionAtATime ? "Yes" : "No"}
        </p>
        <p>
          <strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}
        </p>
        <p>
          <strong>Lock Questions After Answering:</strong>{" "}
          {quiz.lockQuestions ? "Yes" : "No"}
        </p>
      </Card>

      <Button
        variant="danger"
        onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
      >
        Start Quiz
      </Button>
    </div>
  );
}
