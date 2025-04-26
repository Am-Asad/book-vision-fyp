"use client";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Ellipsis } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Chat } from "../utils/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/store/store";
import { setShowDialog } from "@/shared/utils/GlobalSlice";
import { setCurrentChat } from "@/features/chat/utils/chatSlice";
import { useEditChatTitle } from "@/features/chat/hooks/useEditChatTitle";

type ChatHistoryItemProps = {
  chat: Chat;
};

const ChatHistoryItem = ({ chat }: ChatHistoryItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { mutate: editChatTitle } = useEditChatTitle();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false); // Hide input when clicking outside
      }
    };

    if (isEditing) {
      inputRef.current?.focus();
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!e.currentTarget.value.trim()) {
        toast.error("Title cannot be empty");
      } else {
        editChatTitle({ chat_id: chat.chat_id, title: e.currentTarget.value });
      }
      setIsEditing(false);
      dispatch(setCurrentChat(null));
    }
  };

  return (
    <>
      {isEditing ? (
        <div className="flex items-center justify-between gap-3">
          <Input
            type="text"
            name="title"
            ref={inputRef}
            defaultValue={chat.title}
            onKeyDown={handleKeyDown}
          />
        </div>
      ) : (
        <Link href={`/chats/${chat.chat_id}`} key={chat.chat_id}>
          <SidebarMenuItem className="group">
            <SidebarMenuButton
              className="flex items-center justify-between gap-3"
              isActive={pathname === `/chats/${chat.chat_id}`}
            >
              {chat.title}
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Ellipsis className="group-hover:block h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      setIsEditing(true);
                      dispatch(setCurrentChat(chat));
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      dispatch(setShowDialog(true));
                      dispatch(setCurrentChat(chat));
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>
      )}
    </>
  );
};

export default ChatHistoryItem;
