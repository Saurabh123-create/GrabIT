import React, { useContext } from "react";
import { Box, TextField } from "@mui/material";
import HeaderCss from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Store";
export default function Header() {
  const { search, setSearch } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box className={HeaderCss.header}>
      <Box
        onClick={() => {
          navigate("/");
        }}
      >
        Grab
      </Box>
      <Box sx={{ width: "40dvw" }}>
        <TextField
          //   label="With normal TextField"
          placeholder="Search a product for example :- Cold Drinks"
          autoFocus={location.pathname == "/products"}
          value={search}
          onChange={(e) => {
            let str = e.target.value.trim();
            setSearch(str);
          }}
          onFocus={() => {
            navigate("/products");
          }}
          sx={{
            width: "100%",
            background: "#ffffff",
            borderRadius: "5px",
            fontSize: "22px",
          }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ marginRight: "10px" }} />,
          }}
        />
      </Box>
      <Link
        className={HeaderCss.logout}
        to={"/login"}
        onClick={() => {
          localStorage.clear();
        }}
      >
        LogOut <LogoutIcon sx={{ color: "red" }} />
      </Link>
    </Box>
  );
}
