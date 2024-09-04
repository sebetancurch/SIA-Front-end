import { SidebarProvider } from "../Contexts/SidebarContext";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};
