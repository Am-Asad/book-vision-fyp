import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import chatReducer from "@/features/chat/utils/chatSlice";
import userReducer from "@/store/userSlice";
import globalReducer from "@/shared/utils/GlobalSlice";
import quizReducer from "@/features/quiz/utils/quizSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    chat: chatReducer,
    quiz: quizReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
