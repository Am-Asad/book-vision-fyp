"use client";

import * as React from "react";
import { useMemo } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { calculateChatHistory } from "../utils/CalculateChatHistory";
import ChatHistoryItem from "./ChatHistoryItem";
import ChatHistorySkeleton from "./Skeleton/ChatHistorySkeleton";
import useGetChatsHistory from "../hooks/useGetChatsHistory";

export function ChatHistory() {
  const { data, isLoading, isError, error } = useGetChatsHistory();

  const chatHistory = useMemo(
    () => calculateChatHistory(data?.chats || []),
    [data?.chats]
  );

  const sortedChatHistory = useMemo(() => {
    return {
      today: chatHistory.today.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
      previousWeek: chatHistory.previousWeek.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
      previousMonth: chatHistory.previousMonth.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    };
  }, [chatHistory]);

  console.log("Sorted Chat History", sortedChatHistory);

  if (isLoading) {
    return <ChatHistorySkeleton />;
  }

  if (isError) {
    return (
      <div className="flex w-full justify-center mt-6">
        <p>{error?.message || "Error fetching chat history"}</p>
      </div>
    );
  }

  return (
    <>
      {data?.chats.length === 0 && (
        <div className="flex w-full justify-center mt-6">
          <p className="text-sm text-muted-foreground">No chats found</p>
        </div>
      )}

      {sortedChatHistory.today.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Today</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sortedChatHistory.today.map((chat) => (
                <ChatHistoryItem key={chat._id} chat={chat} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {sortedChatHistory.previousWeek.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Previous 7 Days</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sortedChatHistory.previousWeek.map((chat) => (
                <ChatHistoryItem key={chat._id} chat={chat} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
      {sortedChatHistory.previousMonth.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Previous 30 Days</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sortedChatHistory.previousMonth.map((chat) => (
                <ChatHistoryItem key={chat._id} chat={chat} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </>
  );
}
