const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  // Validar que la URI esté definida
  if (!mongoURI) {
    console.error("Error: MONGO_URI no está definido en las variables de entorno.");
    process.exit(1); // Finaliza el proceso con error
  }

  try {
    // Conexión a MongoDB utilizando la URI
    const conn = await mongoose.connect(mongoURI, {
      // Opciones opcionales, aunque no estrictamente necesarias en Mongoose 6+
      autoIndex: true, // Crear automáticamente índices en MongoDB
      serverSelectionTimeoutMS: 5000, // Tiempo máximo para seleccionar un servidor
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    // Manejo de errores con mensaje detallado
    console.error(`Error conectando a MongoDB: ${error.message}`);
    process.exit(1); // Finaliza el proceso con error
  }
};

module.exports = connectDB;
