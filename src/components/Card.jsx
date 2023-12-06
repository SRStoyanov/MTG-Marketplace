// src/components/Card.jsx
import PropTypes from "prop-types";
import "./Card.css"; // Import the CSS file

const Card = ({ card }) => {
  // Destructure card information
  const { cardName, price, imageUrl } = card || {};

  return (
    <div className="card-container">
      <img className="card-image" src={imageUrl} alt={cardName} />
      <div className="card-name">{cardName}</div>
      <div className="card-price">${price}</div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    cardName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
