import React from "react";
import { MealContext } from "../App";
import { useContext } from "react";
import { supabase } from "./supabaseClient";

function Suggestive(props) {
  const [meal, setMeal, User, setUser] = useContext(MealContext);
  const [dailycal, setDailycal] = React.useState();
  console.log(User);

  const [cardsbf, setCardsbf] = React.useState([
    {
      id: 1,
      title: "Card 1",
    },
  ]);
  const [cardslh, setCardslh] = React.useState([
    {
      id: 1,
      title: "Card 1",
    },
  ]);
  const [cardsdn, setCardsdn] = React.useState([
    {
      id: 1,
      title: "Card 1",
    },
  ]);
  async function fetchMealPlan(cal) {
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
            size: 7,
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
                  max: cal,
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
                      max: 500,
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
                      min: 100,
                      max: 600,
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
                      min: 100,
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
      if (data) {
        return data;
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  }

  React.useEffect(() => {
    async function fetchMealinfo() {
      const { data, error } = await supabase
        .from("meals")
        .select("*")
        .eq("id", User.data.user.id)
        .single();
      return data;
    }

    async function fetchUserinfo() {
      const { data, error } = await supabase
        .from("userinfo")
        .select("*")
        .eq("id", User.data.user.id)
        .single();
      return data;
    }

    const loadMeal = async () => {
      const userinfo = await fetchUserinfo();
      const mealinfo = await fetchMealinfo();
      setDailycal(userinfo.dailycalories);
      if (mealinfo) {
        await props.handleChange(0);
        console.log(mealinfo.created_at);
        setMeal(mealinfo);
        console.log(meal);
      } else {
        const meals = await fetchMealPlan(userinfo.dailycalories);
        const { datas, errors } = await supabase
          .from("meals")
          .insert({ id: User.data.user.id, mealdata: JSON.stringify(meals) });
        loadMeal();
      }
    };
    loadMeal();
  }, []);

  React.useEffect(() => {
    meal && fetchBreakfast();
    meal && fetchLunch();
    meal && fetchDinner();
    console.log(meal);
    console.log(props.day);
  }, [props.day]);

  React.useEffect(() => {
    console.log(cardsbf);
  }, [cardsbf]);

  const fetchBreakfast = async () => {
    const updatedCards = cardsbf.map(async (card) => {
      console.log(props.day);
      const mealuri = JSON.parse(meal.mealdata);
      const date = new Date(meal.created_at);
      const dayOfMonth = date.getDate();
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const daydiff = currentDay - dayOfMonth;
      const cardResponse = await fetch(
        `https://api.edamam.com/api/recipes/v2/by-uri?type=public&beta=true&uri=${encodeURIComponent(
          mealuri.selection[daydiff + props.day].sections.Breakfast.assigned
        )}&app_id=2df5c54e&app_key=%2085d882d0049a0409d41f0a3b69d78b1d%09&field=label&field=image&field=source&field=calories&field=glycemicIndex&field=mealType&field=totalDaily`
      );
      const cardData = await cardResponse.json();
      console.log(cardData);
      return { ...card, data: cardData };
    });
    setCardsbf(await Promise.all(updatedCards));
  };

  const fetchLunch = async () => {
    const updatedCards = cardslh.map(async (card) => {
      const mealuri = JSON.parse(meal.mealdata);
      const date = new Date(meal.created_at);
      const dayOfMonth = date.getDate();
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const daydiff = currentDay - dayOfMonth;
      const cardResponse = await fetch(
        `https://api.edamam.com/api/recipes/v2/by-uri?type=public&beta=true&uri=${encodeURIComponent(
          mealuri.selection[daydiff + props.day].sections.Lunch.assigned
        )}&app_id=2df5c54e&app_key=%2085d882d0049a0409d41f0a3b69d78b1d%09&field=label&field=image&field=source&field=calories&field=glycemicIndex&field=mealType&field=totalDaily`
      );
      const cardData = await cardResponse.json();
      return { ...card, data: cardData };
    });
    setCardslh(await Promise.all(updatedCards));
  };

  const fetchDinner = async () => {
    const updatedCards = cardsdn.map(async (card) => {
      const mealuri = JSON.parse(meal.mealdata);
      const date = new Date(meal.created_at);
      const dayOfMonth = date.getDate();
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const daydiff = currentDay - dayOfMonth;
      const cardResponse = await fetch(
        `https://api.edamam.com/api/recipes/v2/by-uri?type=public&beta=true&uri=${encodeURIComponent(
          mealuri.selection[daydiff + props.day].sections.Dinner.assigned
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
            <h1 className="dish">
              Dish: {card.data && card.data.hits[0].recipe.label}
            </h1>
            <h1 className="dish">
              Calories:{" "}
              {card.data && (
                <div>
                  {card.data.hits[0].recipe.calories / (0.3 * dailycal) >= 2 ? (
                    <>
                      <p>
                        {card.data.hits[0].recipe.calories /
                          Math.floor(
                            card.data.hits[0].recipe.calories / (0.3 * dailycal)
                          )}
                      </p>
                      <p>
                        {Math.floor(
                          card.data.hits[0].recipe.calories / (0.3 * dailycal)
                        )}{" "}
                        servings.
                      </p>
                    </>
                  ) : (
                    <p>{card.data.hits[0].recipe.calories}</p>
                  )}
                  {console.log(0.3 * dailycal)}
                  {console.log(card.data.hits[0].recipe.calories)}
                </div>
              )}
            </h1>
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
            <h1 className="dish">
              Dish: {card.data && card.data.hits[0].recipe.label}
            </h1>
            <h1 className="dish">
              Calories:{" "}
              {card.data && (
                <div>
                  {card.data.hits[0].recipe.calories / (0.3 * dailycal) >= 2 ? (
                    <>
                      <p>
                        {card.data.hits[0].recipe.calories /
                          Math.floor(
                            card.data.hits[0].recipe.calories /
                              (0.35 * dailycal)
                          )}
                      </p>
                      <p>
                        {Math.floor(
                          card.data.hits[0].recipe.calories / (0.3 * dailycal)
                        )}{" "}
                        servings.
                      </p>
                    </>
                  ) : (
                    <p>{card.data.hits[0].recipe.calories}</p>
                  )}
                  {console.log(0.3 * dailycal)}
                  {console.log(card.data.hits[0].recipe.calories)}
                </div>
              )}
            </h1>
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
            <h1 className="dish">
              Dish: {card.data && card.data.hits[0].recipe.label}
            </h1>
            <h1 className="dish">
              Calories:{" "}
              {card.data && (
                <div>
                  {card.data.hits[0].recipe.calories / (0.3 * dailycal) >= 2 ? (
                    <>
                      <p>
                        {card.data.hits[0].recipe.calories /
                          Math.floor(
                            card.data.hits[0].recipe.calories / (0.3 * dailycal)
                          )}
                      </p>
                      <p>
                        {Math.floor(
                          card.data.hits[0].recipe.calories / (0.3 * dailycal)
                        )}{" "}
                        servings.
                      </p>
                    </>
                  ) : (
                    <p>{card.data.hits[0].recipe.calories}</p>
                  )}
                  {console.log(0.3 * dailycal)}
                  {console.log(card.data.hits[0].recipe.calories)}
                </div>
              )}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestive;

/*
import React from "react";

function Suggestive() {
  const [cardsbf, setCardsbf] = React.useState([
    {
      id: 1,
      title: "Card 1",
    },
  ]);
  const [cardslh, setCardslh] = React.useState([
    {
      id: 1,
      title: "Card 1",
    },
  ]);
  const [cardsdn, setCardsdn] = React.useState([
    {
      id: 1,
      title: "Card 1",
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
              size: 7,
              plan: {
                accept: { all: [] },
                fit: { ENERC_KCAL: { min: 1000, max: 2000 } },
                sections: {
                  Breakfast: {
                    accept: { all: [{ meal: ["breakfast"] }] },
                    fit: { ENERC_KCAL: { min: 100, max: 600 } },
                  },
                  Lunch: {
                    accept: { all: [{ meal: ["lunch/dinner"] }] },
                    fit: { ENERC_KCAL: { min: 300, max: 900 } },
                  },
                  Dinner: {
                    accept: { all: [{ meal: ["lunch/dinner"] }] },
                    fit: { ENERC_KCAL: { min: 200, max: 900 } },
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
          meal.selection[0].sections.Breakfast.assigned
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
          meal.selection[0].sections.Lunch.assigned
        )}&app_id=2df5c54e&app_key=%2085d882d0049a0409d41f0a3b69d78b1d%09&field=label&field=image&field=source&field=calories&field=glycemicIndex&field=mealType&field=totalDaily`
      );
      const cardData = await cardResponse.json();
      return { ...card, data: cardData };
    });
    setCardslh(await Promise.all(updatedCards));
  };

  const fetchDinner = async () => {
    const updatedCards = cardsdn.map(async (card) => {
      console.log(meal);
      const cardResponse = await fetch(
        `https://api.edamam.com/api/recipes/v2/by-uri?type=public&beta=true&uri=${encodeURIComponent(
          meal.selection[0].sections.Dinner.assigned
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
        <h1 className="mealtit">Breakfast</h1>
        {cardsbf.map((card) => (
          <div key={card.id} className="sugg-card">
            <img
              src={card.data && card.data.hits[0].recipe.image}
              className="sugg-img"
            />
            {card.title}
            <h1 className="dish">
              Dish: {card.data && card.data.hits[0].recipe.label}
            </h1>
            <h1 className="dish">
              Calories: {card.data && card.data.hits[0].recipe.calories}
            </h1>
          </div>
        ))}
      </div>
      <div className="Lunch ">
        <h1 className="mealtit">Lunch</h1>
        {cardslh.map((card) => (
          <div key={card.id} className="sugg-card">
            <img
              src={card.data && card.data.hits[0].recipe.image}
              className="sugg-img"
            />
            {card.title}
            <h1 className="dish">
              Dish: {card.data && card.data.hits[0].recipe.label}
            </h1>
            <h1 className="dish">
              Calories: {card.data && card.data.hits[0].recipe.calories}
            </h1>
          </div>
        ))}
      </div>
      <div className="Dinner">
        <h1 className="mealtit">Dinner</h1>
        {cardsdn.map((card) => (
          <div key={card.id} className="sugg-card">
            <img
              src={card.data && card.data.hits[0].recipe.image}
              className="sugg-img"
            />
            {card.title}
            <h1 className="dish">
              Dish: {card.data && card.data.hits[0].recipe.label}
            </h1>
            <h1 className="dish">
              Calories: {card.data && card.data.hits[0].recipe.calories}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestive;
*/
