"use client";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { routes } from "@/shared/utils/routes";
import { logoutUser as LogoutUserReducer } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const LogoutUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <SidebarMenuButton
      className="w-full justify-start gap-2"
      onClick={() => {
        dispatch(LogoutUserReducer());
        router.push(routes.signin);
        toast.success("Logged out successfully");
      }}
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </SidebarMenuButton>
  );
};

export default LogoutUser;
