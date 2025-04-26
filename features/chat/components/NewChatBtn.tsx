"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const NewChatBtn = () => {
  const router = useRouter();
  return (
    <div className="mt-2">
      <Button
        variant="outline"
        className="w-full justify-start gap-2 border-dashed"
        onClick={() => {
          router.push("/chats");
        }}
      >
        <Plus className="h-4 w-4" />
        New chat
      </Button>
    </div>
  );
};

export default NewChatBtn;
