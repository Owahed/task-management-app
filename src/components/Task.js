// src/components/Task.js
import React, { useState } from "react";

const Task = ({ task }) => {
  const [status, setStatus] = useState(task.status || "In Progress");

  const toggleStatus = () => {
    setStatus(status === "In Progress" ? "Completed" : "In Progress");
  };
  // console.log(task);
  return (
    <div>
      <h3>{task.title}</h3>
      <p>Team: {task.team}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {status}</p>
      <button className="btn btn-secondary" onClick={toggleStatus}>
        {status === "In Progress" ? "Mark Completed" : "Mark In Progress"}
      </button>
    </div>
  );
};

export default Task;
