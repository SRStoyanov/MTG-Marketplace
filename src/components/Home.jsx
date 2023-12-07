// src/components/Home.jsx
import Catalog from "./Catalog";
import { useAuth } from "../services/AuthContext"; // Import your actual AuthContext
import "./home.css";

const Home = () => {
  const { user } = useAuth(); // Replace with your actual AuthContext

  return (
    <div>
      <h1>Welcome to MTG Marketplace</h1>
      <Catalog user={user} />
    </div>
  );
};

export default Home;
