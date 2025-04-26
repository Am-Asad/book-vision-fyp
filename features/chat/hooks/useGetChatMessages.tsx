import { useQuery } from "@tanstack/react-query";
import { getChatMessages } from "../utils/chatApi";

export const useGetChatMessages = (chat_id: string) => {
  return useQuery({
    queryKey: ["chatMessages", chat_id],
    queryFn: async () => getChatMessages(chat_id),
    enabled: !!chat_id,
    retry: 2,
  });
};
