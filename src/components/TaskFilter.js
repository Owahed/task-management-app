import React, { useState } from "react";

function TaskFilter({ onFilterChange }) {
  const [statusFilter, setStatusFilter] = useState({
    completed: false,
    inProgress: false,
    pending: false,
  });
  const [dueDateFilter, setDueDateFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const handleStatusChange = (status) => {
    setStatusFilter({ ...statusFilter, [status]: !statusFilter[status] });
  };

  const handleDueDateChange = (e) => {
    setDueDateFilter(e.target.value);
  };

  const handlePriorityChange = (priority) => {
    setPriorityFilter(priority);
  };

  const applyFilters = () => {
    onFilterChange({
      status: statusFilter,
      dueDate: dueDateFilter,
      priority: priorityFilter,
    });
  };

  return (
    <div>
      <h3>Task Filters</h3>
      <label>
        <input
          type="checkbox"
          checked={statusFilter.completed}
          onChange={() => handleStatusChange("completed")}
        />
        Completed
      </label>
      <label>
        <input
          type="checkbox"
          checked={statusFilter.inProgress}
          onChange={() => handleStatusChange("inProgress")}
        />
        In Progress
      </label>
      <label>
        <input
          type="checkbox"
          checked={statusFilter.pending}
          onChange={() => handleStatusChange("pending")}
        />
        Pending
      </label>
      <label>
        Due Date:
        <input
          type="date"
          value={dueDateFilter}
          onChange={handleDueDateChange}
        />
      </label>
      <div>
        Priority:
        <label>
          <input
            type="radio"
            name="priority"
            value="high"
            checked={priorityFilter === "high"}
            onChange={() => handlePriorityChange("high")}
          />
          High
        </label>
        <label>
          <input
            type="radio"
            name="priority"
            value="medium"
            checked={priorityFilter === "medium"}
            onChange={() => handlePriorityChange("medium")}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            name="priority"
            value="low"
            checked={priorityFilter === "low"}
            onChange={() => handlePriorityChange("low")}
          />
          Low
        </label>
      </div>
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
}

export default TaskFilter;
