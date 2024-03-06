"use client";

import React, { createContext, useEffect, useState } from "react";

export const SidebarContext = createContext({
  sidebarOpen: true,
  setSidebarOpen: (value: boolean | undefined) => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarOpen, setNav] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setNav(window.innerWidth > 640);
    });
  }, []);

  function setSidebarOpen(value: boolean | undefined) {
    if (value) {
      setNav(value);
    } else {
      setNav(!sidebarOpen);
    }
  }

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
