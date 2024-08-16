import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Context = createContext();
export default function Store({ children }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    isLogin: false,
  });
  const [search , setSearch] = useState("");
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
        search,
        setSearch
      }}
    >
      {children}
    </Context.Provider>
  );
}
