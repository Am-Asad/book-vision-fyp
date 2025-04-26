import { useQuery } from "@tanstack/react-query";
import { getChatsHistory } from "../utils/chatApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useGetChatsHistory = () => {
  const userId = useSelector((state: RootState) => state.user.id);

  return useQuery({
    queryKey: ["chatsHistory", userId],
    queryFn: async () => {
      return await getChatsHistory(userId);
    },
    enabled: !!userId,
  });
};

export default useGetChatsHistory;
