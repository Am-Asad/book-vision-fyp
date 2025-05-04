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
import { Model, setSelectedModel } from "../utils/chatSlice";
import { models } from "../utils/models";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const BookTutorModels = () => {
  const selectedModel = useSelector(
    (state: RootState) => state.chat.selectedModel
  );
  const dispatch = useDispatch();

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">
            Select a model to use for your chat
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Models</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {models.map((model) => {
            return (
              <DropdownMenuCheckboxItem
                key={model.name}
                checked={selectedModel === model.name}
                onCheckedChange={() =>
                  dispatch(setSelectedModel(model.name as Model))
                }
              >
                {model.name}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

export default BookTutorModels;
