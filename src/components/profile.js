import React, { useState } from "react";
import { supabase } from "./supabaseClient";

function Profile() {
  const [User, setUser] = React.useState();
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
      const currentUser = await supabase.auth.getUser();
      if (currentUser.data.user != null) setUser(currentUser);
    };
    fetchUser();
  }, []);

  const submitData = async (newData) => {
    try {
      let BMRval;
      if (newData.gender == "male") {
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

        <button type="submit" className="UserForm-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Profile;
