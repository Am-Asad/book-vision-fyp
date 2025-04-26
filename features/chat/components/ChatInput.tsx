"use client";

import * as React from "react";
import { Mic, PaperclipIcon, Search, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ChatInputProps = {
  handleSendMessage: (chatInput: string) => void;
  isPending: boolean;
};

export function ChatInput({ handleSendMessage, isPending }: ChatInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const chatInput = formData.get("chatInput") as string;

    e.currentTarget.reset();
    handleSendMessage(chatInput);
  };

  return (
    <div className="relative rounded-lg border bg-background shadow-sm w-full max-w-5xl mx-auto">
      <form onSubmit={handleSubmit}>
        <Textarea
          name="chatInput"
          ref={textareaRef}
          placeholder="Ask anything..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          rows={1}
        />
        <div className="flex items-center p-2">
          <TooltipProvider>
            <div className="flex gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <PaperclipIcon className="h-4 w-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Attach file</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mic className="h-4 w-4" />
                    <span className="sr-only">Voice input</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Voice input</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          <Button
            type="submit"
            size="icon"
            className="ml-auto h-8 w-8 rounded-full"
            disabled={isPending}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
