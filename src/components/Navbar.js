import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient.js";
import { useContext } from "react";
import { MealContext } from "../App.js";
import img1 from "./images/group1.png";
import l1 from "../assets/logindiet.png";
import l2 from "../assets/rectangle-20.svg";
import l3 from "../assets/rectangle-21.svg";
import l4 from "../assets/group.svg";

export default function Navbar() {
  const navigate = useNavigate();
  const [meal, setMeal, user, setUser] = useContext(MealContext);
  React.useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await supabase.auth.getUser();
      console.log(currentUser.data.user);
      if (currentUser.data.user != null) setUser(currentUser);
    };
    fetchUser();
  }, []);

  function handleChange(page) {
    navigate(page);
  }

  return (
    <nav>
      <main className="rectangle-group">
        <img className="frame-child1" alt="" src={l2} />
        <img className="frame-child2" alt="" src={l3} />
      </main>
      <div className="login-inner">
        <nav className="frame-group">
          <div className="logo-container">
            <div className="logo1">
              <div className="healthybite-group">
                <div className="healthybite1">
                  <span className="health1" onClick={() => handleChange("/")}>
                    Healthynew
                  </span>
                  {/* <span className="y1">y</span>
                  <span className="bite1">new</span> */}
                </div>
                <div className="group-container">
                  <img className="group-icon1" alt="" src={l4} />
                </div>
              </div>
            </div>
          </div>
          <div className="features3">
            {user ? (
              <>
                <div
                  className="features4"
                  onClick={() => handleChange("/mealplan")}
                >
                  {" "}
                  Meals
                </div>
                <div
                  className="features5"
                  onClick={() => handleChange("/profile")}
                >
                  Profile
                </div>
                <div
                  className="features6"
                  onClick={() => handleChange("/portal")}
                >
                  Plans
                </div>
              </>
            ) : (
              <>
                <div
                  className="features4"
                  onClick={() => handleChange("/login")}
                >
                  Login
                </div>
                <div
                  className="features5"
                  onClick={() => handleChange("/register")}
                >
                  Signup
                </div>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* <img
        src={img1}
        onClick={() => handleChange("/")}
        className="nav--logo_text"
        alt="Logo"
      /> */}
      {/* <div className="nav--title">
        {user ? (
          <>
            <button
              className="minimal-black-btn"
              onClick={() => handleChange("/mealplan")}
            >
              Meals
            </button>
            <button
              className="minimal-black-btn"
              onClick={() => handleChange("/profile")}
            >
              Profile
            </button>
            <button
              className="minimal-black-btn"
              onClick={() => handleChange("/portal")}
            >
              Plan
            </button>
          </>
        ) : (
          <>
            <button
              className="minimal-black-btn"
              onClick={() => handleChange("/Login")}
            >
              Login
            </button>

            <button
              className="minimal-black-btn"
              onClick={() => handleChange("/Signup")}
            >
              Signup
            </button>
          </>
        )}
      </div> */}
    </nav>
  );
}
