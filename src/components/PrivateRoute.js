import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ adminUser, children }) => {
  if (adminUser !== true) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
