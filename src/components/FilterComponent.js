import React, { useState } from "react";
import TaskFilter from "./TaskFilter";
import { useUserAuth } from "../auth/AuthContext";

function TaskManager() {
  const { allTasks } = useUserAuth();
  const [tasks, setTasks] = useState(allTasks);
  const [filteredTasks, setFilteredTasks] = useState(allTasks);
  const [appliedFilters, setAppliedFilters] = useState({
    status: { completed: false, inProgress: false, pending: false },
    dueDate: "",
    priority: "",
  });

  const handleFilterChange = (filters) => {
    setAppliedFilters(filters);

    const filteredTasks = tasks.filter((task) => {
      const statusFilterPassed =
        (!filters.status.completed || task.status === "completed") &&
        (!filters.status.inProgress || task.status === "inProgress") &&
        (!filters.status.pending || task.status === "pending");

      const dueDateFilterPassed =
        !filters.dueDate || task.dueDate === filters.dueDate;

      const priorityFilterPassed =
        !filters.priority || task.priority === filters.priority;

      return statusFilterPassed && dueDateFilterPassed && priorityFilterPassed;
    });

    setFilteredTasks(filteredTasks);
  };
  return (
    <div>
      <TaskFilter onFilterChange={handleFilterChange} />
      <ul className="mt-2">
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <b className="text-info">Task Name:</b> {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
