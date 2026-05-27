import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const authContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <authContext.Provider value={{ user, loading, setUser, setLoading }}>
      {children}
    </authContext.Provider>
  );
}
