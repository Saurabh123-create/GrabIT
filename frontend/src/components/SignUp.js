import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import LoginCss from "./SignUp.module.css";
import {Link} from 'react-router-dom';
export default function SignUP() {
  const [signupData, setsignupData] = useState({
    name: "",
    password: '',
    email: "",
    confirmpassword: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleData(str,dataType){
    setsignupData(prev=>{
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
                  value={signupData.name}
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
                  value={signupData.email}
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
                  value={signupData.password}
                  className={LoginCss.input}
                  onChange={(e)=>{
                    let str = e.target.value.trimStart();
                    handleData(str, 'password')}}
                />
              </Box>
              <Box className={LoginCss.labels}>
                <div>
                  <label htmlFor="confirmpass">Confirm Password</label>
                </div>
                <input
                  id="confirmpass"
                  type="text"
                  placeholder="Please enter confirm password"
                  value={signupData.confirmpassword}
                  className={LoginCss.input}
                  onChange={(e)=>{
                    let str = e.target.value.trimStart();
                    handleData(str, 'confirmpassword')}}
                />
              </Box>
              <Box color="blue">
                <Link>Log-in</Link>
              </Box>
              <Button type="submit" variant="contained" size="large">
                SignUp
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
}
