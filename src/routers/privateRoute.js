import React from 'react';
import { Navigate } from 'react-router-dom';
import Menu from '../menu';
import { isAuthenticated } from '../utils/AuthHelp'




function PrivateRoute({ children }) {
 
  return isAuthenticated() ? <Menu>{children}</Menu> : <Navigate to="/login" />;
}



export default PrivateRoute;