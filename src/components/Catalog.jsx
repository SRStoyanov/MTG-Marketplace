// src/components/Catalog.jsx
import { useState, useEffect } from "react";
import { fetchMTGCards } from "../services/firebaseUtils";
import PropTypes from "prop-types";
import Card from "./Card.jsx";
import "./Catalog.css"; // Import the CSS file

const Catalog = ({ user }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsData = await fetchMTGCards();
        console.log("Fetched data:", cardsData);
        setCards(cardsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="catalog-container">
      {cards.map((card) => (
        <Card key={card.id} card={card} user={user} />
      ))}
    </div>
  );
};

Catalog.propTypes = {
  user: PropTypes.object, // Pass the authenticated user object
};

export default Catalog;
