import { Chat } from "./types";

export const calculateChatHistory = (chats: Chat[]) => {
  const today = new Date();

  const todayChats = chats.filter((chat) => {
    const chatDate = new Date(chat.created_at);
    return chatDate.toDateString() === today.toDateString();
  });

  const previousWeekChats = chats.filter((chat) => {
    const chatDate = new Date(chat.created_at);
    const diffTime = Math.abs(today.getTime() - chatDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && !todayChats.includes(chat);
  });

  const previousMonthChats = chats.filter((chat) => {
    const chatDate = new Date(chat.created_at);
    const diffTime = Math.abs(today.getTime() - chatDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (
      diffDays <= 30 &&
      !todayChats.includes(chat) &&
      !previousWeekChats.includes(chat)
    );
  });

  return {
    today: todayChats,
    previousWeek: previousWeekChats,
    previousMonth: previousMonthChats,
  };
};
