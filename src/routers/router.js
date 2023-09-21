import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import { Dashboard, Login, Produtos } from '../pages';


function Private(component) {
  return <PrivateRoute>{component}</PrivateRoute>;
}

export const AppRoutes = () => {

  return (
    <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={Private(<Dashboard />)} />
         <Route path="/produtos" element={Private(<Produtos />)} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}