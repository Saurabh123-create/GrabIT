import React,{useContext}from 'react';
import { Context } from './Store';
import './App.css';
import Login from './components/Login';
import SignUP from './components/SignUp';

function App() {
  // const {name} = useContext(Context);
  return (
    <div className="App">
      {/* <Login/> */}
      <SignUP/>
    </div>
  );
}

export default App;
