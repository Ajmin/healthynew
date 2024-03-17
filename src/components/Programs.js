import React from "react";
import Cards from "./Cards";
import img1 from "./images/intermediate.jpg";
import img2 from "./images/advanced.webp";
import img3 from "./images/beginner.webp";

function Programs(props) {
  return (
    <div className="programs">
      <Cards
        img={img3}
        name="Beginner"
        phone="Home Work Out Plans"
        email="Diet Plans"
      />
      <Cards
        img={img1}
        name="Intermediate"
        phone="Work out Challenges"
        email="Diet Plans,Recipees"
      />
      <Cards
        img={img2}
        name="Advanced"
        phone="Personal Training Sessions"
        email="Diet Plans,Recipees"
      />
    </div>
  );
}

export default Programs;
