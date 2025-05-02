"use client";
import FileUpload from "@/features/quiz/components/FileUpload";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import GenerateQuiz from "@/features/quiz/components/GenerateQuiz";
import TakeQuiz from "@/features/quiz/components/TakeQuiz";

const QuizPage = () => {
  const uploadedFileUrl = useSelector(
    (state: RootState) => state.quiz.uploadedFileUrl
  );
  const quizData = useSelector((state: RootState) => state.quiz.quizData);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center overflow-auto p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        {quizData.questions.length <= 0 && !uploadedFileUrl && <FileUpload />}
        {quizData.questions.length <= 0 && uploadedFileUrl && <GenerateQuiz />}
        {quizData.questions.length > 0 && <TakeQuiz data={quizData} />}
      </div>
    </div>
  );
};

export default QuizPage;
