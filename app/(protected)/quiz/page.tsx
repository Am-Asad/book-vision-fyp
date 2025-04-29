"use client";
import FileUpload from "@/features/quiz/components/FileUpload";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import GenerateQuiz from "@/features/quiz/components/GenerateQuiz";
import TakeQuiz from "@/features/quiz/components/TakeQuiz";

const QuizPage = () => {
  const uploadedFileName = useSelector(
    (state: RootState) => state.quiz.uploadedFileName
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center overflow-auto p-4">
      <div className="flex h-full flex-col items-center justify-center">
        {!uploadedFileName && <FileUpload />}
        {uploadedFileName && <GenerateQuiz />}
        <TakeQuiz />
      </div>
    </div>
  );
};

export default QuizPage;
