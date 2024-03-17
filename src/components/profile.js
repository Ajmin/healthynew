import React, { useState } from "react";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    gender: "",
    weight: "",
    weightGoal: "",
  });

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
