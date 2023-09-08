import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../auth/AuthContext";
import TaskManagement from "./TaskManagement";
import Team from "./Team";
import generateUniqueId from "generate-unique-id";
import tasks from "../data/data";
import FilterComponent from "./FilterComponent";

const Sidebar = () => {
  const [task, setTask] = useState(true);
  const [team, setTeam] = useState(false);
  const [filtering, setFiltering] = useState(false);

  const { user, handleCreateTask } = useUserAuth();
  const handelClick = (props) => {
    if (props === "task") {
      setTask(true);
      setFiltering(false);
      setTeam(false);
    }
    if (props === "Team") {
      setTask(false);
      setFiltering(false);
      setTeam(true);
    }
    if (props === "Filtering") {
      setTask(false);
      setFiltering(true);
      setTeam(false);
    }
  };

  //   const [allTasks, setAllTasks] = useState(tasks);
  //   const handleCreateTask = (newTask) => {
  //     // Assuming you have a unique ID generator function.
  //     newTask.id = generateUniqueId();
  //     setAllTasks([...allTasks, newTask]);
  //   };

  return (
    <div className="d-flex">
      <div>
        {user && (
          <div className="d-flex flex-column m-5 border   p-5">
            <Link onClick={() => handelClick("task")}>Task Management</Link>
            <Link onClick={() => handelClick("Team")}> Team Collaboration</Link>
            <Link onClick={() => handelClick("Filtering")}> Filtering</Link>
          </div>
        )}
      </div>
      <div>{task && <TaskManagement onCreateTask={handleCreateTask} />}</div>
      <div>{team && <Team />}</div>
      <div>{filtering && <FilterComponent />}</div>
    </div>
  );
};

export default Sidebar;
