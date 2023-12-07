// src/components/Catalog.jsx
import { useState, useEffect } from "react";
import { fetchMTGCards } from "../services/firebaseUtils";
import PropTypes from "prop-types";
import Card from "./Card.jsx";
import { useSearch } from "../services/useSearch";
import "./Catalog.css";

const Catalog = ({ user, filter }) => {
  const { searchQuery } = useSearch(); // Access searchQuery from the hook
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsData = await fetchMTGCards();

        // Apply the filter if provided
        const filteredCards = filter
          ? cardsData.filter((card) => card[filter] === (user?.uid || ""))
          : cardsData;

        // Apply the search query filter
        const searchedCards = searchQuery
          ? filteredCards.filter((card) =>
              card.cardName.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
          : filteredCards;

        setCards(searchedCards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filter, user?.uid, searchQuery]);

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
  filter: PropTypes.string,
};

export default Catalog;
