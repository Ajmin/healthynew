// import React from "react";
// import { supabase } from "./supabaseClient"; // Import your Supabase client configuration

// export default function Register() {
//   const [arrlist, setArrlist] = React.useState([]);
//   const [alertMessage, setAlertMessage] = React.useState("");
//   const [regdata, setRegdata] = React.useState({
//     username: "",
//     password: "",
//     password2: "",
//   });

//   async function handleSupabaseSignUp(email, password) {
//     try {
//       const { user, error } = await supabase.auth.signUp({
//         email,
//         password,
//       });
//       if (error) {
//         setAlertMessage(`Error: ${error.message}`);
//       } else {
//         setArrlist((oldarr) => [...oldarr, user]);
//         setAlertMessage("Successful!");
//       }
//     } catch (error) {
//       console.error("Error signing up:", error.message);
//       setAlertMessage(`Error: ${error.message}`);
//     }
//   }

//   function handleChange(event) {
//     setRegdata((prevData) => {
//       return {
//         ...prevData,
//         [event.target.name]: event.target.value,
//       };
//     });
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     if (regdata.password === regdata.password2) {
//       handleSupabaseSignUp(regdata.username, regdata.password);
//     } else {
//       setAlertMessage("Error: Passwords do not match!");
//     }
//   }

//   React.useEffect(
//     () => localStorage.setItem("regdata", JSON.stringify(arrlist)),
//     [arrlist]
//   );

//   return (
//     <div className="Register">
//       <form className="reg--form" onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           onChange={handleChange}
//           name="username"
//           value={regdata.username}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           name="password"
//           value={regdata.password}
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           onChange={handleChange}
//           name="password2"
//           value={regdata.password2}
//         />
//         <button className="Reg">Register</button>
//         {alertMessage && <p className="error"> {alertMessage} </p>}
//       </form>
//     </div>
//   );
// }
// import { useCallback } from "react";

// import { useNavigate } from "react-router-dom";

//import FrameComponent from "../components/FrameComponent";

import { useCallback } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./FrameComponent.css";
import f1 from "../assets/group-1.svg";
import f2 from "../assets/password-icon.svg";
import { supabase } from "./supabaseClient"; // Import your Supabase client configuration

import "./Signup.css";
import s1 from "../assets/logindiet.png";
import s2 from "../assets/rectangle-20.svg";

import s3 from "../assets/rectangle-21.svg";
import s4 from "../assets/group.svg";
import Layout from "./Layout";

// const navigate = useNavigate();

// const onSiginContainerClick = useCallback(() => {
//   navigate("/login");
// }, [navigate]);

export default function Signup() {
  const navigate = useNavigate();

  const onSiginContainerClick = useCallback(() => {
    navigate("/Login");
  }, [navigate]);

  const [arrlist, setArrlist] = React.useState([]);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [regdata, setRegdata] = React.useState({
    username: "",
    password: "",
    password2: "",
  });

  async function handleSupabaseSignUp(email, password) {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setAlertMessage(`Error: ${error.message}`);
      } else {
        setArrlist((oldarr) => [...oldarr, user]);
        setAlertMessage("Successful!");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      setAlertMessage(`Error: ${error.message}`);
    }
  }

  function handleChange(event) {
    setRegdata((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (regdata.password === regdata.password2) {
      handleSupabaseSignUp(regdata.username, regdata.password);
    } else {
      setAlertMessage("Error: Passwords do not match!");
    }
  }

  React.useEffect(
    () => localStorage.setItem("regdata", JSON.stringify(arrlist)),
    [arrlist]
  );
  return (
    <Layout>
      <div className="login">
        <img className="frame-child" alt="" src={s1} />
        {/* <main className="rectangle-parent">
          <img className="frame-item" alt="" src={s2} />
          <img className="frame-inner" alt="" src={s3} />
        </main> */}
        {/* <header className="signup-inner">
          <div className="frame-parent">
            <div className="logo-wrapper">
              <div className="logo">
                <div className="healthybite-parent">
                  <div className="healthybite">
                    <span className="healthybite">HealthyBite</span>
                  </div>
                  <div className="group-wrapper">
                    <img className="group-icon" alt="" src={s4} />
                  </div>
                </div>
              </div>
            </div>
            }
            <div className="features">
              <div className="features1">Features</div>
            </div>
            <div className="blogs">
              <div className="features2">Blogs</div>
            </div>
          </div>
        </header> */}
        {/* <FrameComponent /> */}
        <form className="frame-container" onSubmit={handleSubmit}>
          <div className="sign-up-wrapper">
            <h3 className="sign-up">Sign up</h3>
          </div>

          <div className="email-button">
            <div className="email1">Email</div>
            <div className="box1">
              <div className="text1">
                <input
                  className="abcgmailcom1"
                  placeholder="abc@gmail.com"
                  type="text"
                  onChange={handleChange}
                  name="username"
                  value={regdata.username}
                />

                <img className="group-icon2" alt="" src={f1} />
              </div>
            </div>
          </div>
          <div className="passwordbutton">
            <div className="email2">Password</div>
            <div className="box2">
              <div className="text2">
                <input
                  className="input"
                  placeholder="............."
                  type="text"
                  onChange={handleChange}
                  name="password"
                  value={regdata.password}
                />
                <img className="password-icon" alt="" src={f2} />
              </div>
            </div>
          </div>

          <div className="passwordbutton">
            <div className="email2"> Confirm Password</div>
            <div className="box2">
              <div className="text2">
                <input
                  className="input"
                  placeholder="............."
                  type="text"
                  onChange={handleChange}
                  name="password2"
                  value={regdata.password2}
                />
                <img className="password-icon" alt="" src={f2} />
              </div>
            </div>
          </div>

          <div className="by-signing-up-you-agree-with-t-parent">
            <div className="by-signing-up-container">
              <span className="by-signing-up">{`By signing up you agree with the `}</span>
              <span className="privacy-policy">Privacy policy</span>
              <span className="and">{` and `}</span>
              <span className="terms">Terms</span>
              <span className="of-healthybite"> of Healthybite</span>
            </div>
            <button className="start-button">
              <div className="login1">Get started</div>
            </button>
            {alertMessage && <p className="error"> {alertMessage} </p>}
          </div>
          <div className="frame-wrapper">
            <div className="frame-div">
              <div className="already-have-an-account-wrapper">
                <div className="already-have-an">Already have an account?</div>
              </div>
              <div className="sigin" onClick={onSiginContainerClick}>
                <div className="sign-in">Sign in</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

// export default Signup;
