import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cards(props) {
  const navigate = useNavigate();

  return (
    <div className="program-card">
      <img src={props.img} />
      <h3>{props.name}</h3>
      <div className="info-group">
        <p>{props.phone}</p>
      </div>
      <div className="info-group">
        <p>{props.email}</p>
      </div>
      <div className="button">
        <button className="subscribe" onClick={() => navigate("/progress")}>
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
}

/* 
{
    img: "./images/mr-whiskerson.png", 
    name: "Mr. Whiskerson", 
    phone: "(212) 555-1234", 
    email: "mr.whiskaz@catnap.meow"
}

*/
