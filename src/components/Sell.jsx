// src/components/Sell.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { addMTGCard } from "../services/firebaseUtils";
import Navbar from "./Navbar";
import "./sell.css";

const Sell = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cardName, setCardName] = useState("");
  const [rarity, setRarity] = useState("");
  const [expansion, setExpansion] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gathererUrl, setGathererUrl] = useState("");

  const handleSell = async () => {
    try {
      // Ensure all fields are filled before proceeding
      if (
        !cardName ||
        !rarity ||
        !expansion ||
        !price ||
        !imageUrl ||
        !gathererUrl
      ) {
        alert("Please fill in all fields.");
        return;
      }

      // Create a new card document in Firestore
      const cardId = await addMTGCard({
        cardName,
        rarity,
        expansion,
        price: parseFloat(price), // Convert price to a number
        imageUrl,
        gathererUrl,
        sellerId: user.uid, // Assign the current user's ID as the sellerId
      });

      console.log("Card added with ID: ", cardId);

      // Redirect to the homepage after adding the card
      navigate("/");
    } catch (error) {
      console.error("Error adding card:", error);
      // Handle error (display an alert or redirect to an error page)
    }
  };

  return (
    <div id="root">
      <Navbar />
      <h2>Sell a Card</h2>
      <label>Card Name:</label>
      <input
        type="text"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />
      <label>Rarity:</label>
      <input
        type="text"
        value={rarity}
        onChange={(e) => setRarity(e.target.value)}
      />
      <label>Expansion:</label>
      <input
        type="text"
        value={expansion}
        onChange={(e) => setExpansion(e.target.value)}
      />
      <label>Price:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Image URL:</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <label>Gatherer URL:</label>
      <input
        type="text"
        value={gathererUrl}
        onChange={(e) => setGathererUrl(e.target.value)}
      />

      <button id="sellButton" onClick={handleSell}>
        Put up for Sale
      </button>
    </div>
  );
};

export default Sell;
