import { Routes, Route, Navigate } from 'react-router-dom';

import { Login } from '../pages';

export const AppRoutes = () => {

  return (
    <Routes>
         <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}