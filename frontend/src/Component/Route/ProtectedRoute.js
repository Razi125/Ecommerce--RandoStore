import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Protected Routing Will be Reading

const ProtectedRoute = ({ children}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <Fragment>
      {!loading &&
        (isAuthenticated ? (
          children
        ) : !isAuthenticated ? (
          <Navigate to="/login" />
        ) : (
          ""
        ))}
    </Fragment>
  );
};
export default ProtectedRoute;
