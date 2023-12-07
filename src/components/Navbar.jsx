// src/components/Navbar.jsx
import { useSearch } from "../services/useSearch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import "./navbar.css"; // Import the custom CSS

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, register, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { searchQuery, setSearchQuery } = useSearch(); // Access searchQuery and setSearchQuery from the hook

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleAuth = async (isRegistering) => {
    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      setErrorMessage(""); // Clear any previous error message
      // You can redirect the user or perform other actions after successful authentication
    } catch (error) {
      console.error("Authentication error:", error.code, error.message);

      // Customize error message based on Firebase error code
      switch (error.code) {
        case "auth/invalid-email":
          setErrorMessage("Error: Invalid email.");
          break;
        // Add more cases as needed for other error codes
        default:
          setErrorMessage("Error: Authentication failed.");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update the searchQuery when the user types
  };

  return (
    <nav>
      <div className="menu">
        <a href="/" className="nav-link">
          Catalog
        </a>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
        />

        {!user ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={() => handleAuth(true)} className="nav-link">
              Register
            </button>
            <button onClick={() => handleAuth(false)} className="nav-link">
              Login
            </button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </>
        ) : (
          <>
            <a href="/my-sales" className="nav-link">
              My Sales
            </a>
            <a href="/my-buys" className="nav-link">
              My Buys
            </a>
            <a href="/sell" className="nav-link">
              Sell Card
            </a>
            <span>Welcome, {user.email}!</span>
            <button onClick={handleLogout} className="nav-link">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
