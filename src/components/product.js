import React from "react";
import Cards from "./productcard.js";
import { useLocation } from "react-router-dom";
import backgroundImage from "/home/adarsh/new/src/images/recipe_bg.png"; // Import your background image


export default function Product() {
  const { state } = useLocation();
  console.log(state.parsed[0].food.image);
  return (
    <div className="background-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="product">
        <div className="product-image">
          <img src={state.parsed[0].food.image} alt="Product" />
        </div>
        <Cards
          name={state.parsed[0].food.label}
          calory={state.parsed[0].food.nutrients.ENERC_KCAL}
          protein={state.parsed[0].food.nutrients.PROCNT}
          fat={state.parsed[0].food.nutrients.FAT}
        />
      </div>
    </div>
  );
}
