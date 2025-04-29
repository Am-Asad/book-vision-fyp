"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const TakeQuizBtn = () => {
  const router = useRouter();
  return (
    <div className="mt-2">
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={() => {
          router.push("/quiz");
        }}
      >
        <Plus className="h-4 w-4" />
        Take Quiz
      </Button>
    </div>
  );
};

export default TakeQuizBtn;
