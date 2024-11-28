// src/components/Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Eliminar el token de localStorage
    localStorage.removeItem("token");

    // Redirigir al login
    navigate("/login");
  }, [navigate]);

  return null; // No necesitamos mostrar nada en la interfaz
};

export default Logout;
