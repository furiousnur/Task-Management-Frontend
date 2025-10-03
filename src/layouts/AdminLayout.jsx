import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import toastr from "toastr";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toastr.success("Logout successful!");
    navigate("/");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/tasks">
              <i className="bi bi-list-task me-2"></i> Tasks
            </Link>
          </li>
          <li className="nav-item mt-3">
            <button onClick={handleLogout} className="btn btn-danger w-100">
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-grow-1">
        <nav className="navbar navbar-light bg-light shadow-sm px-3">
          <span className="navbar-brand mb-0 h5">Task Manager</span>
        </nav>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
