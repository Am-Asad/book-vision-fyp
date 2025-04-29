import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadedFileName: "",
  uploadedFileUrl: "",
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setUploadedFileName: (state, action) => {
      state.uploadedFileName = action.payload;
    },
    setUploadedFileUrl: (state, action) => {
      state.uploadedFileUrl = action.payload;
    },
  },
});

export const { setUploadedFileName, setUploadedFileUrl } = quizSlice.actions;

export default quizSlice.reducer;
