import * as React from "react";
import { BookOpen, ChevronDown, Settings, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChatHistory } from "@/features/chat/components/ChatHistory";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/shared/components/ModeToggle";
import NewChatBtn from "@/features/chat/components/NewChatBtn";
import AuthWrapper from "@/features/auth/components/AuthWrapper";
import LogoutUser from "@/features/chat/components/LogoutUser";
import TakeQuizBtn from "@/features/chat/components/TakeQuizBtn";

const ChatsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="relative">
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar className="border-r" variant="sidebar" collapsible="offcanvas">
          {/* Sidebar header */}
          <SidebarHeader className="border-b px-2 py-2">
            <div className="flex items-center justify-between">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    size="lg"
                    className="w-full justify-start gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">Book Tutor</span>
                      </div>
                    </div>
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
            <NewChatBtn />
            <TakeQuizBtn />
          </SidebarHeader>
          {/* Sidebar content */}
          <SidebarContent>
            {/* Chat History */}
            <ChatHistory />
          </SidebarContent>
          {/* Sidebar footer */}
          <SidebarFooter className="border-t p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start gap-2">
                  <User2 className="h-4 w-4" />
                  <span>Your Account</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <LogoutUser />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        {/* Main content */}
        <SidebarInset className="flex flex-col">
          {/* Header */}
          <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px]">
            <SidebarTrigger />
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold">Book Tutor</h1>
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
          {/* Main Content */}
          <main className="flex flex-1 flex-col">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ChatsLayout;
