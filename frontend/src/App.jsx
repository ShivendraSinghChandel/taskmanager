import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./adminComponents/Login";
import Register from "./adminComponents/Register";
import Task from "./userComponents/Task";
import AddTask from "./adminComponents/AddTask";
import AdminTask from "./adminComponents/AdminTask";
import CreateUser from "./adminComponents/CreateUser";
import ViewUser from "./adminComponents/ViewUser";
import UpdatingTask from "./adminComponents/UpdateTask";
import ViewDetails from "./userComponents/ViewDetails";
import AdminDashboard from "./adminComponents/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import ViewDetailsAdmin from "./adminComponents/ViewDetailsAdmin";

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);
  const [roles, setRoles] = useState(localStorage.getItem("role"));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authToken ? (
              roles === "admin" ? (
                <Navigate to="/admindashboard" />
              ) : (
                <Navigate to="/task" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<Login setAuthToken={setAuthToken} setRoles={setRoles} />} />
        <Route path="/register" element={<Register />} />

       
        <Route
          path="/task"
          element={
            <ProtectedRoute authToken={authToken} role={roles} allowedRole="user">
              <Task token={authToken} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewdetail/:id"
          element={
            <ProtectedRoute authToken={authToken} role={roles} allowedRole="user">
              <ViewDetails />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute authToken={authToken} role={roles} allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >

          <Route index element={<CreateUser />} />
          <Route path="createuser" element={<CreateUser />} />
          <Route path="viewuser" element={<ViewUser />} />
          <Route path="admintask" element={<AdminTask />} />
          <Route path="admintask/updatetask/:id" element={<UpdatingTask />} />
          <Route path="admintask/viewdetailadmin/:id" element={<ViewDetailsAdmin />} />
          <Route path="viewuser/addtask/:id" element={<AddTask token={authToken} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
