import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizData } from "./types";

type QuizState = {
  uploadedFileUrl: string;
  quizData: QuizData;
};

const initialState: QuizState = {
  uploadedFileUrl: "",
  quizData: {
    questions: [],
  },
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setUploadedFileUrl: (state, action: PayloadAction<string>) => {
      state.uploadedFileUrl = action.payload;
    },
    setQuizData: (state, action: PayloadAction<QuizData>) => {
      state.quizData = action.payload;
    },
  },
});

export const { setUploadedFileUrl, setQuizData } = quizSlice.actions;

export default quizSlice.reducer;
