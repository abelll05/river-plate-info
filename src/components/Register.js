import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Importa Link aquí
import "./Auth.css"; // Importamos el archivo CSS

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Usamos useNavigate para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Primero, registra al usuario
      const registerResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`, // Usar la URL de la variable de entorno
        { username, email, password }
      );
      alert("Registro exitoso");

      // Luego, haz el login automáticamente con los datos del registro
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`, 
        { email, password },
        { withCredentials: true } // Para manejar las cookies de sesión
      );

      // Si el login es exitoso, redirige a la página principal
      alert("Login exitoso");
      navigate("/"); // Redirige a la página de inicio o home
    } catch (error) {
      // Manejo de errores
      if (error.response) {
        // Error recibido desde el backend
        setError(error.response.data.message || "Error al registrar o iniciar sesión");
      } else if (error.request) {
        // Error al hacer la solicitud (backend no responde)
        setError("No se pudo conectar con el servidor");
      } else {
        // Otro tipo de error
        setError("Error desconocido");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box shadow">
        <h1 className="auth-title">Registrarse</h1>
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
          <Link to="/login" className="auth-link-red">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
