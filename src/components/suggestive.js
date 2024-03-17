import React from "react";

function Suggestive() {
  const [cardsbf, setCardsbf] = React.useState([
    {
      id: 1,
      title: "Card 1",
    },
    {
      id: 2,
      title: "Card 2",
    },
    {
      id: 3,
      title: "Card 3",
    },
  ]);
  const [cardslh, setCardslh] = React.useState([
    {
      id: 1,
      title: "Card 1",
    },
    {
      id: 2,
      title: "Card 2",
    },
    {
      id: 3,
      title: "Card 3",
    },
  ]);
  const [cardsdn, setCardsdn] = React.useState([
    {
      id: 1,
      title: "Card 1",
    },
    {
      id: 2,
      title: "Card 2",
    },
    {
      id: 3,
      title: "Card 3",
    },
  ]);
  const [meal, setMeal] = React.useState();
  React.useEffect(() => {
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
              size: 20,
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
                    max: 3000,
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
        const mealCopy = { ...data };
        mealCopy.selection.sort(() => Math.random() - 0.5);
        setMeal(mealCopy);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }

    fetchMealPlan();
  }, []);

  React.useEffect(() => {
    console.log(meal);
    meal && fetchBreakfast();
    meal && fetchLunch();
    meal && fetchDinner();
  }, [meal]);

  React.useEffect(() => {
    console.log(cardsbf);
  }, [cardsbf]);

  const fetchBreakfast = async () => {
    const updatedCards = cardsbf.map(async (card) => {
      const cardResponse = await fetch(
        `https://api.edamam.com/api/recipes/v2/by-uri?type=public&beta=true&uri=${encodeURIComponent(
          meal.selection[card.id - 1].sections.Breakfast.assigned
        )}&app_id=2df5c54e&app_key=%2085d882d0049a0409d41f0a3b69d78b1d%09&field=label&field=image&field=source&field=calories&field=glycemicIndex&field=mealType&field=totalDaily`
      );
      const cardData = await cardResponse.json();
      return { ...card, data: cardData };
    });
    setCardsbf(await Promise.all(updatedCards));
  };

  const fetchLunch = async () => {
    const updatedCards = cardslh.map(async (card) => {
      const cardResponse = await fetch(
        `https://api.edamam.com/api/recipes/v2/by-uri?type=public&beta=true&uri=${encodeURIComponent(
          meal.selection[card.id - 1].sections.Lunch.assigned
        )}&app_id=2df5c54e&app_key=%2085d882d0049a0409d41f0a3b69d78b1d%09&field=label&field=image&field=source&field=calories&field=glycemicIndex&field=mealType&field=totalDaily`
      );
      const cardData = await cardResponse.json();
      return { ...card, data: cardData };
    });
    setCardslh(await Promise.all(updatedCards));
  };

  const fetchDinner = async () => {
    const updatedCards = cardsdn.map(async (card) => {
      const cardResponse = await fetch(
        `https://api.edamam.com/api/recipes/v2/by-uri?type=public&beta=true&uri=${encodeURIComponent(
          meal.selection[card.id - 1].sections.Dinner.assigned
        )}&app_id=2df5c54e&app_key=%2085d882d0049a0409d41f0a3b69d78b1d%09&field=label&field=image&field=source&field=calories&field=glycemicIndex&field=mealType&field=totalDaily`
      );
      const cardData = await cardResponse.json();
      return { ...card, data: cardData };
    });
    setCardsdn(await Promise.all(updatedCards));
  };

  return (
    <div className="sugg-container">
      <div className="Breakfast">
        <h1>Breakfast</h1>
        {cardsbf.map((card) => (
          <div key={card.id} className="sugg-card">
            <img
              src={card.data && card.data.hits[0].recipe.image}
              className="sugg-img"
            />
            {card.title}
          </div>
        ))}
      </div>
      <div className="Lunch ">
        <h1>Lunch</h1>
        {cardslh.map((card) => (
          <div key={card.id} className="sugg-card">
            <img
              src={card.data && card.data.hits[0].recipe.image}
              className="sugg-img"
            />
            {card.title}
          </div>
        ))}
      </div>
      <div className="Dinner">
        <h1>Dinner</h1>
        {cardsdn.map((card) => (
          <div key={card.id} className="sugg-card">
            <img
              src={card.data && card.data.hits[0].recipe.image}
              className="sugg-img"
            />
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestive;
