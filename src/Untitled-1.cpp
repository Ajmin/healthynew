https://api.edamam.com/api/recipes/v2/a39095626ba57a8491fb148e56290e65?app_id=2df5c54e&app_key=85d882d0049a0409d41f0a3b69d78b1d&type=public


import React, { useState, useEffect } from "react";

function Suggestive() {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    async function fetchMealPlan() {
      try {
        const response = await fetch(
          "https://api.edamam.com/api/meal-planner/v1/f2a8e0ca/select",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Edamam-Account-User": "newajmin",
              Authorization:
                "Basic ZjJhOGUwY2E6YmM3ZjA1YWFjZDU4Nzc2YzQ1ZmFkZDIxMGM1YjVhOTI=",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              size: 3,
              plan: {
                accept: {
                  all: [
                    {
                      health: ["SOY_FREE", "FISH_FREE", "MEDITERRANEAN"],
                    },
                  ],
                },
                fit: {
                  ENERC_KCAL: {
                    min: 1000,
                    max: 2000,
                  },
                  "SUGAR.added": {
                    max: 20,
                  },
                },
                sections: {
                  Breakfast: {
                    accept: {
                      all: [
                        {
                          dish: [
                            "drinks",
                            "egg",
                            "biscuits and cookies",
                            "bread",
                            "pancake",
                            "cereals",
                          ],
                        },
                        {
                          meal: ["breakfast"],
                        },
                      ],
                    },
                    fit: {
                      ENERC_KCAL: {
                        min: 100,
                        max: 600,
                      },
                    },
                  },
                  Lunch: {
                    accept: {
                      all: [
                        {
                          dish: [
                            "main course",
                            "pasta",
                            "egg",
                            "salad",
                            "soup",
                            "sandwiches",
                            "pizza",
                            "seafood",
                          ],
                        },
                        {
                          meal: ["lunch/dinner"],
                        },
                      ],
                    },
                    fit: {
                      ENERC_KCAL: {
                        min: 300,
                        max: 900,
                      },
                    },
                  },
                  Dinner: {
                    accept: {
                      all: [
                        {
                          dish: [
                            "seafood",
                            "egg",
                            "salad",
                            "pizza",
                            "pasta",
                            "main course",
                          ],
                        },
                        {
                          meal: ["lunch/dinner"],
                        },
                      ],
                    },
                    fit: {
                      ENERC_KCAL: {
                        min: 200,
                        max: 900,
                      },
                    },
                  },
                },
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMeal(data);
        
        // Fetch data for each card and update the state
        const updatedCards = cards.map(async (card) => {
          const cardResponse = await fetch(
            `https://api.edamam.com/api/recipes/v2/by-uri?type=public&beta=true&uri=${encodeURIComponent(
              card.meals.sections.Breakfast.assigned
            )}&app_id=2df5c54e&app_key=%2085d882d0049a0409d41f0a3b69d78b1d%09&field=label&field=image&field=source&field=calories&field=glycemicIndex&field=mealType&field=totalDaily`
          );
          const cardData = await cardResponse.json();
          return { ...card, data: cardData };
        });

        // Update the state with the updated cards
        setCards(await Promise.all(updatedCards));
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }

    fetchMealPlan();
  }, []);

  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Card 1",
      meals: meal?.selection[0],
    },
    {
      id: 2,
      title: "Card 2",
      meals: meal?.selection[1],
    },
    {
      id: 3,
      title: "Card 3",
      meals: meal?.selection[2],
    },
  ]);

  return (
    <div className="sugg-container">
      <div className="Breakfast">
        <h1>Breakfast</h1>
        {cards.map((card) => (
          <div key={card.id} className="sugg-card">
            <img src={card.image} className="sugg-img" />
            {card.title}
          </div>
        ))}
      </div>
      <div className="Lunch ">
        <h1>Lunch</h1>
        {cards.map((card) => (
          <div key={card.id} className="sugg-card">
            {card.title}
          </div>
        ))}
      </div>
      <div className="Dinner">
        <h1>Dinner</h1>
        {cards.map((card) => (
          <div key={card.id} className="sugg-card">
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestive;


meal.selection[0].sections.Breakfast.assigned