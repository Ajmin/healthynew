import React from "react";

export default function Register() {
  const [arrlist, setArrlist] = React.useState([]);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [regdata, setRegdata] = React.useState({
    username: "",
    password: "",
    password2: "",
  });

  function handleChange(event) {
    setRegdata((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (regdata.password === regdata.password2) {
      setArrlist((oldarr) => [...oldarr, regdata]);
      setAlertMessage("Succesful!");
      await supabase.auth.signUp({
        email: regdata.email,
        password: regdata.password,
      });
    } else setAlertMessage("Error: Passwords do not match!");
  }

  return (
    <div className="Register">
      {/* <p>{arrlist}</p> */}
      <form className="reg--form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
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
