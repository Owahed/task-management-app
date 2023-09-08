import React, { useState } from "react";
import { useUserAuth } from "../auth/AuthContext";
import Task from "./Task";

const TaskManagement = ({ onCreateTask }) => {
  const { allTasks } = useUserAuth();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    assignee: "",
    team: "",
    howShow: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTask(taskData);
    setTaskData({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      assignee: "",
      team: "",
      howShow: [],
    });
    // console.log("taskData", taskData);
  };
  return (
    <div className="d-flex">
      <div className="task-form">
        <h2>Create a New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="m-2"
            placeholder="Title"
            value={taskData.title}
            onChange={handleChange}
          />
          <br />
          {/* <input
            type="text"
            name="team"
            className="m-2"
            placeholder="team"
            value={taskData.team}
            onChange={handleChange}
          />
          <br /> */}
          <textarea
            name="description"
            className="m-2"
            placeholder="Description"
            value={taskData.description}
            onChange={handleChange}
          ></textarea>
          <br />
          <input
            type="date"
            name="dueDate"
            className="m-2"
            value={taskData.dueDate}
            onChange={handleChange}
          />
          <br />
          <select
            name="priority"
            className="m-2"
            value={taskData.priority}
            onChange={handleChange}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <br />
          <input
            type="text"
            name="assignee"
            className="m-2"
            placeholder="Assignee"
            value={taskData.assignee}
            onChange={handleChange}
          />
          <br />
          <button className="m-2 btn btn-primary" type="submit">
            Create Task
          </button>
        </form>
      </div>
      <div
        className="task-components"
        // style={{ height: "100px", marginLeft: "40px", display: "grid" }}
      >
        {allTasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
