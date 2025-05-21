"use client";
import FileUpload from "@/features/quiz/components/FileUpload";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import GenerateQuiz from "@/features/quiz/components/GenerateQuiz";
import TakeQuiz from "@/features/quiz/components/TakeQuiz";
import { ModeToggle } from "@/shared/components/ModeToggle";
import Link from "next/link";

const QuizPage = () => {
  const uploadedFileUrl = useSelector(
    (state: RootState) => state.quiz.uploadedFileUrl
  );
  const quizData = useSelector((state: RootState) => state.quiz.quizData);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px]">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-lg font-semibold">
              Book Tutor
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="flex-1 flex flex-col justify-center items-center overflow-auto p-4 w-full">
        <div className="flex flex-col items-center justify-center gap-4">
          {quizData.questions.length <= 0 && !uploadedFileUrl && <FileUpload />}
          {quizData.questions.length <= 0 && uploadedFileUrl && (
            <GenerateQuiz />
          )}
          {quizData.questions.length > 0 && <TakeQuiz data={quizData} />}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
