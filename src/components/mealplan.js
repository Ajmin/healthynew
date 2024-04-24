import Suggestive from "./suggestive";
import SquareCard from "./SquareCard";
import meal1 from "../images/f1.png";
import meal2 from "../images/f2.png";
import meal3 from "../images/f3.png";
import React from "react";

function Meal() {
  const [day, setDay] = React.useState(-1);

  function handleChange(day) {
    setDay(day);
  }
  return (
    <div className="mealplans">
      <div className="whitebody">
        <div className="mealcontainer">
          <div className="todaycooking">
            <h1 className="todaycookingh1">What are we cooking today?</h1>
            <div className="sqrcontainer">
              <SquareCard
                imageUrl={meal1}
                heading="Steak"
                subheading="Need 3 Ingredients"
              />
              <SquareCard
                imageUrl={meal2}
                heading="Veg Food"
                subheading="Need 6 Ingredients"
              />
              <SquareCard
                imageUrl={meal3}
                heading="Meal"
                subheading="Need 4 Ingredients"
              />
            </div>
          </div>
          <div className="weeklymeal">
            <h1 className="weeklymealh1">Personalized Meal Plan</h1>
            <div className="calendar">
              <div className="weeks">
                <div className="week">
                  {" "}
                  <h1
                    style={{
                      color: "black",
                    }}
                  >
                    {" "}
                    Week 01{" "}
                  </h1>
                </div>
                <div className="week">
                  {" "}
                  <h1> Week 02 </h1>
                </div>
                <div className="week">
                  {" "}
                  <h1> Week 03 </h1>
                </div>
                <div className="week">
                  {" "}
                  <h1> Week 04 </h1>
                </div>
                <div className="week">
                  {" "}
                  <h1> Week 05 </h1>
                </div>
              </div>
              <div className="days">
                <button
                  onClick={() => setDay(0)}
                  style={{
                    fontWeight: day === 0 ? "bold" : "normal",
                  }}
                >
                  {" "}
                  Monday
                </button>
                <button
                  onClick={() => setDay(1)}
                  style={{ fontWeight: day === 1 ? "bold" : "normal" }}
                >
                  Tuesday
                </button>
                <button
                  onClick={() => setDay(2)}
                  style={{ fontWeight: day === 2 ? "bold" : "normal" }}
                >
                  Wednesday
                </button>
                <button
                  onClick={() => setDay(3)}
                  style={{ fontWeight: day === 3 ? "bold" : "normal" }}
                >
                  Thursday
                </button>
                <button
                  onClick={() => setDay(4)}
                  style={{ fontWeight: day === 4 ? "bold" : "normal" }}
                >
                  Friday
                </button>
                <button
                  onClick={() => setDay(5)}
                  style={{ fontWeight: day === 5 ? "bold" : "normal" }}
                >
                  Saturday
                </button>
                <button
                  onClick={() => setDay(6)}
                  style={{ fontWeight: day === 6 ? "bold" : "normal" }}
                >
                  Sunday
                </button>
              </div>
            </div>
            <Suggestive day={day} handleChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meal;
