import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const AppRoutes = () => {

  return (
    <Routes>
       <Route path="/login" element={<Button variant='contained' color='primary'>Teste</Button>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}