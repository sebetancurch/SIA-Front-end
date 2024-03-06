"use client";

import React, { createContext, useState } from "react";
import { Session } from "@/types/user";

export const LoggedUserContext = createContext({
  session: {},
  setSession: (value: Session | undefined) => {},
});

export const LoggedUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setUser] = useState({});

  function setSession(value: any) {
    setUser(value as Session);
  }

  return (
    <LoggedUserContext.Provider value={{ session, setSession }}>
      {children}
    </LoggedUserContext.Provider>
  );
};
