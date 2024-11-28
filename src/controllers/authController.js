// src/controllers/authController.js
import nodemailer from 'nodemailer';

const sendConfirmationEmail = async (email) => {
  // Crea un transporte para enviar el correo (con Gmail como ejemplo)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tucorreo@gmail.com', // Tu correo de Gmail
      pass: 'tucontraseña' // Tu contraseña o App Password de Gmail
    }
  });

  // Configura el contenido del correo
  const mailOptions = {
    from: 'tucorreo@gmail.com',
    to: email,
    subject: 'Confirmación de Registro',
    text: '¡Gracias por registrarte en nuestra página! Tu registro ha sido exitoso.'
  };

  // Envía el correo
  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de confirmación enviado');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

// Luego en tu función de registro
const registerUser = async (req, res) => {
  const { email } = req.body;
  
  // Realiza la lógica de registro (guardar usuario en la base de datos, etc.)
  
  // Envía el correo de confirmación
  await sendConfirmationEmail(email);
  
  res.status(200).json({ message: 'Registro exitoso. Revisa tu correo para la confirmación.' });
};

export default registerUser;
