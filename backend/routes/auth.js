const express = require("express");
const bcrypt = require("bcryptjs"); // Usar bcryptjs para el cifrado
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Importa el modelo de usuario

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validación de los datos
  if (!email || !password) {
    return res.status(400).json({ message: "Por favor ingresa un correo y una contraseña" });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 12); // Se ha aumentado el número de rondas

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
});

// Ruta para iniciar sesión (login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validación de los datos
  if (!email || !password) {
    return res.status(400).json({ message: "Por favor ingresa un correo y una contraseña" });
  }

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña ingresada comparándola con la almacenada (cifrada)
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("¿Contraseña correcta?", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar el token de JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Enviar el token como una cookie segura (SameSite=None para CORS)
    res.cookie("__vercel_live_token", token, {
      httpOnly: true,  // No accesible desde JavaScript
      secure: process.env.NODE_ENV === "production",  // Sólo en producción usar HTTPS
      sameSite: "None",  // Necesario para cookies entre sitios (cross-site)
    });
    

    res.json({ message: "Autenticación exitosa", token }); // Enviar el token en la respuesta
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
});

module.exports = router;
