import React, { useEffect, useState, useRef } from "react";
import DataTable from "../../components/common/Table";
import CreateTaskModal from "./Create";
import EditTaskModal from "./Edit";
import { getTasks, createTask, updateTask, deleteTask } from "../../api/tasks";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchAllTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const res = await createTask(taskData);
      setTasks((prev) => [...prev, res.data]);
      setShowCreateModal(false);
    } catch (err) {
      console.error("Failed to create task", err);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const res = await updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      setEditTask(null);
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const columns = [
    { header: "#", accessor: "_id", render: (_, row, i) => i + 1 },
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "description" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span
          className={`badge ${value === "Pending"
              ? "bg-warning text-dark"
              : value === "In Progress"
                ? "bg-info text-dark"
                : "bg-success"
            }`}
        >
          {value}
        </span>
      ),
    },
    { header: "Assigned User", accessor: "assignedUser" },
    {
      header: "Due Date",
      accessor: "dueDate",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <>
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => setEditTask(row)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteTask(row._id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2 className="fw-bold mb-3">Tasks</h2>
      <DataTable
        columns={columns}
        data={tasks}
        showSearch={true}
        showAddButton={true}
        addButtonText="Add New Task"
        onAdd={() => setShowCreateModal(true)}
      />

      <CreateTaskModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTask}
      />

      {editTask && (
        <EditTaskModal
          show={!!editTask}
          task={editTask}
          onClose={() => setEditTask(null)}
          onSubmit={(data) => handleUpdateTask(editTask._id, data)}
        />
      )}
    </div>
  );
};

export default Tasks;
