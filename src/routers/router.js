import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import { Dashboard, Login } from '../pages';


function Private(component) {
  return <PrivateRoute>{component}</PrivateRoute>;
}

export const AppRoutes = () => {

  return (
    <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={Private(<Dashboard />)} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}