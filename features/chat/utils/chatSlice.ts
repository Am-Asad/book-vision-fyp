import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "./types";

export type Model =
  | "OpenAI"
  | "EnhancedOpenAI"
  | "Deepseek"
  | "EnhancedDeepseek"
  | "DeepseekQ"
  | "Search With Images";

type ChatState = {
  currentChat: Chat | null;
  selectedModel: Model;
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
    setSelectedModel: (state, action: PayloadAction<Model>) => {
      state.selectedModel = action.payload;
    },
  },
});

export const { setCurrentChat, setSelectedModel } = chatSlice.actions;
export default chatSlice.reducer;
