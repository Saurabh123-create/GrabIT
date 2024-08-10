import React,{useContext}from 'react';
import { Context } from './Store';
import './App.css';
import Login from './components/Login';
import SignUP from './components/SignUp';
import Routing from './Routing';
import Header from './components/Header';

function App() {
  // const {name} = useContext(Context);
  let loginUser = JSON.parse(localStorage.getItem("asd"));
  console.log(loginUser,'loginUser')
  // if(loginUser == null){
  //   return(
  //     <div>
  //     <Routing/>
  //     </div>
  //   )
  // }
  return (
    <div className="App">
      <Header/>
      <Routing/>
    </div>
  );
}

export default App;
