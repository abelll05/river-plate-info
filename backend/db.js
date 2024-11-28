// db.js
const mongoose = require("mongoose");
require('dotenv').config();  // Asegúrate de cargar las variables de entorno

const connectDB = async () => {
  try {
    // Verifica si la variable de entorno MONGO_URI está configurada
    if (!process.env.MONGO_URI) {
      console.error("Error: MONGO_URI no está definida en el archivo .env");
      process.exit(1); // Detener la app si no está configurada
    }

    // Intentar conectarse a MongoDB usando la URI del archivo .env
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Utiliza el nuevo parser de URL
      useUnifiedTopology: true, // Usar el nuevo motor de topología
    });

    // Si la conexión es exitosa, mostrar el host de la conexión
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    // Si ocurre un error al conectar, mostrar el error y detener la app
    console.error(`Error de conexión: ${error.message}`);
    process.exit(1); // Detener la app si falla la conexión
  }
};

module.exports = connectDB;
