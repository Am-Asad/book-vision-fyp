import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editChatTitle } from "../utils/chatApi";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../utils/chatSlice";

export const useEditChatTitle = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({
      chat_id,
      title,
    }: {
      chat_id: string;
      title: string;
    }) => {
      return await editChatTitle(chat_id, title);
    },

    onMutate: () => {
      const toastId = toast.loading("Updating chat title...");
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      toast.success("Chat title updated successfully", {
        id: context?.toastId,
      });
      queryClient.invalidateQueries({ queryKey: ["chatsHistory"] });
      dispatch(setCurrentChat(null));
    },
    onError: (error, variables, context) => {
      toast.error("Failed to update chat title", { id: context?.toastId });
    },
  });
};
