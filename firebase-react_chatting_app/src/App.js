import React from "react";
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import ChatPage from "./components/ChatPage/ChatPage.js";
import LoginPage from "./components/LoginPage/LoginPage.js";
import RegisterPage from "./components/RegisterPage/RegisterPage.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<ChatPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />

      </Routes>
    </Router>
    
  );
}

export default App;
