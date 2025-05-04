"use client";
import { ChatInput } from "@/features/chat/components/ChatInput";
import { ChatMessage } from "@/features/chat/components/ChatMessage";
import { RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useGetChatMessages } from "@/features/chat/hooks/useGetChatMessages";
import ChatMessageSkeleton from "@/features/chat/components/Skeleton/ChatMessageSkeleton";
import { useSendMessage } from "@/features/chat/hooks/useSendMessage";
import { Message } from "@/features/chat/utils/types";
import { useEffect, useRef } from "react";
import WarningDialog from "@/shared/components/WarningDialog";
import { setShowDialog } from "@/shared/utils/GlobalSlice";
import { setCurrentChat } from "@/features/chat/utils/chatSlice";
import useDeleteChat from "@/features/chat/hooks/useDeleteChat";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { id: chat_id } = useParams();
  const chatId = useSelector(
    (state: RootState) => state?.chat?.currentChat?.chat_id
  );
  const selectedModel = useSelector(
    (state: RootState) => state.chat.selectedModel
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    data: chatMessages,
    isLoading,
    isError,
    error,
  } = useGetChatMessages(chat_id as string);
  const { mutate: sendMessage, isPending } = useSendMessage();
  const { mutate: deleteMessage } = useDeleteChat();

  const handleSendMessage = (user_prompt: string) => {
    sendMessage({
      chat_id: chat_id as string,
      user_prompt,
      model: selectedModel,
    });
  };

  const handleDeleteChat = () => {
    deleteMessage({ chat_id: chatId as string });
    dispatch(setShowDialog(false));
    dispatch(setCurrentChat(null));
  };

  // Scroll to the latest message whenever chatMessages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  if (isLoading) {
    return <ChatMessageSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>{error?.message || "Error fetching chat messages"}</p>
      </div>
    );
  }

  if (chatMessages?.length === 0) {
    return (
      <>
        <WarningDialog
          title="Are you absolutely sure"
          description="This action cannot be undone. This will permanently delete your chat and remove your data from the database."
          handleDeleteChat={handleDeleteChat}
        />
        <div className="flex h-full w-full items-center justify-center">
          <p>
            You have uploaded your pdf file. Start chatting with your tutor.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <ChatInput
            handleSendMessage={handleSendMessage}
            isPending={isPending}
          />
          <div className="mt-2 text-center text-xs text-muted-foreground">
            Book Tutor can make mistakes. Check important info.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Warning Dialog */}
      <WarningDialog
        title="Are you absolutely sure"
        description="This action cannot be undone. This will permanently delete your chat and remove your data from the database."
        handleDeleteChat={handleDeleteChat}
      />
      {/*  */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6 h-[calc(100vh-15rem)] overflow-y-auto pb-2">
          {chatMessages?.map((message: Message, index: number) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isPending && (
            <div className="flex items-center space-x-2 ml-2">
              <div className="h-3 w-3 animate-pulse rounded-full bg-primary"></div>
              <div
                className="h-3 w-3 animate-bounce rounded-full bg-primary"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="h-3 w-3 animate-bounce rounded-full bg-primary"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <ChatInput
            handleSendMessage={handleSendMessage}
            isPending={isPending}
          />
          {/* <ChatInput
            handleSendMessage={handleSendMessage}
            isPending={isPending}
          /> */}
          <div className="mt-2 text-center text-xs text-muted-foreground">
            Book Tutor can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
