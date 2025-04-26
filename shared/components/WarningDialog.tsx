"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import { setShowDialog } from "../utils/GlobalSlice";
import { setCurrentChat } from "@/features/chat/utils/chatSlice";

type WarningDialogProps = {
  title: string;
  description: string;
  handleDeleteChat: () => void;
};

const WarningDialog = ({
  title,
  description,
  handleDeleteChat,
}: WarningDialogProps) => {
  const showDialog = useSelector((state: RootState) => state.global.showDialog);
  const dispatch = useAppDispatch();

  if (!showDialog) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-background rounded-lg p-4">
        <AlertDialog open={showDialog}>
          <AlertDialogContent className="">
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => dispatch(setShowDialog(false))}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteChat}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default WarningDialog;
