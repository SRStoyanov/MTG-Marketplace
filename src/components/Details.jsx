// src/components/Details.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../services/AuthContext";
import { deleteMTGCard, buyMTGCard } from "../services/firebaseUtils";
import { formatTimestamp } from "../services/dateUtils";
import "./Details.css";

const Details = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        // Fetch the card details based on cardId
        const cardDoc = await getDoc(doc(db, "mtg-cards", cardId));

        if (cardDoc.exists()) {
          const cardData = cardDoc.data();
          setCard(cardData);

          // Check if the logged-in user is the creator of the card
          setIsCreator(user && user.uid === cardData.sellerId);
        } else {
          console.log("Card not found");
        }
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    fetchCardDetails();
  }, [cardId, user]);

  const handleEdit = async () => {
    try {
      // Redirect to an edit page (you can customize this based on your app structure)
      navigate(`/edit/${cardId}`);
    } catch (error) {
      console.error("Error editing card:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMTGCard(cardId, user.uid);
      // Redirect to the homepage or another appropriate page after deletion
      navigate("/");
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleBuy = async () => {
    try {
      // Check if the card has already been bought
      if (card.isBought) {
        console.log(`Card already bought on ${formatTimestamp(card.boughtAt)}`);
        return;
      }

      // Update the card with buyerId and boughtAt
      await buyMTGCard(cardId, user.uid);

      // Refresh card data to reflect changes
      const updatedCardDoc = await getDoc(doc(db, "mtg-cards", cardId));
      const updatedCardData = updatedCardDoc.data();

      // Update local state with updated card data
      setCard(updatedCardData);

      console.log(`Card bought successfully by user with ID: ${user.uid}`);
    } catch (error) {
      console.error("Error buying card:", error);
    }
  };

  return (
    <div id="root">
      {card ? (
        <div>
          <h2>{card.cardName}</h2>
          <p>Rarity: {card.rarity}</p>
          <p>Expansion: {card.expansion}</p>
          <img src={card.imageUrl} alt={card.cardName} />
          <a href={card.gathererUrl} target="_blank" rel="noopener noreferrer">
            Gatherer Link
          </a>

          {card.isBought ? (
            <p>
              Card bought on {formatTimestamp(card.boughtAt)} for ${card.price}
            </p>
          ) : (
            <>
              <p>Price: ${card.price}</p>

              {user && (
                <div>
                  {isCreator && !card.isBought && (
                    <>
                      <button onClick={() => handleEdit(card)}>Edit</button>
                      <button onClick={() => handleDelete(card)}>Delete</button>
                    </>
                  )}
                  {!isCreator && !card.isBought && (
                    <button onClick={() => handleBuy(card)}>Buy</button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;
