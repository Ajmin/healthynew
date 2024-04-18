import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient.js";
import { useContext } from "react";
import { MealContext } from "../App.js";

export default function Login(props) {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [meal, setMeal, user, setUser] = useContext(MealContext);
  const navigate = useNavigate();
  const [regdata, setRegdata] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setRegdata((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }
  const [userdat, setUserdat] = React.useState();
  React.useEffect(() => {
    setUser(userdat);
    console.log(user);
  }, [userdat]);
  async function signInWithEmail() {
    try {
      const { User, error } = await supabase.auth.signInWithPassword({
        email: regdata.email,
        password: regdata.password,
      });
      if (error) {
        throw error;
      }
      setUserdat(await supabase.auth.getUser());

      console.log("User logged in successfully:", userdat.data.user.email);
      // You can redirect the user to another page or update the UI accordingly
      setAlertMessage(
        `Welcome, ${userdat.data.user.email}! You are now logged in.`
      );
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Login failed. Please check your email and password.";

      if (error.message.includes("invalid login")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message.includes("user not found")) {
        errorMessage = "User not found. Please check your email.";
      }

      setAlertMessage(errorMessage);
    }
    if (user != null) navigate("/mealplan");
  }

  function handleSubmit(event) {
    event.preventDefault();
    signInWithEmail();
    props.handleRender();
  }

  return (
    <div className="Register">
      <form className="reg--form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={regdata.email}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={regdata.password}
        />
        <button className="Log">Login</button>
        {alertMessage && <p className="error"> {alertMessage} </p>}
      </form>
    </div>
  );
}

/*import React from "react";
import { supabase } from "./supabaseClient.js";

export default function Login() {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  /*async function signInWithEmail() {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });
      if (error) {
        throw error;
      }
      // Handle successful login, if needed
      console.log("User logged in successfully:", user);
      // You can redirect the user to another page or update the UI accordingly
      setAlertMessage(`Welcome, ${user.email}! You are now logged in.`);
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Login failed. Please check your email and password.";

      if (error.message.includes("invalid login")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message.includes("user not found")) {
        errorMessage = "User not found. Please check your email.";
      }

      setAlertMessage(errorMessage);
    }
  } */

/*function handleChange(event) {
    setLoginData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    setAlertMessage("Nicr!");
  }

  return (
    <div className="Login">
      <form className="login--form" onSubmit={handleSubmit}>
        <input
          type="text" // Change type to "text" for email input
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={loginData.email}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={loginData.password}
        />
        <button type="submit">Login</button>
        {alertMessage && <p className="error"> {alertMessage} </p>}
      </form>
    </div>
  );
} */
