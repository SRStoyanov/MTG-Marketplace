// src/components/Edit.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "./Navbar";
import { editMTGCard } from "../services/firebaseUtils";
import "./sell.css";

const Edit = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState({
    cardName: "",
    rarity: "",
    expansion: "",
    price: "",
    imageUrl: "",
    gathererUrl: "",
  });

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        // Fetch the card details based on cardId
        const cardDoc = await getDoc(doc(db, "mtg-cards", cardId));

        if (cardDoc.exists()) {
          const cardData = cardDoc.data();
          setCard(cardData);
        } else {
          console.log("Card not found");
        }
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    fetchCardDetails();
  }, [cardId]);

  const handleEdit = async () => {
    try {
      // Ensure all fields are filled before proceeding
      if (
        !card.cardName ||
        !card.rarity ||
        !card.expansion ||
        !card.price ||
        !card.imageUrl ||
        !card.gathererUrl
      ) {
        alert("Please fill in all fields.");
        return;
      }

      // Update the card document in Firestore using editMTGCard function
      await editMTGCard(cardId, {
        cardName: card.cardName,
        rarity: card.rarity,
        expansion: card.expansion,
        price: parseFloat(card.price), // Convert price to a number
        imageUrl: card.imageUrl,
        gathererUrl: card.gathererUrl,
      });

      console.log("Card updated successfully");

      // Redirect to the card details page after updating the card
      navigate(`/details/${cardId}`);
    } catch (error) {
      console.error("Error updating card:", error);
      // Handle error (display an alert or redirect to an error page)
    }
  };

  return (
    <div id="root">
      <Navbar />
      <h2>Edit Card</h2>
      <label>Card Name:</label>
      <input
        type="text"
        value={card.cardName}
        onChange={(e) => setCard({ ...card, cardName: e.target.value })}
      />
      <label>Rarity:</label>
      <input
        type="text"
        value={card.rarity}
        onChange={(e) => setCard({ ...card, rarity: e.target.value })}
      />
      <label>Expansion:</label>
      <input
        type="text"
        value={card.expansion}
        onChange={(e) => setCard({ ...card, expansion: e.target.value })}
      />
      <label>Price:</label>
      <input
        type="number"
        value={card.price}
        onChange={(e) => setCard({ ...card, price: e.target.value })}
      />
      <label>Image URL:</label>
      <input
        type="text"
        value={card.imageUrl}
        onChange={(e) => setCard({ ...card, imageUrl: e.target.value })}
      />
      <label>Gatherer URL:</label>
      <input
        type="text"
        value={card.gathererUrl}
        onChange={(e) => setCard({ ...card, gathererUrl: e.target.value })}
      />

      <button id="sellButton" onClick={handleEdit}>
        Edit Card
      </button>
    </div>
  );
};

export default Edit;
