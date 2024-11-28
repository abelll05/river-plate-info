// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // O el estado que manejes

  if (!token) {
    // Si no hay token, redirige a /login
    return <Navigate to="/login" />;
  }

  return children; // Si hay token, renderiza los hijos (el contenido protegido)
};

export default PrivateRoute;
