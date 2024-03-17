import React from "react";
import Cards from "./ProgressCards.js";
import watertask from "./images/watertask.jpg";
import img4 from "./images/sleep.jpg";
import img1 from "./images/beginner.webp";

function Progress() {
  const [prog, setProg] = React.useState(0);
  const tasks = 3;
  const percentage = (prog / tasks) * 100;

  function handleProg() {
    setProg((prev) => prev + 1);
  }
  return (
    <div className="progress">
      <Cards
        img={watertask}
        name="Drink Water"
        phone="3 litres (12 glasses) of water per day is essential to see results!"
        email=""
        handleProg={handleProg}
      />
      <Cards
        img={img1}
        name="Exercise 30 min"
        phone="Exercise keeps body and mind healthy."
        email=""
        handleProg={handleProg}
      />
      <Cards
        img={img4}
        name="8 Hours of Sound Sleep"
        phone="Sleep is necessary for both mental and physical health."
        email=""
        handleProg={handleProg}
      />
      <div className="cpb">
        <CircularProgressbar
          value={percentage}
          text={`${prog} out of ${tasks}`}
        />
      </div>
      ;
    </div>
  );
}

export default Progress;
