import React from "react";
import Layout from "../components/Layout";
//import FrameComponent1 from "../components/FrameComponent1";
import "./Login.css";
import "./FrameComponent1.js";
import l1 from "../assets/logindiet.png";

import "./FrameComponent1.css";
import F1 from "../assets/group-1.svg";
import F2 from "../assets/password-icon.svg";
import F3 from "../assets/icons8google-1.svg";
import F4 from "../assets/vector.svg";
import F5 from "../assets/pngwing-20@2x.png";
import F6 from "../assets/pngwing-21@2x.png";
//import F7 from "../assets/group-1.svg";
import { useCallback } from "react";
//import Name1 from "./Name1";
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

  const onSigupContainerClick = useCallback(() => {
    navigate("/Signup");
  }, [navigate]);

  return (
    <Layout>
      <div className="login">
        <img className="rectangle-icon" alt="" src={l1} />
        {/* <FrameComponent1 /> */}
        <form className="frame-form" onSubmit={handleSubmit}>
          <div className="login-wrapper">
            <h3 className="login2">Login</h3>
          </div>
          <div className="email-button1">
            <div className="email3">Email</div>
            <div className="box3">
              <div className="text3">
                <input
                  className="abcgmailcom2"
                  placeholder="abc@gmail.com"
                  type="text"
                  onChange={handleChange}
                  name="email"
                  value={regdata.email}
                />
                <img className="group-icon3" alt="" src={F1} />
              </div>
            </div>
          </div>
          <div className="passwordbutton-parent">
            <div className="passwordbutton1">
              <div className="email4">Password</div>
              <div className="box4">
                <div className="text4">
                  <input
                    className="input1"
                    placeholder="......................................"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={regdata.password}
                  />
                  <img className="password-icon1" alt="" src={F2} />
                </div>
              </div>
            </div>
            <div className="forget-passwprd">
              <div className="forget-password">Forget password?</div>
            </div>
          </div>
          <div className="frame-wrapper1">
            <div className="login-button-parent">
              <button className="login-button">
                <div className="login3">Login</div>
              </button>
              {alertMessage && <p className="error"> {alertMessage} </p>}

              {/* <div className="or-continue-with-wrapper">
                <div className="or-continue-with">or continue with</div>
              </div>
              <div className="frame-wrapper2">
                <div className="frame-parent1">
                  <div className="icons8-google-1-wrapper">
                    <img className="icons8-google-1" alt="" src={F3} />
                  </div>
                  <button className="vector-wrapper">
                    <img className="vector-icon" alt="" src={F4} />
                  </button>
                  <button className="pngwing-20-wrapper">
                    <img className="pngwing-20-icon" alt="" src={F5} />
                  </button>
                  <div className="pngwing-21-wrapper">
                    <img className="pngwing-21-icon" alt="" src={F6} />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="frame-wrapper3">
            <div className="frame-parent2">
              <div className="dont-have-an-account-wrapper">
                <div className="dont-have-an">Don’t have an account?</div>
              </div>
              {/* <button className="sigin1">
            <div className="sign-up1">Sign up</div>
          </button> */}
              <div className="sigin1" onClick={onSigupContainerClick}>
                <div className="sign-up1">Sign up</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

//export default Login;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "./supabaseClient.js";
// import { useContext } from "react";
// import { MealContext } from "../App.js";

// export default function Login(props) {
//   const [alertMessage, setAlertMessage] = React.useState("");
//   const [meal, setMeal, user, setUser] = useContext(MealContext);
//   const navigate = useNavigate();
//   const [regdata, setRegdata] = React.useState({
//     email: "",
//     password: "",
//   });

//   function handleChange(event) {
//     setRegdata((prevData) => {
//       return {
//         ...prevData,
//         [event.target.name]: event.target.value,
//       };
//     });
//   }
//   const [userdat, setUserdat] = React.useState();
//   React.useEffect(() => {
//     setUser(userdat);
//     console.log(user);
//   }, [userdat]);
//   async function signInWithEmail() {
//     try {
//       const { User, error } = await supabase.auth.signInWithPassword({
//         email: regdata.email,
//         password: regdata.password,
//       });
//       if (error) {
//         throw error;
//       }
//       setUserdat(await supabase.auth.getUser());

//       console.log("User logged in successfully:", userdat.data.user.email);
//       // You can redirect the user to another page or update the UI accordingly
//       setAlertMessage(
//         `Welcome, ${userdat.data.user.email}! You are now logged in.`
//       );
//     } catch (error) {
//       console.error("Login error:", error);

//       let errorMessage = "Login failed. Please check your email and password.";

//       if (error.message.includes("invalid login")) {
//         errorMessage = "Invalid email or password. Please try again.";
//       } else if (error.message.includes("user not found")) {
//         errorMessage = "User not found. Please check your email.";
//       }

//       setAlertMessage(errorMessage);
//     }
//     if (user != null) navigate("/mealplan");
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     signInWithEmail();
//     props.handleRender();
//   }

//   return (
//     <div className="Register">
//       <form className="reg--form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Email"
//           onChange={handleChange}
//           name="email"
//           value={regdata.email}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           name="password"
//           value={regdata.password}
//         />
//         <button className="Log">Login</button>
//         {alertMessage && <p className="error"> {alertMessage} </p>}
//       </form>
//     </div>
//   );
// }

// /*import React from "react";
// import { supabase } from "./supabaseClient.js";

// export default function Login() {
//   const [alertMessage, setAlertMessage] = React.useState("");
//   const [loginData, setLoginData] = React.useState({
//     email: "",
//     password: "",
//   });

//   /*async function signInWithEmail() {
//     try {
//       const { user, error } = await supabase.auth.signInWithPassword({
//         email: loginData.email,
//         password: loginData.password,
//       });
//       if (error) {
//         throw error;
//       }
//       // Handle successful login, if needed
//       console.log("User logged in successfully:", user);
//       // You can redirect the user to another page or update the UI accordingly
//       setAlertMessage(`Welcome, ${user.email}! You are now logged in.`);
//     } catch (error) {
//       console.error("Login error:", error);

//       let errorMessage = "Login failed. Please check your email and password.";

//       if (error.message.includes("invalid login")) {
//         errorMessage = "Invalid email or password. Please try again.";
//       } else if (error.message.includes("user not found")) {
//         errorMessage = "User not found. Please check your email.";
//       }

//       setAlertMessage(errorMessage);
//     }
//   } */

// /*function handleChange(event) {
//     setLoginData((prevData) => ({
//       ...prevData,
//       [event.target.name]: event.target.value,
//     }));
//   }

//   function handleSubmit(event) {
//     setAlertMessage("Nicr!");
//   }

//   return (
//     <div className="Login">
//       <form className="login--form" onSubmit={handleSubmit}>
//         <input
//           type="text" // Change type to "text" for email input
//           placeholder="Email"
//           onChange={handleChange}
//           name="email"
//           value={loginData.email}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           name="password"
//           value={loginData.password}
//         />
//         <button type="submit">Login</button>
//         {alertMessage && <p className="error"> {alertMessage} </p>}
//       </form>
//     </div>
//   );
// } */
