"use client";

import React, { createContext, useState } from "react";
import { Session } from "@/types/user";

export const LoadingContext = createContext({
  loading: false,
  setLoading: (value: boolean) => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  function setLoading(value: boolean) {
    setIsLoading(value);
  }

  return (
    <LoadingContext.Provider value={{ loading: isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
