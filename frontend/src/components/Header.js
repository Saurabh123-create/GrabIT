import React from "react";
import { Box, TextField } from "@mui/material";
import HeaderCss from './Header.module.css';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
export default function Header(){
    return(
      <Box className={HeaderCss.header}>
        <Box sx={{fontSize:"30px",fontWeight:700, background:'white',color:'#FF8343', border:"2px solid #4158A6", padding:'5px', borderRadius:'10px'}}>Grab IT</Box>
        <Box sx={{width : "40dvw"}}>
        <TextField
        //   label="With normal TextField"
          sx={{ width: '100%', background : '#ffffff',borderRadius:"5px", fontSize:'22px'}}
          InputProps={{
            startAdornment:<SearchIcon sx={{marginRight : "10px"}}/>,
          }}
        />
        </Box>
        <Link className={HeaderCss.logout} to={'/login'} onClick={()=>{
          localStorage.clear();
        }}>LogOut <LogoutIcon sx={{color:'red'}}/></Link>
      </Box>
    )
}
