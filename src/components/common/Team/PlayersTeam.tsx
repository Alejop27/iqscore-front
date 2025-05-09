
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { MYSQL_URI } from "../../../config/config"; // Import MYSQL_URI from config


interface Player {
  id: number;
  number: number;
  name: string;
  image: string;
  position: string;
  age: number;
  nationality: string;
  marketValue: string;
}

interface PlayersTeamProps {
  idEquipo: number;
}

// Function to format market value
function formatMarketValue(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "-";
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2).replace(/\.00$/, "")}K`;
  return num.toString();
}

const PlayerTeam: React.FC<PlayersTeamProps> =  ({ idEquipo })  => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${MYSQL_URI}/api/equipo/jugadores/${idEquipo}`);
        if (!response.ok) {
          throw new Error("Error fetching players");
        }
        const data = await response.json();
        console.log("Respuesta cruda del backend:", data);
        
        // Mapear los datos del backend al modelo Player del frontend
        const mappedPlayers: Player[] = data.map((item: any, idx: number) => ({
          id: item.ID_Jugador ?? idx + 1, // Si el backend no da un id, usamos el índice
          name: item.Nombre,
          image: item.Foto ?? "/default-player.png", // Imagen por defecto si no hay
          position: item.Posicion,
          age: item.Edad,
          marketValue: item.Valor_Mercado,
        }));
        console.log("Jugadores mapeados:", mappedPlayers);
        
        setPlayers(mappedPlayers);
      } catch (err: any) {
        setError(err.message ?? "Unknown error");
  
      } finally {
        setLoading(false);
      }
    };
    if (idEquipo) {
      fetchPlayers();
    }
  }, [idEquipo]);
  const navigate = useNavigate(); // Initialize useNavigate hook

    // Navigate to team page
  const handleTeamClick = (playerId: string) => {
    navigate(`/player/${playerId}`); // Navigate to the team page with the team ID
  };
  return (
    <div className="max-w-[1240px] mx-auto mb-4 px-2 text-black dark:text-white">
      <h3 className="text-[18px] font-bold uppercase mb-2">JUGADORES</h3>

      <div className="relative bg-white dark:bg-[#1B1D20] p-4 rounded-lg shadow-lg border border-[#ccc] dark:border-[#333]">
        {loading ? (
          <div className="py-4 text-center">Cargando...</div>
        ) : error ? (
          <div className="py-4 text-red-500 text-center">{error}</div>
        ) : (
          <div className="w-full ">
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-4 text-center text-sm font-medium text-gray-500 pb-2 border-b border-gray-400 dark:border-gray-700">
              <div className="col-span-2 text-left pl-4">Jugador</div>
              <div className="hidden sm:block">Posición</div>
              <div className="hidden md:block">Edad</div>
              <div className="hidden md:block">Valor</div>
            </div>

            <div className="flex flex-col mt-2">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="grid grid-cols-5 sm:grid-cols-5 gap-4 items-center py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2A2D31] transition-all duration-200"
                  onClick={() => handleTeamClick(player.id.toString())}
                >
                  <div className="col-span-2 flex items-center gap-3 text-left pl-4">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-black dark:text-white break-words">{player.name}</span>
                  </div>
                  <div className="hidden sm:block text-sm text-black dark:text-white text-center">{player.position}</div>
                  <div className="hidden md:block text-sm text-black dark:text-white text-center">{player.age}</div>
                  <div className="hidden md:block text-sm text-black dark:text-white text-center">
                    € {formatMarketValue(player.marketValue)}
                  </div>
                  <div className="hidden md:block text-sm text-black dark:text-white text-center">{player.number}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PlayerTeam;
