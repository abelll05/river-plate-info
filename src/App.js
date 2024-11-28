import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Asegúrate de que esta importación esté correcta

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
    // Verificar si el token está expirado
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");
      setToken(""); // Limpiar el token
      navigate("/login"); // Redirigir al login
    } else if (!token && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
      navigate("/login"); // Redirigir al login si no hay token y no estamos en las páginas de login o registro
    }
  }, [token, navigate]);

  return (
    <div>
      {/* Aquí solo deberías tener el Navbar con el fondo rojo */}
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={token ? <Home /> : <Login setToken={handleLogin} />} // Si hay token, mostrar Home, sino Login
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          } // Proteger la ruta History
        />
        <Route
          path="/team"
          element={
            <PrivateRoute>
              <Team />
            </PrivateRoute>
          } // Proteger la ruta Team
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={handleLogin} />} /> {/* Redirige a login */}

        {/* Ruta de Logout */}
        <Route path="/logout" element={<Logout />} /> {/* Aquí se maneja el logout */}

        {/* Nuevas rutas agregadas */}
        <Route path="/socios" element={<Socios />} /> {/* Ruta de Socios */}
        <Route path="/accesos-estadio" element={<Estadio />} /> {/* Ruta de Accesos al Estadio */}
        <Route path="/redes" element={<Redes />} /> {/* Ruta de Redes */}
      </Routes>
    </div>
  );
}

export default App;
