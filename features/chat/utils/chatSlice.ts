import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "./types";

type ChatState = {
  currentChat: Chat | null;
};

const initialState: ChatState = {
  currentChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<Chat | null>) => {
      state.currentChat = action.payload;
    },
  },
});

export const { setCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;
