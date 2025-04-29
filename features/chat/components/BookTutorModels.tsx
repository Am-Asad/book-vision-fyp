"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedModel } from "../utils/chatSlice";
import { models } from "../utils/models";

const BookTutorModels = () => {
  const selectedModel = useSelector(
    (state: RootState) => state.chat.selectedModel
  );
  const dispatch = useDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Models</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {models.map((model) => {
          return (
            <DropdownMenuCheckboxItem
              key={model.name}
              checked={selectedModel === model.name}
              onCheckedChange={() => dispatch(setSelectedModel(model.name))}
            >
              {model.name}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookTutorModels;
