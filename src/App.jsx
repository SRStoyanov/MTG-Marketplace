// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import Home from "./components/Home";
import Sell from "./components/Sell";
import "./app.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Sell />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
