import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const AdminDashboard = () => {
const navigate=useNavigate();
    const Logout=()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login")
    }
    
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="createuser">Create User</Link></li>
            <li><Link to="viewuser">View Users</Link></li>
            <li><Link to="admintask">View Tasks</Link></li>
            <li onClick={Logout} className="AdminLogout">Logout</li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;