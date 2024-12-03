import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

// Importa el Navbar con el color rojo
import Navbar from "./components/Navbar"; // Este es el navbar con el fondo rojo

// Componentes
import Home from "./components/Home";
import History from "./components/History";
import Team from "./components/Team";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute"; // Ruta privada
import Logout from "./components/Logout"; // Componente de Logout
import Socios from "./components/Socios"; // Componente Socios
import Estadio from "./components/Estadio"; // Componente Accesos al Estadio
import Redes from "./components/Redes"; // Componente Redes

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Cargar el token desde localStorage si existe
  const navigate = useNavigate(); // Hook para navegación

  // Función para verificar si el token ha expirado
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token); // Usar jwtDecode correctamente
      return decoded.exp * 1000 < Date.now(); // Verifica si la fecha de expiración es menor que la actual
    } catch (error) {
      return true; // Si no se puede decodificar el token, lo consideramos expirado
    }
  };

  // Guardar el token y redirigir a la página principal
  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("token", token); // Guardar el token en localStorage
    navigate("/"); // Redirigir a la página principal después de un login exitoso
  };

  useEffect(() => {
    // Verifica si el token está en localStorage
    const storedToken = localStorage.getItem("token");
  
    if (storedToken && isTokenExpired(storedToken)) {
      // Si el token está expirado, lo eliminamos
      localStorage.removeItem("token");
      setToken(null); // Limpiamos el estado del token
      navigate("/login");
    } else if (!storedToken && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
      // Si no hay token y no estamos en login/register, redirige al login
      navigate("/login");
    } else {
      setToken(storedToken); // Si el token existe, actualiza el estado
    }
  }, [navigate]);

  return (
    <div>
      {/* Aquí solo deberías tener el Navbar con el fondo rojo */}
      <Navbar />

      {/* Rutas dentro de <Routes> */}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={token ? <Home /> : <Login setToken={handleLogin} />} />
        <Route path="/login" element={<Login setToken={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
  path="/history"
  element={<PrivateRoute token={token}><History /></PrivateRoute>}
/>
<Route
  path="/team"
  element={<PrivateRoute token={token}><Team /></PrivateRoute>}
/>

        {/* Ruta de Logout */}
        <Route path="/logout" element={<Logout />} />

        {/* Nuevas rutas */}
        <Route path="/socios" element={<Socios />} />
        <Route path="/accesos-estadio" element={<Estadio />} />
        <Route path="/redes" element={<Redes />} />
      </Routes>
    </div>
  );
}

export default App;
