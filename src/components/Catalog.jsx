// src/components/Catalog.jsx
import { useState, useEffect } from "react";
import { fetchMTGCards } from "../services/firebaseUtils";
import PropTypes from "prop-types";
import Card from "./Card.jsx";
import "./Catalog.css";

const Catalog = ({ user, filter }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsData = await fetchMTGCards();

        // Apply the filter if provided
        const filteredCards = filter
          ? cardsData.filter((card) => card[filter] === (user?.uid || ""))
          : cardsData;

        setCards(filteredCards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filter, user?.uid]);

  return (
    <div className="catalog-container">
      {cards.map((card) => (
        <Card key={card.id} card={card} user={user} />
      ))}
    </div>
  );
};

Catalog.propTypes = {
  user: PropTypes.object,
  filter: PropTypes.string, // Filter to apply (e.g., 'sellerId', 'buyerId')
};

export default Catalog;
