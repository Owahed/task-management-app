import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  // const user = false;

  // console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
