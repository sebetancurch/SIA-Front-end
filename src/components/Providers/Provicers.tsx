import { SidebarProvider } from "../Contexts/SidebarContext";
import { LoggedUserProvider } from "@/components/Contexts/LoggedUserContext";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoggedUserProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </LoggedUserProvider>
  );
};
