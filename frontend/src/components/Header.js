import React, { useContext, useState } from "react";
import { Box, TextField } from "@mui/material";
import HeaderCss from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Store";
import Address from "./Address/Address";
export default function Header() {
  const { search, setSearch, dialogStatus, toggleDialog , selectedAddress } = useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Box className={HeaderCss.header} sx={{ position: "relative" }}>
        <Box
          onClick={() => {
            navigate("/");
          }}
        >
          Grab
        </Box>
        <Box
        onClick={()=>{
          toggleDialog("address", true)
        }}
          sx={{
            maxWidth: "320px",
            borderRadius: "4px",
            background: "white",
            position: "absolute",
            height: "45px",
            left: "180px",
            padding: "5px",
            boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.5)",
            cursor:'pointer',
          }}
        >
          <Box
            sx={{
              color: "rgb(0, 0, 0)",
              fontWeight: "800",
              marginBottom: "6px",
              fontSize: "18px",
            }}
          >
            Delivery in 8 minutes
          </Box>
          <Box
            sx={{
              color: "rgb(79, 79, 79)",
              fontSize: "13px",
              fontWeight: "800",
              width: "auto",
              maxWidth: "180px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
           {selectedAddress.str}
          </Box>
        </Box>
        <Box sx={{ width: "40dvw" }}>
          <TextField
            //   label="With normal TextField"
            placeholder="Search a product for example :- Cold Drinks"
            autoFocus={location.pathname == "/globalProducts"}
            value={search}
            onChange={(e) => {
              let str = e.target.value.trim();
              setSearch(str);
            }}
            onFocus={() => {
              navigate("/globalProducts", {
                state: { searchProduct: true },
              });
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
          <Box fontSize={'16px'} component={'span'}>LogOut</Box> <LogoutIcon sx={{ color: "red" }} />
        </Link>
      </Box>
      {dialogStatus.address && <Address />}
    </>
  );
}
