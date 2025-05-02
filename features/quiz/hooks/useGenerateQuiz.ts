import { useMutation } from "@tanstack/react-query";
import { generateQuiz } from "./quizApi";
import toast from "react-hot-toast";
import { setQuizData, setUploadedFileUrl } from "../utils/quizSlice";
import { useDispatch } from "react-redux";
import { QuizData } from "../utils/types";

export const useGenerateQuiz = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (user_prompt: string) => generateQuiz(user_prompt),
    onMutate: () => {
      const toastId = toast.loading("Generating quiz...");
      return { toastId };
    },
    onSuccess: (data, _, context) => {
      toast.success("Quiz generated successfully", { id: context?.toastId });
      dispatch(setQuizData(data as QuizData));
    },
    onError: (error, _, context) => {
      toast.error(error?.message || "Error generating quiz", {
        id: context?.toastId,
      });
    },
  });
};
