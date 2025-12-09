"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuizPreviewComponent from "./QuizPreviewComponent";
import { fetchQuizById } from "../../client";
import { Quiz } from "../../types";

const QuizPreviewPage = () => {
  const { cid, qid } = useParams(); // course ID and quiz ID
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);

  useEffect(() => {
    // Ensure 'cid' and 'qid' are strings (not arrays) before API call
    if (!cid || !qid || Array.isArray(cid) || Array.isArray(qid)) return;
    fetchQuizById(cid, qid).then(setQuiz); // API call
  }, [cid, qid]);

  if (!quiz) return <div>Loading...</div>;

  return <QuizPreviewComponent quiz={quiz} />;
};

export default QuizPreviewPage;
