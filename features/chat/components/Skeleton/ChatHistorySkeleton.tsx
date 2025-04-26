import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ChatHistorySkeleton = () => {
  return (
    <div className="p-4">
      {/* Title */}
      <p className="text-sm font-medium text-gray-500 mb-3 animate-fade">
        Today
      </p>

      {/* Skeleton List */}
      <div className="space-y-3">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg animate-pulse"
            >
              {/* File name placeholder */}
              <Skeleton className="h-5 w-40 bg-gray-200 rounded-md" />
              {/* Three-dot menu placeholder */}
              <Skeleton className="h-5 w-5 bg-gray-200 rounded-full" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatHistorySkeleton;
