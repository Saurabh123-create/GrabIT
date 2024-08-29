import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";

export const Context = createContext();
export default function Store({ children }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    isLogin: false,
  });
  const [dialogStatus , setDialogStatus] = useState({
    address : false,
    paytab : false,
  })
  const [totalCalc, setTotalCalc] = useState({
    subtotal: 0,
    total: 0,
    delivery: 0,
    handlingCost: 0,
  });

  
  const [selectedAddress , setAddress] = useState({})
  const Address = [
    {
      icon: <HomeIcon />,
      str: "88, Gurukripa, Jawahar Nagar Road No.1, Opp. Jain Temple, Goregaon",
      type:'Home',
    },
    {
      icon: <ApartmentIcon />,
      str: "11/13, Ruturaj Bldg., Juhu Road, Near Lido Cinema , Santacruz (w), Juhu",
      type:'Office',
    },
  ];
  const [search, setSearch] = useState("");
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth != null) {
      navigate("/");
    }
  }, []);

  function toggleDialog(name, value){
    setDialogStatus((prev)=>{
      return {...prev , [name] : value}
    })
  }

  return (
    <Context.Provider
      value={{
        loginData,
        search,
        setSearch,
        Address,
        dialogStatus,
        toggleDialog,
        selectedAddress,
        setAddress,
        totalCalc, setTotalCalc
      }}
    >
      {children}
    </Context.Provider>
  );
}
