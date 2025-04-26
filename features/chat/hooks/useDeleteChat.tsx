import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { setCurrentChat } from "../utils/chatSlice";
import { deleteChat } from "../utils/chatApi";
import { store } from "@/store/store";

const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  return useMutation({
    mutationFn: async ({ chat_id }: { chat_id: string }) => {
      return await deleteChat(chat_id);
    },
    onMutate: () => {
      const toastId = toast.loading("Deleting chat...");
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      try {
        toast.success(data?.message, { id: context?.toastId });
        store.dispatch(setCurrentChat(null));
        queryClient.invalidateQueries({ queryKey: ["chatsHistory"] });
        if (pathname.includes(variables?.chat_id)) {
          router.push(`/chats`);
        }
      } catch (error) {
        console.error("Error deleting chat:", error);
        toast.error("Error deleting chat", { id: context?.toastId });
      }
    },
    onError: (error, _, context) => {
      console.error("delete chat error", error);
      toast.error(error?.message, {
        id: context?.toastId,
      });
    },
  });
};

export default useDeleteChat;
