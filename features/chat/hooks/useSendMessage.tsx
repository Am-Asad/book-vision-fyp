import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../utils/chatApi";
import { Message } from "../utils/types";
import toast from "react-hot-toast";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      chat_id,
      user_prompt,
      model,
    }: {
      chat_id: string;
      user_prompt: string;
      model: string;
    }) => {
      return await sendMessage(chat_id, user_prompt, model);
    },

    onMutate: async ({ chat_id, user_prompt }) => {
      await queryClient.cancelQueries({
        queryKey: ["chatMessages", chat_id],
      });

      const previousMessages = queryClient.getQueryData<Message[]>([
        "chatMessages",
        chat_id,
      ]);

      const optimisticMessage = {
        id: "optimistic-message",
        chat_id,
        text: user_prompt,
        response: "",
        timestamp: new Date().toISOString(),
      };

      queryClient.setQueryData(["chatMessages", chat_id], (old: Message[]) => [
        ...old,
        optimisticMessage,
      ]);

      return { previousMessages };
    },

    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["chatMessages", variables.chat_id],
        (old: Message[]) =>
          old.map((message) =>
            message.id === "optimistic-message" ? data : message
          )
      );
    },
    onError: (error, variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["chatMessages", variables.chat_id],
          context.previousMessages
        );
      }
      toast.error(error?.message || "Something went wrong");
      console.error("Error sending message", error || "Something went wrong");
    },
  });
};
