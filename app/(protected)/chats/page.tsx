"use client";

import { BookOpen, X, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import useCreateChat from "@/features/chat/hooks/useCreateChat";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import WarningDialog from "@/shared/components/WarningDialog";
import { setCurrentChat } from "@/features/chat/utils/chatSlice";
import { setShowDialog } from "@/shared/utils/GlobalSlice";
import useDeleteChat from "@/features/chat/hooks/useDeleteChat";

const ChatsPage = () => {
  const chat_id = useSelector(
    (state: RootState) => state.chat?.currentChat?.chat_id
  );
  const dispatch = useDispatch();
  const user_id = useSelector((state: RootState) => state.user.id);
  const { mutate: createChat, isPending } = useCreateChat();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: deleteChat } = useDeleteChat();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    if (!file) return;

    createChat({ file, user_id });
    setFile(null);
    fileInputRef.current!.value = "";
  };

  const handleDeleteChat = () => {
    deleteChat({ chat_id: chat_id as string });
    dispatch(setShowDialog(false));
    dispatch(setCurrentChat(null));
  };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
  //   }
  // };

  return (
    <>
      {/* Warning Dialog */}
      <WarningDialog
        title="Are you absolutely sure"
        description="This action cannot be undone. This will permanently delete your chat and remove your data from the database."
        handleDeleteChat={handleDeleteChat}
      />
      <div className="flex-1 overflow-auto p-4">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold">
            How can I help you learn today?
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Upload your pdf files and ask me anything about your studies,
            homework, or concepts you want to understand better.
          </p>
          <div className="mt-4">
            <form
              onSubmit={handleUpload}
              className="mt-6 flex flex-col items-center gap-4"
            >
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                accept=".pdf" // .pdf,.doc,.docx,.txt
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Upload className="h-5 w-5" /> Upload Document
              </Button>
              {file && (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                  <span className="text-sm font-medium">{file.name}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setFile(null);
                      fileInputRef.current!.value = "";
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              {file && (
                <Button type="submit" disabled={!file}>
                  Submit
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatsPage;
