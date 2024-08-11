import React, { useContext } from "react";
import { Context } from "./Store";
import { Navigate, Outlet, Routes } from "react-router-dom";
export default function ProtectedRoutes() {
  const { loginData } = useContext(Context);
  if (loginData.isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
