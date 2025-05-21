"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import WebSearchMessage from "@/features/web-search/components/WebSearchMessage";
import { useCreateWebSearchMutation } from "@/features/web-search/hooks/useCreateWebSearchMutation";
import {
  CombinedSearchResponse,
  WebSearchResponse,
} from "@/features/web-search/utils/types";
import { ModeToggle } from "@/shared/components/ModeToggle";
import { useAppSelector } from "@/store/store";
import { BookOpen, Send } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const WebSearchPage = () => {
  const { mutate: createWebSearch, isPending } = useCreateWebSearchMutation();
  const [query, setQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const webSearchMessages = useAppSelector(
    (state) => state?.webSearch?.webSearchMessages
  );

  // Scroll to the latest message whenever chatMessages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [webSearchMessages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    if (!query.trim()) {
      toast.error("Please enter a message");
      return;
    }
    createWebSearch(query);
    textareaRef.current?.focus();
    setQuery("");
  };

  // console.log("Web search messages in slice ", webSearchMessages);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px]">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <h1 className="text-lg font-semibold">Book Tutor</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm">
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4">
        <div className="space-y-6 h-[calc(100vh-15rem)] overflow-y-auto pb-2">
          {/* show msg for web search */}
          {webSearchMessages?.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold">
                Are you ready to search the web?
              </h2>
              <p className="mt-2 text-center text-muted-foreground">
                Ask me anything about your studies, homework, or concepts you
                want to understand better.
              </p>
            </div>
          )}
          {/* show messages for web search */}
          {webSearchMessages?.length > 0 &&
            webSearchMessages?.map(
              (message: CombinedSearchResponse, index: number) => (
                <WebSearchMessage key={index} message={message} />
              )
            )}
          {webSearchMessages?.length > 0 && isPending && (
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
          <div className="relative rounded-lg border bg-background shadow-sm w-full max-w-4xl mx-auto">
            <div className="flex gap-2 relative">
              <form onSubmit={handleSubmit} className="w-full">
                <Textarea
                  ref={textareaRef}
                  rows={5}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2"
                />
                <div className="absolute right-0 bottom-0 flex justify-end items-center p-2">
                  <Button
                    type="submit"
                    disabled={!query.trim() || isPending}
                    size="icon"
                    className="rounded-full h-8 w-8"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-2 text-center text-xs text-muted-foreground">
            Book Tutor can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSearchPage;
