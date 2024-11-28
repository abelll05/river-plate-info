// src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Importa el archivo CSS para el navbar con el fondo rojo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          RIVER PLATE
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link> {/* Enlace a Home */}
          </li>
          <li className="navbar-item">
            <Link to="/history" className="navbar-link">
              Historia
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/team" className="navbar-link">
              Plantel
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/socios" className="navbar-link">
              Socios
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/accesos-estadio" className="navbar-link">
              Accesos al Estadio
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/redes" className="navbar-link">
              Redes
            </Link>
          </li>
          {/* Agregar el enlace de Logout */}
          <li className="navbar-item">
            <Link to="/logout" className="navbar-link">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
