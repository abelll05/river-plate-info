const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Conexión a MongoDB utilizando la URI del archivo .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Mensaje de éxito si la conexión es exitosa
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    // Mensaje de error si ocurre un problema
    console.error(`Error conectando a MongoDB: ${error.message}`);

    // Finalizar el proceso con error
    process.exit(1);
  }
};

module.exports = connectDB;
