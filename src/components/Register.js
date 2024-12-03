import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import "./Auth.css"; // Importamos el archivo CSS

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Usamos useNavigate para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register", 
        {
          username,
          email,
          password,
        },
        { withCredentials: true } // Aseguramos que las cookies se envíen en la solicitud
      );
      alert("Registro exitoso");

      // Después del registro, hacemos login automáticamente
      const loginResponse = await axios.post(
        "http://localhost:5000/api/auth/login", 
        {
          email,
          password,
        },
        { withCredentials: true } // Aseguramos que las cookies se envíen en la solicitud
      );
      setToken(loginResponse.data.token);
      navigate("/"); // Redirigimos al home después de iniciar sesión
    } catch (error) {
      setError(error.response ? error.response.data.message : "Error en la conexión");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box shadow">
        <h1 className="auth-title">Registro</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label>Nombre de usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu nombre de usuario"
              required
            />
          </div>
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
            Registrarse
          </button>
        </form>
        <p className="auth-footer">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="auth-link-red">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
