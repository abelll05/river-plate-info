// src/components/PlayersList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  // Obtener los jugadores del backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/players") // URL de tu backend
      .then((response) => {
        setPlayers(response.data); // Guardamos los jugadores en el estado
        setLoading(false); // Desactivamos el estado de carga
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los jugadores", error);
        setLoading(false); // También desactivamos el estado de carga en caso de error
      });
  }, []);

  // Mostrar un mensaje mientras se cargan los jugadores
  if (loading) {
    return <p>Cargando jugadores...</p>;
  }

  return (
    <div>
      <h1>Plantel de River Plate</h1>
      {players.length > 0 ? (
        <div>
          <h2>Arqueros</h2>
          <ul>
            {players
              .filter((player) => player.position === "Arquero")
              .map((player) => (
                <li key={player._id}>
                  <strong>{player.name}</strong> - {player.position}
                </li>
              ))}
          </ul>

          <h2>Defensores</h2>
          <ul>
            {players
              .filter((player) => player.position === "Defensor")
              .map((player) => (
                <li key={player._id}>
                  <strong>{player.name}</strong> - {player.position}
                </li>
              ))}
          </ul>

          <h2>Volantes</h2>
          <ul>
            {players
              .filter((player) => player.position === "Volante")
              .map((player) => (
                <li key={player._id}>
                  <strong>{player.name}</strong> - {player.position}
                </li>
              ))}
          </ul>

          <h2>Delanteros</h2>
          <ul>
            {players
              .filter((player) => player.position === "Delantero")
              .map((player) => (
                <li key={player._id}>
                  <strong>{player.name}</strong> - {player.position}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <p>No hay jugadores disponibles.</p>
      )}
    </div>
  );
};

export default PlayersList;
