import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Snackbar } from "@mui/material";
import LoginCss from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth != null) {
      navigate("/");
    }
  }, []);
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  function toggleSnackBar(open, message) {
    setSnackbar((prev) => {
      return { ...prev, open: true, message: message };
    });
  }
  function handleClose() {
    setSnackbar((prev) => {
      return { ...prev, open: false, message: "" };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
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
      toggleSnackBar(true, loginAPi.message);
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
                  type="text"
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
                  type="text"
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
                <Link to={"/signup"}>Sign-up</Link>
              </Box>
              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
      {snackbar.open && (
        <Snackbar
          open={snackbar.open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleClose}
          message={snackbar.message}
          autoHideDuration={3000}
        />
      )}
    </>
  );
}
