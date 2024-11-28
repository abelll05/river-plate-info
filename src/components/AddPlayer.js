import React, { useState } from "react";
import axios from "axios";

const AddPlayer = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlayer = {
      name,
      position,
      nationality,
      birthdate,
      image,
    };

    axios
      .post("http://localhost:5000/api/players", newPlayer)
      .then((response) => {
        alert("Jugador agregado con éxito!");
        // Limpiar el formulario
        setName("");
        setPosition("");
        setNationality("");
        setBirthdate("");
        setImage("");
      })
      .catch((error) => {
        console.error("Error al agregar el jugador", error);
      });
  };

  return (
    <div>
      <h1>Agregar Jugador</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Posición:
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Nacionalidad:
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Fecha de nacimiento:
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Imagen (URL):
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Agregar Jugador</button>
      </form>
    </div>
  );
};

export default AddPlayer;
