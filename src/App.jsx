// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./services/AuthContext";
import { SearchProvider } from "./services/useSearch";

import Home from "./components/Home";
import Sell from "./components/Sell";
import Details from "./components/Details";
import Edit from "./components/Edit";
import Catalog from "./components/Catalog";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/details/:cardId" element={<Details />} />
            <Route path="/edit/:cardId" element={<Edit />} />
            <Route
              path="/my-sales"
              element={<CatalogWrapper filter="sellerId" />}
            />
            <Route
              path="/my-buys"
              element={<CatalogWrapper filter="buyerId" />}
            />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
};

const CatalogWrapper = ({ filter }) => {
  const { user } = useAuth();
  return <Catalog user={user} filter={filter} />;
};

export default App;
