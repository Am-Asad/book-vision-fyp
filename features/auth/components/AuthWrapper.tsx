"use client";
import { routes } from "@/shared/utils/routes";
import { RootState } from "@/store/store";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/features/auth/utils/authApi";
import { loginUser, logoutUser } from "@/store/userSlice";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, expiresAt } = useSelector(
    (state: RootState) => state.user
  );
  const [checkingAuth, setCheckingAuth] = useState(true);

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: !!isAuthenticated,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        dispatch(
          loginUser({
            email: user.email,
            id: user.id,
            expiresAt,
            isAuthenticated,
          })
        );
      } else {
        dispatch(logoutUser());
        toast.error("Please Login to continue");
        router.push(routes.signin);
      }
      setCheckingAuth(false);
    }
  }, [user, isLoading, dispatch, router]);

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2Icon className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
