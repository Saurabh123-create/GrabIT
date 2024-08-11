import React,{useContext}from 'react';
import { Context } from './Store';
import './App.css';
import Login from './components/Login';
import SignUP from './components/SignUp';
import Routing from './Routing';
import Header from './components/Header';

function App() {
  const {loginData} = useContext(Context);
  return (
    <div className="App">
      <Routing/>
    </div>
  );
}

export default App;
