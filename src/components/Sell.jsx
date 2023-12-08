// src/components/Sell.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { addMTGCard } from "../services/firebaseUtils";
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

  const handleFindInGatherer = async () => {
    try {
      // Update cardName with the input value
      const currentCardName = cardName;
      setCardName(""); // Clear the input field

      // Use the MTG API to search for card details using the updated cardName
      const response = await fetch(
        `https://api.magicthegathering.io/v1/cards?name=${currentCardName}`
      );
      const data = await response.json();

      // Check if there is at least one card found
      if (data.cards && data.cards.length > 0) {
        const firstCard = data.cards[0]; // Assuming the first card is the desired one

        // Update other input fields with gathered information
        setCardName(firstCard.name || "");
        setRarity(firstCard.rarity || "");
        setExpansion(firstCard.set || "");
        setImageUrl(firstCard.imageUrl || "");
        setGathererUrl(
          `https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${
            firstCard.multiverseid || ""
          }`
        );
      } else {
        alert("Card not found on Gatherer.");
      }
    } catch (error) {
      console.error("Error searching for card:", error);
    }
  };

  return (
    <div id="root">
      <h2>Sell a Card</h2>
      <label>Card Name:</label>
      <input
        className="sellInput"
        type="text"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />
      <button id="findInGathererButton" onClick={handleFindInGatherer}>
        Find in Gatherer
      </button>
      <label>Rarity:</label>
      <input
        className="sellInput"
        type="text"
        value={rarity}
        onChange={(e) => setRarity(e.target.value)}
      />
      <label>Expansion:</label>
      <input
        className="sellInput"
        type="text"
        value={expansion}
        onChange={(e) => setExpansion(e.target.value)}
      />
      <label>Price:</label>
      <input
        className="sellInput"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Image URL:</label>
      <input
        className="sellInput"
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <label>Gatherer URL:</label>
      <input
        className="sellInput"
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
