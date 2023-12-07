// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import Home from "./components/Home";
import Sell from "./components/Sell";
import Details from "./components/Details";
import Edit from "./components/Edit";
import "./app.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/details/:cardId" element={<Details />} />
          <Route path="/edit/:cardId" element={<Edit />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
