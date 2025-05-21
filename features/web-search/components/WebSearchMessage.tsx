import React from "react";
import { CombinedSearchResponse } from "../utils/types";
import { BookOpen, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

type WebSearchMessageProps = {
  message: CombinedSearchResponse;
};

const WebSearchMessage = ({ message }: WebSearchMessageProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* User Message */}
      {message?.webSearch?.query && (
        <div className="flex justify-end items-start gap-4 p-4">
          <div className="rounded-lg bg-primary text-primary-foreground px-4 py-2 max-w-[80%]">
            <p className="text-md">{message.webSearch.query}</p>
          </div>
          <Avatar className="h-8 w-8 border">
            <AvatarFallback className="bg-muted">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      {/* AI Search Results */}
      {message?.webSearch?.results && message?.youtubeSearch?.results && (
        <div className="flex justify-start items-start gap-4 p-4">
          <Avatar className="h-8 w-8 border">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <BookOpen className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>

          <div className="rounded-lg bg-muted px-4 py-3 max-w-[80%] space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">YouTube Search Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {message.youtubeSearch.results.map((result) => {
                  const videoId = new URL(result.url).searchParams.get("v");
                  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                  return (
                    <div
                      key={result.title}
                      className="flex flex-col items-start gap-8"
                    >
                      <Image
                        src={thumbnailUrl}
                        alt={result.title}
                        width={100}
                        height={100}
                        className="w-full h-auto rounded shadow"
                      />
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline capitalize text-blue-600"
                      >
                        {result.title}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Web Search Results</h3>
              {Object.entries(message.webSearch.results).map(
                ([title, result]) => (
                  <div key={result.link} className="space-y-2">
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      {title}
                    </a>
                    <p className="text-sm text-muted-foreground">
                      {result.snippet}
                    </p>

                    {result.images && result.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {result.images.map((img) => (
                          <a
                            key={img.image_url}
                            href={img.context_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <img
                              src={img.image_url}
                              alt={img.title}
                              className="w-full h-auto rounded-md border"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebSearchMessage;
