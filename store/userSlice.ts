import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

type UserState = {
  id: string;
  email: string;
  expiresAt: number;
  isAuthenticated: boolean;
};

const accessToken =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
const decodedToken = accessToken
  ? jwtDecode<{ sub: string; exp: number }>(accessToken)
  : null;

const initialState: UserState = {
  id: decodedToken?.sub || "",
  email: decodedToken?.sub || "",
  isAuthenticated: !!decodedToken,
  expiresAt: decodedToken?.exp || 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.expiresAt = action.payload.expiresAt;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.email = "";
      state.id = "";
      state.expiresAt = 0;
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
