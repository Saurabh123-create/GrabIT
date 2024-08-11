import React, { createContext, useEffect, useState } from "react";
export const Context = createContext();
export default function Store({ children }) {
  const [loginData, setLoginData] = useState({
    isLogin: false,
  });
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth != null) {
      setLoginData((prev) => {
        return { ...prev, isLogin: true };
      });
    }
  }, []);

  return (
    <Context.Provider
      value={{
        loginData,
      }}
    >
      {children}
    </Context.Provider>
  );
}
