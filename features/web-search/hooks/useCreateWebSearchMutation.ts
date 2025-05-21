import { useMutation } from "@tanstack/react-query";
import {
  createWebSearch,
  getYoutubeSearch,
} from "@/features/chat/webSearchApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/store";
import { setWebSearchMessages } from "../utils/webSearchSlice";

export const useCreateWebSearchMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (query: string) => {
      const [webSearch, youtubeSearch] = await Promise.all([
        createWebSearch(query),
        getYoutubeSearch(query),
      ]);
      const combinedResult = {
        webSearch,
        youtubeSearch,
      };
      console.log("Combined result", combinedResult);
      return combinedResult;
    },
    onMutate: () => {
      const toastId = toast.loading("Creating web search...");
      return { toastId };
    },
    onSuccess: (data, _, context) => {
      toast.success("Web search created successfully", {
        id: context?.toastId,
      });
      dispatch(setWebSearchMessages(data));
    },
    onError: (error, _, context) => {
      toast.error(error?.message || "Failed to create web search", {
        id: context?.toastId,
      });
      console.error("Failed to create web search:", error);
    },
  });
};
