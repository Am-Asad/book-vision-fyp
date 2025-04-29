import AuthWrapper from "@/features/auth/components/AuthWrapper";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthWrapper>{children}</AuthWrapper>;
};

export default ProtectedLayout;
