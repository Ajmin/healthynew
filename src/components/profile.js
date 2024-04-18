import { useContext } from "react";
import { useState } from "react";
import React from "react";
import { supabase } from "./supabaseClient";
import { MealContext } from "../App";

function Profile() {
  const [meal, setMeal, User, setUser] = useContext(MealContext);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    gender: "",
    weight: "",
    weightGoal: "",
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      console.log("never once");
      const currentUser = await supabase.auth.getUser();
      if (currentUser.data.user != null) setUser(currentUser);
    };
    if (User == null) fetchUser();
  }, []);

  const submitData = async (newData) => {
    try {
      let BMRval;
      if (newData.gender === "male") {
        BMRval =
          88.362 +
          13.397 * newData.weight +
          4.799 * newData.height -
          5.677 * newData.age;
      } else {
        BMRval =
          447.593 +
          9.247 * newData.weight +
          3.098 * newData.height -
          4.33 * newData.age;
      }
      if (newData.activityfactor === "sedentary") {
        newData.activityfactor = 1.2;
      } else if (newData.activityfactor === "light") {
        newData.activityfactor = 1.375;
      } else if (newData.activityfactor === "moderate") {
        newData.activityfactor = 1.55;
      } else if (newData.activityfactor === "very") {
        newData.activityfactor = 1.725;
      } else if (newData.activityfactor === "extreme") {
        newData.activityfactor = 1.9;
      }

      const { data, error } = await supabase.from("User-info").insert(
        [newData].map((item) => ({
          ...item,
          BMR: BMRval,
          id: User.data.user.id,
        }))
      );
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error modifying data:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    submitData(formData);
  };

  return (
    <div className="UserForm">
      <h1 className="UserForm-title">User Information Form</h1>
      <form className="UserForm-form" onSubmit={handleSubmit}>
        <label className="UserForm-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="UserForm-input"
          />
        </label>

        <label className="UserForm-label">
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="UserForm-input"
          />
        </label>

        <label className="UserForm-label">
          Height:
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="UserForm-input"
          />
        </label>

        <label className="UserForm-label">
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="UserForm-select"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="UserForm-label">
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="UserForm-input"
          />
        </label>

        <label className="UserForm-label">
          Weight Goal:
          <input
            type="number"
            name="weightGoal"
            value={formData.weightGoal}
            onChange={handleChange}
            className="UserForm-input"
          />
        </label>

        <label className="UserForm-label">
          Actiivty Group:
          <select
            name="activityfactor"
            value={formData.activityfactor}
            onChange={handleChange}
            className="UserForm-select"
          >
            <option value="sedentery">Sedentary</option>
            <option value="light">Lightly Active</option>
            <option value="moderate">Moderately Active</option>
            <option value="very">Very Active</option>
            <option value="extreme">Extremely Active</option>
          </select>
        </label>

        <button type="submit" className="UserForm-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Profile;
