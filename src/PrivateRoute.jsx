import React from "react";
import { isAuthenticated } from "./Services/auth";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;
