import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createChat } from "../utils/chatApi";
import { useRouter } from "next/navigation";

const useCreateChat = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ file, user_id }: { file: File; user_id: string }) => {
      return await createChat(file, user_id);
    },
    onMutate: () => {
      const toastId = toast.loading("Creating chat...");
      return { toastId };
    },
    onSuccess: async (data, _, context) => {
      try {
        toast.success(data?.message, { id: context?.toastId });
        queryClient.invalidateQueries({ queryKey: ["chatsHistory"] });
        router.push(`/chats/${data.chat_id}`);
      } catch (error) {
        toast.error("Error processing PDF file", { id: context?.toastId });
      }
    },
    onError: (error, _, context) => {
      console.error("create chat error", error);
      toast.error(error?.message, {
        id: context?.toastId,
      });
    },
  });
};

export default useCreateChat;
