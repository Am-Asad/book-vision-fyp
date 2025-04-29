"use client";
import { X } from "lucide-react";
import React, { useRef, useState } from "react";
import { BookOpen, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { uploadPdfFile } from "@/features/quiz/utils/uploadPdfFile";
import { setUploadedFileName } from "../utils/quizSlice";

const QuizPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setFile(null);
    fileInputRef.current!.value = "";

    // Uploading file to supabase storage
    const toastId = toast.loading("Uploading file to supabase...");
    const fileName = `${userId}/${file.name}`;
    try {
      const response = await uploadPdfFile(fileName, file);
      console.log("Supabase response for file upload", response);
      toast.success("File uploaded successfully", { id: toastId });
      dispatch(setUploadedFileName(fileName));
    } catch (error) {
      console.error(error);
      toast.error("Error uploading file", { id: toastId });
    }
  };

  return (
    <>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <BookOpen className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold">
        Are you ready to take a quiz?
      </h2>
      <p className="mt-2 text-center text-muted-foreground">
        Upload your pdf files and take a quiz on your studies, homework, or
        concepts you want to understand better.
      </p>
      <div className="mt-4">
        <form
          onSubmit={handleUpload}
          className="mt-6 flex flex-col items-center gap-4"
        >
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            accept=".pdf" // .pdf,.doc,.docx,.txt
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Upload className="h-5 w-5" /> Upload Document
          </Button>
          {file && (
            <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
              <span className="text-sm font-medium">{file.name}</span>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  setFile(null);
                  fileInputRef.current!.value = "";
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {file && (
            <Button type="submit" disabled={!file}>
              Submit
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default QuizPage;
