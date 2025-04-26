import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GlobalState = {
  showDialog: boolean;
};

const initialState: GlobalState = {
  showDialog: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setShowDialog: (state, action: PayloadAction<boolean>) => {
      state.showDialog = action.payload;
    },
  },
});

export const { setShowDialog } = globalSlice.actions;
export default globalSlice.reducer;
