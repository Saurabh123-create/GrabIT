import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUP from "./components/SignUp";
import HomePage from "./components/HomePage/HomePage";
import ProtectedRoutes from "./ProtectedRoutes";
import Products from "./components/Products/Products";
import GlobalProducts from "./components/GlobalProducts/GlobalProducts";

export default function Routing() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/globalProducts" element={<GlobalProducts />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUP />} />
    </Routes>
  );
}
