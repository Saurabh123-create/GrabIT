import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUP from "./components/SignUp";
import HomePage from "./components/HomePage";

export default function Routing(){
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUP/>}/>
            <Route path="/" element={<HomePage/>}/>
        </Routes>
    )
}
