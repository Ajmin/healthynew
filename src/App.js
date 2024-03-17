import React from "react";
import Navbar from "./components/Navbar.js";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import Programs from "./components/Programs.js";
import Profile from "./components/profile.js";
import Portal from "./components/portal.js";
import Product from "./components/product.js";
import Suggestive from "./components/suggestive.js";
import UserProgress from "./components/userprogress.js";
import { Route, Routes, useNavigate } from "react-router-dom";

function ProducSearch() {
  const [prodSearch, setprodSearch] = React.useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    setprodSearch(e.target.value);
  }

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=769d990d&app_key=079405f7193edf8d8f8ca3f7cf7cb345&ingr=${prodSearch}&nutrition-type=cooking`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      navigate("product", { state: data });
    }
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Search your product"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={prodSearch}
      />
    </div>
  );
}

function Home() {
  return (
    <div className="Home">
      <div className="description-container">
        <h1 className="title">One Step Solution</h1>
        <p className="subtitle">For all your dietary needs!</p>
        <p className="main-description">
          Using your BMI index we calculate whether the dish is suitable for
          you.
        </p>
        <ProducSearch />
        <p className="cta" link>
          <a href="/portal">Start Your Journey Today</a>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [rerender, setRerender] = React.useState(0);

  function handleState() {
    setRerender(() => 1);
    console.log(rerender);
  }
  return (
    <div>
      <Navbar />
      <div className="Maincontent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login handleRender={handleState} />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/product" element={<Product />} />
          <Route path="/suggestive" element={<Suggestive />} />
          <Route path="/userprogress" element={<UserProgress />} />
        </Routes>
      </div>
    </div>
  );
}
