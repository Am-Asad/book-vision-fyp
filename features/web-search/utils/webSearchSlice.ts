import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CombinedSearchResponse } from "./types";

type WebSearchState = {
  webSearchMessages: CombinedSearchResponse[];
};

const initialState: WebSearchState = {
  webSearchMessages: [],
};

const webSearchSlice = createSlice({
  name: "webSearch",
  initialState,
  reducers: {
    setWebSearchMessages: (
      state,
      action: PayloadAction<CombinedSearchResponse>
    ) => {
      state.webSearchMessages.push(action.payload);
    },
    clearWebSearchMessages: (state) => {
      state.webSearchMessages = [];
    },
  },
});

export const { setWebSearchMessages, clearWebSearchMessages } =
  webSearchSlice.actions;
export default webSearchSlice.reducer;
