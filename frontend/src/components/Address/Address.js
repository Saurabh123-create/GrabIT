import React,{useContext} from "react";
import { Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Context } from "../../Store";

export default function Address(){
    const {Address , toggleDialog , setAddress} = useContext(Context);
    return <Box sx={{background:'white', boxShadow:'0px 0px 30px rgba(0,0,0,0.5)',borderRadius:'8px', width :'400px', height : '500px', position: 'absolute',zIndex:'2',left:'50%',top:'100px', translate:'-50% 0px'}}>
        <Box sx={{padding:'12px 12px',textAlign:'right'}} onClick={()=>{toggleDialog("address", false)}}>
        <ClearIcon fontSize="small"/>
        </Box>
        <Box sx={{padding:'0px 12px'}}>
            <Box sx={{fontSize:'14px',paddingLeft:'15px'}}>Select Saved Address</Box>
            <Box mt={2}>
            {Address.map(item=>{
            return <Box sx={{display:'flex', cursor:'pointer'}} onClick={()=>{
                setAddress(item.str);
            }}>
            <Box sx={{padding:'12px', alignContent:'center'}}>{item.icon}</Box>
            <Box sx={{wordBreak:'break-word',padding:'10px'}}>
                <Box sx={{
                    fontSize:"15px",
                    fontWeight: "600",
                    color: "rgb(28, 28, 28)",
                    marginBottom: "2px"}}>{item.type}
                </Box>
                <Box sx={{fontSize:'12px'}}>{item.str}</Box>
            </Box>
            </Box>
            })}
            </Box>
        </Box>
    </Box>
}