import React from "react";
import CardButton from "./CardButton";
import { useNavigate } from "react-router-dom";

function Portal() {
  const navigate = useNavigate();
  const handleCardClick = (title) => {
    if (title === "Fitness") navigate("/progress");
  };

  return (
    <div className="Portal">
      <h1>React Card Buttons</h1>
      <div className="pheader">
        <h2>How do you intent to use the app?</h2>
      </div>
      <div className="CardContainer">
        <CardButton
          title="Weight Loss"
          onClick={() => handleCardClick("Recipe")}
        />
        <CardButton
          title="Fitness"
          onClick={() => handleCardClick("Daily Goals")}
        />
        <CardButton
          title="Health Tracker"
          onClick={() => handleCardClick("Training")}
        />
      </div>
    </div>
  );
}

export default Portal;
