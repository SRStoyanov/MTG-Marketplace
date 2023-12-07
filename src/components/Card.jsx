// src/components/Card.jsx
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatTimestamp } from "../services/dateUtils"; // Import the utility function for formatting timestamp
import "./Card.css"; // Import the CSS file

const Card = ({ card }) => {
  // Destructure card information
  const { cardName, price, imageUrl, id, isBought, boughtAt } = card || {};

  return (
    <div className="card-container">
      <Link to={`/details/${id}`}>
        <img className="card-image" src={imageUrl} alt={cardName} />
        <div className="card-name">{cardName}</div>
      </Link>

      {isBought ? (
        <div className="card-bought">
          <p>
            Card bought on {formatTimestamp(boughtAt)} for ${price}
          </p>
        </div>
      ) : (
        <div className="card-price">${price}</div>
      )}
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    cardName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    isBought: PropTypes.bool,
    boughtAt: PropTypes.object, // Assuming boughtAt is a Firestore timestamp
  }).isRequired,
};

export default Card;
