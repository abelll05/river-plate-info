import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./Auth.css"; // Importamos el archivo CSS

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Usamos useNavigate para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`, // Usar la URL de la variable de entorno
        {
          email,
          password,
        },
        { withCredentials: true } // Agregar esta línea para enviar cookies
      );
      setToken(response.data.token); // Guardamos el token
      alert("Login exitoso");
      navigate("/"); // Redirigimos al home
    } catch (error) {
      setError(error.response 
        ? error.response.data.message 
        : error.request 
        ? "No se pudo conectar con el servidor" 
        : "Error desconocido"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box shadow">
        <h1 className="auth-title">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              required
            />
          </div>
          <div className="auth-input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-button auth-button-red">
            Iniciar sesión
          </button>
        </form>
        <p className="auth-footer">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="auth-link-red">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
