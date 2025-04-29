import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "./types";

type ChatState = {
  currentChat: Chat | null;
  selectedModel: string;
};

const initialState: ChatState = {
  currentChat: null,
  selectedModel: "OpenAI",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<Chat | null>) => {
      state.currentChat = action.payload;
    },
    setSelectedModel: (state, action: PayloadAction<string>) => {
      state.selectedModel = action.payload;
    },
  },
});

export const { setCurrentChat, setSelectedModel } = chatSlice.actions;
export default chatSlice.reducer;
