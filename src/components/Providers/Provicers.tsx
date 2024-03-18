import { SidebarProvider } from "../Contexts/SidebarContext";
import React from "react";
import { LoggedUserProvider } from "@/components/Contexts/LoggedUserContext";
import {
  LoadingContext,
  LoadingProvider,
} from "@/components/Contexts/LoadingContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoadingProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </LoadingProvider>
  );
};
