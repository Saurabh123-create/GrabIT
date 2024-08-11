import React, { useContext } from "react";
import { Context } from "./Store";
import { Navigate, Outlet, Routes } from "react-router-dom";
export default function ProtectedRoutes() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth != null) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
