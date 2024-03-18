"use client";

import React, { createContext, useEffect, useState } from "react";
import { getLoggedUser } from "@/actions";
import { User } from "@/types/user";

export const LoggedUserContext = createContext({} as User);

export const LoggedUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    getLoggedUser().then((response) => {
      setUser(response);
    });
  }, []);
  return (
    <LoggedUserContext.Provider value={user}>
      {children}
    </LoggedUserContext.Provider>
  );
};
