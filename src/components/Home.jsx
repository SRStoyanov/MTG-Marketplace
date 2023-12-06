import { useNavigate } from "react-router-dom";
import "../App.css";
import FirebaseTest from "./../FirebaseTest";

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to the Magic: The Gathering Marketplace</h1>
      <p>Explore and trade Magic cards with fellow enthusiasts!</p>

      <button onClick={handleRegisterClick}>Register</button>
      <button onClick={handleLoginClick}>Login</button>

      <FirebaseTest />
    </div>
  );
};

export default Home;
