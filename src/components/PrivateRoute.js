import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente de ruta privada que protegerá las rutas donde se requiera autenticación
const PrivateRoute = ({ children }) => {
  // Verifica si hay un token en el localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" />;
  }

  // Si hay token, muestra el contenido de la ruta
  return children;
};

export default PrivateRoute;
