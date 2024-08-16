import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUP from "./components/SignUp";
import HomePage from "./components/HomePage/HomePage";
import ProtectedRoutes from "./ProtectedRoutes";
import Products from "./components/Products/Products";

export default function Routing() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUP />} />
    </Routes>
  );
}
