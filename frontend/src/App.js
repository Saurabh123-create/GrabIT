import React, { useContext } from "react";
import { Context } from "./Store";
import "./App.css";
import Login from "./components/Login";
import SignUP from "./components/SignUp";
import Routing from "./Routing";
import Header from "./components/Header";
import PayTab from "./components/PayTab/PayTab";
function App() {
  const {toggleDialog, dialogStatus} = useContext(Context);
  return (
    <div className="App">
      <Routing />
      {
        dialogStatus.paytab &&(
          <PayTab />
        )
      }
    </div>
  );
}

export default App;
