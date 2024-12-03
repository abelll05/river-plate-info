// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./db"); // Conexión a la base de datos MongoDB
const authRoutes = require("./routes/auth"); // Rutas de autenticación

// Configuración de variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Inicializar la app
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json()); // Parsear JSON en el cuerpo de las solicitudes
app.use(cookieParser()); // Manejo de cookies

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Cambia esto según tu entorno de frontend
    credentials: true, // Permitir el envío de cookies en solicitudes cruzadas
  })
);

app.use(morgan("dev")); // Registrar las solicitudes en consola (útil para desarrollo)

// Rutas de autenticación
app.use("/api/auth", authRoutes); // Ruta para el registro y login de usuarios

// Ruta principal
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de River Plate!");
});

// Ruta para obtener la lista de jugadores
app.get("/api/players", async (req, res) => {
  try {
    const players = [
      // Arqueros
      { name: "Franco Armani", position: "Arquero" },
      { name: "Jeremías Ledesma", position: "Arquero" },
      { name: "Lucas Lavagnino", position: "Arquero" },
      { name: "Santiago Beltrán", position: "Arquero" },
      // Defensores
      { name: "Ramiro Funes Morí", position: "Defensor" },
      { name: "Federico Gattoni", position: "Defensor" },
      { name: "Enzo Diaz", position: "Defensor" },
      { name: "Leandro Gonzalez Pirez", position: "Defensor" },
      { name: "Fabricio Bustos", position: "Defensor" },
      { name: "Paulo Diaz", position: "Defensor" },
      { name: "Milton Casco", position: "Defensor" },
      { name: "Daniel Zabala", position: "Defensor" },
      { name: "Marcos Acuña", position: "Defensor" },
      { name: "Agustín Santana", position: "Defensor" },
      { name: "German Pezzela", position: "Defensor" },
      // Volantes
      { name: "Nicolas Fonseca", position: "Volante" },
      { name: "Matias Kranevitter", position: "Volante" },
      { name: "Manuel Lanzini", position: "Volante" },
      { name: "Gonzalez Martínez", position: "Volante" },
      { name: "Claudio Echeverri", position: "Volante" },
      { name: "Rodrigo Villagra", position: "Volante" },
      { name: "Ignacio Fernández", position: "Volante" },
      { name: "Rodrigo Aliendro", position: "Volante" },
      { name: "Franco Mastantuono", position: "Volante" },
      { name: "Santiago Simón", position: "Volante" },
      { name: "Jonas Luna", position: "Volante" },
      { name: "Tobias Leiva", position: "Volante" },
      { name: "Santiago Lencina", position: "Volante" },
      // Delanteros
      { name: "Adam Bareiro", position: "Delantero" },
      { name: "Maximiliano Meza", position: "Delantero" },
      { name: "Miguel Borja", position: "Delantero" },
      { name: "Facundo Colidio", position: "Delantero" },
      { name: "Agustín Ruberto", position: "Delantero" },
      { name: "Pablo Solari", position: "Delantero" },
      { name: "Ian Suriabre", position: "Delantero" },
      { name: "Tomas Nasif", position: "Delantero" },
    ];

    res.json(players); // Enviar la lista de jugadores como respuesta
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los jugadores", error: error.message });
  }
});

// Manejo de rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
