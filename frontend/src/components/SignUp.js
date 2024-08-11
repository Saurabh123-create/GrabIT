import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import LoginCss from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
export default function SignUP() {
  const navigate = useNavigate();
  const [signupData, setsignupData] = useState({
    name: "",
    password: "",
    email: "",
    confirmpassword: "",
  });

  const [error, seterror] = useState({
    name: "",
    password: "",
    email: "",
    confirmpassword: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  function toggleSnackBar(open, message, type = "success") {
    setSnackbar((prev) => {
      return { ...prev, open, message, type };
    });
  }
  function handleClose() {
    setSnackbar((prev) => {
      return { ...prev, open: false, message: "" };
    });
  }

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth != null) {
      navigate("/");
    }
  }, []);

  function handleError() {
    let execute = true;
    for (let item in signupData) {
      if (signupData[item] == "") {
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
    if (signupData.confirmpassword != signupData.password) {
      toggleSnackBar(true, "Password Missmatch", "error");
      return;
    }

    let result = await fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.status == "success") {
      localStorage.setItem("auth", JSON.stringify(result.auth));
      localStorage.setItem("auth", JSON.stringify(result.data));
      toggleSnackBar(true, "SignUp successfull");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  function handleData(str, dataType) {
    setsignupData((prev) => {
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
                SignUp Page
              </Box>
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
                  value={signupData.email}
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
                  value={signupData.password}
                  className={LoginCss.input}
                  onChange={(e) => {
                    let str = e.target.value.trimStart();
                    handleData(str, "password");
                  }}
                />
              </Box>
              <Box className={LoginCss.labels}>
                <div>
                  <label htmlFor="confirmpass">Confirm Password</label>
                </div>
                <input
                  id="confirmpass"
                  type="password"
                  placeholder="Please enter confirm password"
                  value={signupData.confirmpassword}
                  className={LoginCss.input}
                  onChange={(e) => {
                    let str = e.target.value.trimStart();
                    handleData(str, "confirmpassword");
                  }}
                />
              </Box>
              <Box color="blue">
                <Link style={{textDecoration : "none"}} to={"/login"}>Log-in</Link>
              </Box>
              <Button type="submit" variant="contained" size="large">
                SignUp
              </Button>
              <Box sx={{ color: "red" }}>
                <ul>
                  {error.name && <li>{error.name}</li>}
                  {error.email && <li>{error.email}</li>}
                  {error.password && <li>{error.password}</li>}
                  {error.confirmpassword && <li>{error.confirmpassword}</li>}
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
