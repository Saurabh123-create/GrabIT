import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Context = createContext();
export default function Store({ children }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    isLogin: false,
  });
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth != null) {
      navigate("/");
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
