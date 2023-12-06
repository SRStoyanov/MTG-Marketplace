// src/components/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Catalog from "./Catalog";
import Register from "./Auth/Register";
import Login from "./Auth/Login";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Assume you have a function to handle user authentication state
  const handleAuthStateChange = (authUser) => {
    setUser(authUser);
  };

  // eslint-disable-next-line no-unused-vars
  const handleRegisterClick = () => {
    navigate("/register");
  };

  // eslint-disable-next-line no-unused-vars
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to the Magic: The Gathering Marketplace</h1>
      <Catalog user={user} />
      {user ? (
        <>
          <p>Hello, {user.email}!</p>
        </>
      ) : (
        <>
          <p>Explore and trade Magic cards with fellow enthusiasts!</p>
          <Register onAuthStateChange={handleAuthStateChange} />
          <Login onAuthStateChange={handleAuthStateChange} />
        </>
      )}
    </div>
  );
};

export default Home;
