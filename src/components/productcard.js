import React from "react";

export default function cards(props) {
  return (
    <div>
      <div className="product-card">
        <div className="product-header">
          <h3>{props.name}</h3>
          <p1>description</p1>
        </div>
        <div className="nutrients">
          <div className="nutrientssub">
            <img src="protein" />
            <p>{props.calory}</p>
          </div>
          <div className="nutrientssub">
            <img src="protein" />
            <p>{props.protein}</p>
          </div>
          <div className="nutrientssub">
            <img src="protein" />
            <p>{props.fat}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
