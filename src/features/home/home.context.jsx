import React, { createContext, useState } from "react";

export const HomeContext = createContext();
export default function HomeProvider({ children }) {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <HomeContext.Provider value={{ song, loading, setSong, setLoading }}>
      {children}
    </HomeContext.Provider>
  );
}
