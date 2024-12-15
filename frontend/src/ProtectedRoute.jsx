import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children,authToken, role, allowedRole }) => {
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  if(!role){
    return <Navigate to="/login"/>
  }


  if (role !== allowedRole) {
    return <Navigate to={role === "admin" ? "/admindashboard" : "/task"} />;
  }

  return children;
};

export default ProtectedRoute;
