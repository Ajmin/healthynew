import React from "react";
import "./SquareCard.css"; // Import your CSS file

const SquareCard = ({ imageUrl, heading, subheading }) => {
  return (
    <div className="square-card">
      <img src={imageUrl} alt="Card" className="card-image" />
      <div className="textcontainer">
        <h1 className="cardheading">{heading}</h1>
        <h2 className="cardsubheading">{subheading}</h2>
      </div>
    </div>
  );
};

export default SquareCard;
