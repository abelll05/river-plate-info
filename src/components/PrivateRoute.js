import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente de ruta privada que protegerá las rutas donde se requiera autenticación
const PrivateRoute = ({ children, token }) => {
  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" />;
  }

  return children; // Si hay token, muestra el contenido de la ruta
};

export default PrivateRoute;
