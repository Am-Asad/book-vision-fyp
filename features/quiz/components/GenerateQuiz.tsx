import React, { useEffect } from "react";
import { useGenerateQuiz } from "../hooks/useGenerateQuiz";
import { setUploadedFileUrl } from "../utils/quizSlice";
import { getFilePublicUrl } from "../utils/getFilePublicUrl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

const GenerateQuiz = () => {
  const dispatch = useDispatch();
  const uploadedFileName = useSelector(
    (state: RootState) => state.quiz.uploadedFileName
  );
  const uploadedFileUrl = useSelector(
    (state: RootState) => state.quiz.uploadedFileUrl
  );

  const fetchUploadedFile = () => {
    const url = getFilePublicUrl(uploadedFileName);
    if (!url) return;
    dispatch(setUploadedFileUrl(url));
  };
  const { mutate: generateQuiz } = useGenerateQuiz();

  useEffect(() => {
    fetchUploadedFile();
  }, [uploadedFileName]);

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
        File Name: <span className="font-medium">{uploadedFileName}</span>
      </p>
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
        />
        <Button type="submit">Generate Quiz</Button>
      </form>
    </div>
  );
};

export default GenerateQuiz;
