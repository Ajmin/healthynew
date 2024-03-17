import React from "react";

const CardButton = ({ title, onClick }) => {
  return (
    <div className="CardButton" onClick={onClick}>
      <h2>{title}</h2>
    </div>
  );
};

export default CardButton;
