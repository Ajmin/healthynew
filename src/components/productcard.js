import React, { useState } from "react";


export default function Cards(props) {
  const [isNutrientsVisible, setIsNutrientsVisible] = useState(true);

  const toggleNutrientsVisibility = () => {
    setIsNutrientsVisible(!isNutrientsVisible);
  };

  return (
    <div>
      <div className="product-card">
        <div className="product-header">
          <h2>{props.name}</h2>
          <p>Description</p>
          <div className="recipe">
            <button className="recipe-button" onClick={toggleNutrientsVisibility}>
              Recipe
            </button>
          </div>
        </div>
        {isNutrientsVisible && (
          <div className="nutrients">
            <div className="nutrientssub1">
              <img src="protein" alt="Protein" />
              <p>Calory</p>
              <p>{props.calory}</p>
            </div>
            <div className="nutrientssub2">
              <img src="protein" alt="Protein" />
              <p>Protein</p>
              <p>{props.protein}</p>
            </div>
            <div className="nutrientssub3">
              <img src="protein" alt="Protein" />
              <p>Fat</p>
              <p>{props.fat}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
