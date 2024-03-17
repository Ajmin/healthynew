// import React from "react";

// export default function Register() {
//   const [arrlist, setArrlist] = React.useState([]);
//   const [alertMessage, setAlertMessage] = React.useState("");
//   const [regdata, setRegdata] = React.useState({
//     username: "",
//     password: "",
//     password2: "",
//   });

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
//       setArrlist((oldarr) => [...oldarr, regdata]);
//       setAlertMessage("Succesful!");
//     } else setAlertMessage("Error: Passwords do not match!");
//   }

//   React.useEffect(
//     () => localStorage.setItem("regdata", JSON.stringify(arrlist)),
//     [arrlist]
//   );

//   return (
//     <div className="Register">
//       {/* <p>{arrlist}</p> */}
//       <form className="reg--form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="User Name"
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
//         <button>Register</button>
//         {alertMessage && <p className="error"> {alertMessage} </p>}
//       </form>
//     </div>
//   );
// }

import React from "react";
import { supabase } from "./supabaseClient"; // Import your Supabase client configuration

export default function Register() {
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
    <div className="Register">
      <form className="reg--form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="username"
          value={regdata.username}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={regdata.password}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          name="password2"
          value={regdata.password2}
        />
        <button className="Reg">Register</button>
        {alertMessage && <p className="error"> {alertMessage} </p>}
      </form>
    </div>
  );
}
