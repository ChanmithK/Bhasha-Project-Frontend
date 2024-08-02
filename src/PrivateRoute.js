import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Redirect to login page if user is not authenticated
  return user ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
