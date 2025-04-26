import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, User } from "lucide-react";
import { Message } from "@/features/chat/utils/types";

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* User Message (Right Side) */}
      {message.text && (
        <div className="flex justify-end items-start gap-4 p-4">
          <div className="rounded-lg bg-primary text-primary-foreground px-4 py-2 max-w-[80%]">
            <p className="text-md">{message.text}</p>
          </div>
          <Avatar className="h-8 w-8 border">
            <AvatarFallback className="bg-muted">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      {/* AI Response (Left Side) */}
      {message.response && (
        <div className="flex justify-start items-start gap-4 p-4">
          <Avatar className="h-8 w-8 border">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <BookOpen className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="rounded-lg bg-muted px-4 py-2 max-w-[80%]">
            <p className="text-md">{message.response}</p>
          </div>
        </div>
      )}
    </div>
  );
}
