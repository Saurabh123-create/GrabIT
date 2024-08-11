import React, { useContext, useEffect, useState } from "react";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import LoginCss from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [error, seterror] = useState({
    name: "",
    password: "",
    email: "",
  });
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type : "success",
  });

  function toggleSnackBar(open, message , type='success') {
    setSnackbar((prev) => {
      return { ...prev,open, message, type};
    });
  }

  function handleClose() {
    setSnackbar((prev) => {
      return { ...prev, open: false, message: "" };
    });
  }

  function handleError() {
    let execute = true;
    for (let item in loginData) {
      if (loginData[item] == "") {
        execute = false;
        seterror((prev) => {
          return { ...prev, [item]: `Please enter ${item}` };
        });
      } else {
        seterror((prev) => {
          return { ...prev, [item]: `` };
        });
      }
    }
    return execute;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let exe = handleError();
    if (!exe) {
      return;
    }
    try{
        let loginAPi = await fetch("http://localhost:4000/login", {
          method: "Post",
          body: JSON.stringify(loginData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        loginAPi = await loginAPi.json();
        if (loginAPi.status == "success") {
          localStorage.setItem("auth", JSON.stringify(loginAPi.auth));
          localStorage.setItem("user", JSON.stringify(loginAPi.data));
          toggleSnackBar(true, "Login Successfull");
          navigate("/");
        } else {
          toggleSnackBar(true, loginAPi.message , 'error');
        }
    }catch(err){
        toggleSnackBar(true, err.message , 'error');
    }
  }

  function handleData(str, dataType) {
    setLoginData((prev) => {
      return { ...prev, [dataType]: str };
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box className={LoginCss.parentBox}>
          <Box className={LoginCss.loginImg}></Box>
          <Box className={LoginCss.loginBox}>
            <Box>
              <Box textAlign={"center"} fontSize={"30px"} fontWeight={600}>
                Login Page
              </Box>
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
                  onChange={(e) => {
                    let str = e.target.value.trimStart();
                    handleData(str, "name");
                  }}
                />
              </Box>
              <Box className={LoginCss.labels}>
                <div>
                  <label htmlFor="email">Email</label>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Please enter email"
                  value={loginData.email}
                  className={LoginCss.input}
                  onChange={(e) => {
                    let str = e.target.value.trimStart();
                    handleData(str, "email");
                  }}
                />
              </Box>
              <Box className={LoginCss.labels}>
                <div>
                  <label htmlFor="pass">Password</label>
                </div>
                <input
                  id="pass"
                  type="password"
                  placeholder="Please enter password"
                  value={loginData.password}
                  className={LoginCss.input}
                  onChange={(e) => {
                    let str = e.target.value.trimStart();
                    handleData(str, "password");
                  }}
                />
              </Box>
              <Box color="blue">
                <Link style={{textDecoration : "none"}} to={"/signup"}>Sign-up</Link>
              </Box>
              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
              <Box sx={{ color: "red" }}>
                <ul>
                  {error.name && <li>{error.name}</li>}
                  {error.email && <li>{error.email}</li>}
                  {error.password && <li>{error.password}</li>}
                </ul>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
      {snackbar.open && (
        <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      )}
    </>
  );
}
