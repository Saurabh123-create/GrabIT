import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import LoginCss from "./Login.module.css";
export default function Login() {
  const [loginData, setLoginData] = useState({
    name: "",
    password: '',
    email: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleData(str,dataType){
    setLoginData(prev=>{
        return {...prev, [dataType]:str}
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box className={LoginCss.parentBox}>
          <Box className={LoginCss.loginImg}></Box>
          <Box className={LoginCss.loginBox}>
            <Box>
              <Box className={LoginCss.labels}>
                <div>
                  <label htmlFor="name">Name</label>
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Please enter name"
                  value={loginData.name}
                  className={LoginCss.input}
                  onChange={(e)=>{
                    let str = e.target.value.trimStart();
                    handleData(str, 'name')}}
                />
              </Box>
              <Box className={LoginCss.labels}>
                <div>
                  <label htmlFor="email">Email</label>
                </div>
                <input
                  id="email"
                  type="text"
                  placeholder="Please enter email"
                  value={loginData.email}
                  className={LoginCss.input}
                  onChange={(e)=>{
                    let str = e.target.value.trimStart();
                    handleData(str, 'email')}}
                />
              </Box>
              <Box className={LoginCss.labels}>
                <div>
                  <label htmlFor="pass">Password</label>
                </div>
                <input
                  id="pass"
                  type="text"
                  placeholder="Please enter password"
                  value={loginData.password}
                  className={LoginCss.input}
                  onChange={(e)=>{
                    let str = e.target.value.trimStart();
                    handleData(str, 'password')}}
                />
              </Box>
              <Box color="blue">
                <span style={{ cursor: "pointer" }}>Sign-Up</span>
              </Box>
              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
}
