const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  image: {
    type: String, // URL de la imagen del jugador
    default: "https://via.placeholder.com/150",
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
