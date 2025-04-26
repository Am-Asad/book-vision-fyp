import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, User } from "lucide-react";

const ChatSkeleton = () => {
  return (
    <div className="p-4 space-y-4">
      {Array(6)
        .fill(null)
        .map((_, index) => {
          const isUser = index % 2 !== 0;

          return (
            <div
              key={index}
              className={cn(
                "flex w-full items-start gap-4 p-4",
                isUser ? "justify-end" : "justify-start"
              )}
            >
              {/* AI Avatar */}
              {!isUser && (
                <Avatar className="h-8 w-8 border animate-pulse">
                  <AvatarFallback className="bg-green-600 text-white">
                    <BookOpen className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              {/* Message Skeleton */}
              <div
                className={cn(
                  "rounded-lg px-4 py-3 max-w-[80%] animate-pulse",
                  isUser ? "bg-green-600" : "bg-gray-200"
                )}
              >
                <Skeleton className="h-4 w-36 bg-gray-300" />
              </div>

              {/* User Avatar */}
              {isUser && (
                <Avatar className="h-8 w-8 border animate-pulse">
                  <AvatarFallback className="bg-gray-300">
                    <User className="h-4 w-4 text-gray-500" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ChatSkeleton;
