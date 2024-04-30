// import { useCallback } from "react";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./FrameComponent.css";
// import f1 from "../assets/group-1.svg";
// import f2 from "../assets/password-icon.svg";
// import { supabase } from "./supabaseClient"; // Import your Supabase client configuration
// // import f3 from "../assets/group-2.svg";
// // import f4 from "../assets/group-3.svg";
// export default function FrameComponent() {
//   const navigate = useNavigate();

//   const onSiginContainerClick = useCallback(() => {
//     navigate("/Login");
//   }, [navigate]);

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
//     <form className="frame-container" onSubmit={handleSubmit}>
//       <div className="sign-up-wrapper">
//         <h3 className="sign-up">Sign up</h3>
//       </div>

//       <div className="email-button">
//         <div className="email1">Email</div>
//         <div className="box1">
//           <div className="text1">
//             <input
//               className="abcgmailcom1"
//               placeholder="abc@gmail.com"
//               type="text"
//               onChange={handleChange}
//               name="username"
//               value={regdata.username}
//             />

//             <img className="group-icon2" alt="" src={f1} />
//           </div>
//         </div>
//       </div>
//       <div className="passwordbutton">
//         <div className="email2">Password</div>
//         <div className="box2">
//           <div className="text2">
//             <input
//               className="input"
//               placeholder="............."
//               type="text"
//               onChange={handleChange}
//               name="password"
//               value={regdata.password}
//             />
//             <img className="password-icon" alt="" src={f2} />
//           </div>
//         </div>
//       </div>

//       <div className="passwordbutton">
//         <div className="email2"> Confirm Password</div>
//         <div className="box2">
//           <div className="text2">
//             <input
//               className="input"
//               placeholder="............."
//               type="text"
//               onChange={handleChange}
//               name="password2"
//               value={regdata.password2}
//             />
//             <img className="password-icon" alt="" src={f2} />
//           </div>
//         </div>
//       </div>

//       <div className="by-signing-up-you-agree-with-t-parent">
//         <div className="by-signing-up-container">
//           <span className="by-signing-up">{`By signing up you agree with the `}</span>
//           <span className="privacy-policy">Privacy policy</span>
//           <span className="and">{` and `}</span>
//           <span className="terms">Terms</span>
//           <span className="of-healthybite"> of Healthybite</span>
//         </div>
//         <button className="start-button">
//           <div className="login1">Get started</div>
//         </button>
//         {alertMessage && <p className="error"> {alertMessage} </p>}
//       </div>
//       <div className="frame-wrapper">
//         <div className="frame-div">
//           <div className="already-have-an-account-wrapper">
//             <div className="already-have-an">Already have an account?</div>
//           </div>
//           <div className="sigin" onClick={onSiginContainerClick}>
//             <div className="sign-in">Sign in</div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }
