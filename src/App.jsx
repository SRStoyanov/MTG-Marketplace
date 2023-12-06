// src/App.jsx
// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Router, Route, Routes } from "react-router";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Home from "./components/Home"; // Assuming you have a Home component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
