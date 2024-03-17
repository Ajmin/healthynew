import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient.js";
import img1 from "./images/group1.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
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
      <img
        src={img1}
        onClick={() => handleChange("/")}
        className="nav--logo_text"
        alt="Logo"
      />
      <div className="nav--title">
        {user ? (
          <>
            <button
              className="minimal-black-btn"
              onClick={() => handleChange("/programs")}
            >
              Programs
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
              onClick={() => handleChange("/login")}
            >
              Login
            </button>

            <button
              className="minimal-black-btn"
              onClick={() => handleChange("/register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
