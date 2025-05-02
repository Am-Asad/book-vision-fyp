import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateQuiz } from "../hooks/useGenerateQuiz";

const GenerateQuiz = () => {
  const uploadedFileUrl = useSelector(
    (state: RootState) => state.quiz.uploadedFileUrl
  );
  const { mutate: generateQuiz } = useGenerateQuiz();

  const handleQuizQuerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const quizQuery = formData.get("quizQuery") as string;

    generateQuiz(quizQuery);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Uploaded File</h1>
      <p className="text-md text-muted-foreground font-semibold">
        File URL:{" "}
        <Link
          target="_blank"
          href={uploadedFileUrl}
          className="font-medium underline text-primary"
        >
          {uploadedFileUrl}
        </Link>
      </p>
      {/* Quiz Query Input */}
      <form
        onSubmit={handleQuizQuerySubmit}
        className="w-full flex flex-col items-center justify-center gap-4 mt-4"
      >
        <Textarea
          className="w-full"
          placeholder="Enter your quiz query"
          name="quizQuery"
          required
          rows={5}
        />
        <Button type="submit">Generate Quiz</Button>
      </form>
    </div>
  );
};

export default GenerateQuiz;
