import { useMutation } from "@tanstack/react-query";
import { generateQuiz } from "./quizApi";
import toast from "react-hot-toast";

export const useGenerateQuiz = () => {
  return useMutation({
    mutationFn: async (user_prompt: string) => generateQuiz(user_prompt),
    onMutate: () => {
      const toastId = toast.loading("Generating quiz...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      toast.success("Quiz generated successfully", { id: context?.toastId });
    },
    onError: (error, _, context) => {
      toast.error(error?.message || "Error generating quiz", {
        id: context?.toastId,
      });
    },
  });
};
