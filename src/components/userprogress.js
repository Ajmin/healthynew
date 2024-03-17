import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const UserProgress = () => {
  const calorieIntake = 1500;
  const calorieAllowedPerDay = 2000;
  const waterIntake = 4;
  const waterAllowedPerDay = 8;
  const activities = ["Running", "Cycling", "Swimming"];
  const sleepCycle = { startTime: "10:00 PM", endTime: "6:00 AM" };

  const calorieProgress = (calorieIntake / calorieAllowedPerDay) * 100;
  const waterProgress = (waterIntake / waterAllowedPerDay) * 100;

  const calorieExceeded = calorieIntake > calorieAllowedPerDay;

  return (
    <div className="up-container">
      <div className="up-progress-item">
        <h2>Calorie Intake</h2>
        <CircularProgress
          variant="determinate"
          value={calorieProgress}
          color={calorieExceeded ? "secondary" : "primary"}
        />
        <p>
          {calorieIntake} / {calorieAllowedPerDay} calories
        </p>
      </div>
      <div className="up-progress-item">
        <h2>Water Intake</h2>
        <CircularProgress
          variant="determinate"
          value={waterProgress}
          color="primary"
        />
        <p>
          {waterIntake} / {waterAllowedPerDay} glasses
        </p>
      </div>
      <div className="activity">
        <h2>Activities</h2>
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
      <div className="sleep-cycle">
        <h2>Sleep Cycle</h2>
        <p>Start Time: {sleepCycle.startTime}</p>
        <p>End Time: {sleepCycle.endTime}</p>
      </div>
    </div>
  );
};

export default UserProgress;
