import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
  if (!props.loggedIn) {
    return <Navigate to='/' replace />;
  } else {

    return <Component {...props} />;
  }

};

export default ProtectedRoute;





