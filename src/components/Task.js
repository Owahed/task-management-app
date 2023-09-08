// src/components/Task.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../auth/AuthContext";

const Task = ({ task }) => {
  const { howShow } = task;
  const { user } = useUserAuth();
  const [status, setStatus] = useState(task.status || "In Progress");

  const toggleStatus = () => {
    setStatus(status === "In Progress" ? "Completed" : "In Progress");
  };
  // const find = true;
  const find = howShow?.find((e) => e === user.email);
  // console.log("task", howShow, user.email);
  return (
    <div>
      <h3>Name: {task.title}</h3>

      <p>Priority: {task.priority}</p>
      <p>Status: {status}</p>
      {find ? (
        <button className="btn btn-secondary" onClick={toggleStatus}>
          {status === "In Progress" ? "Mark Completed" : "Mark In Progress"}
        </button>
      ) : (
        ""
      )}
      <Link to={`/invite/${task.id}/task`} class="btn btn-primary">
        assignTasks
      </Link>
    </div>
  );
};

export default Task;
