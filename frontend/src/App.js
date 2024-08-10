import React,{useContext}from 'react';
import { Context } from './Store';
import './App.css';
import Login from './components/Login';

function App() {
  // const {name} = useContext(Context);
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
