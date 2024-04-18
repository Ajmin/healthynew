import React from "react";
import "./goals.css"; // Import your CSS file
import goals from "./images/goals.png";
import rightpic from "./images/rightpic.png";
import { useNavigate } from "react-router-dom";
function Goal() {
  const navigate = useNavigate();
  function chGoal(plan) {
    console.log(plan);
    navigate("/profile");
  }

  return (
    <div className="Goals">
      <div className="plancont">
        <img className="goalset" src={goals} />
        <div className="goalscont">
          <button className="goalbt" onClick={() => chGoal(1)}>
            PLAN 1
          </button>
          <button className="goalbt" onClick={() => chGoal(2)}>
            PLAN 2
          </button>
          <button className="goalbt" onClick={() => chGoal(3)}>
            PLAN 3
          </button>
          <button className="goalbt" onClick={() => chGoal(4)}>
            PLAN 4
          </button>
        </div>
      </div>
      <img src={rightpic} />
    </div>
  );
}

export default Goal;
