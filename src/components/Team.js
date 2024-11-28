import React, { useEffect, useState } from "react";
import axios from "axios";

const Team = () => {
  const [players, setPlayers] = useState([]); // Estado para almacenar la lista de jugadores
  const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Función para obtener los jugadores del backend
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/players"); // URL de la API
        setPlayers(response.data); // Guardar los jugadores en el estado
        setLoading(false); // Datos cargados correctamente
      } catch (err) {
        setError("Hubo un error al cargar la lista de jugadores."); // Guardar el mensaje de error
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []); // Se ejecuta una vez al montar el componente

  // Renderizado condicional basado en el estado
  if (loading) return <p>Cargando jugadores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Plantel de River Plate</h1>
      {players.length > 0 ? (
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              <strong>{player.name}</strong> - {player.position}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay jugadores disponibles.</p>
      )}
    </div>
  );
};

export default Team;
