import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Player {
  nombre: string;
  edad: number;
  nacionalidad: string;
  valor_mercado: string;
  nacionalidad_logo: string;
  logo: string;
}

const PlayerProfile: React.FC = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const [Player, setJugador] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJugador = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/jugadores/${playerId}`);
        const data = await response.json();
        setJugador(data);
      } catch (error) {
        console.error("Error al obtener jugador:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJugador();
  }, [playerId]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (!Player) return <p className="text-center">No se encontró jugador.</p>;

  function formatMarketValue(value: string | number): string {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "-";
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(2).replace(/\.00$/, "")}K`;
    return num.toString();
  }

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 text-black dark:text-white font-nunito">
      <h2 className="font-bold text-lg uppercase mb-4">{Player.nombre}</h2>

      <div className="max-w-[1250px] mx-auto">
        <div className="bg-white dark:bg-[#111517] rounded-lg overflow-hidden text-black dark:text-white font-nunito p-6 shadow-lg border border-[#ccc] dark:border-[#333] flex items-center">
          
          {/* Avatar */}
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-[#f0f0f0] dark:bg-[#111517] mr-6 flex-shrink-0">
            <img src={Player.logo} alt={Player.nombre} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex-grow w-full">
            {/* Name + Market Value */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[20px] font-semibold m-0 text-black dark:text-white">{Player.nombre}</h3>
              <span className="text-[18px] font-semibold text-black dark:text-white">
                {formatMarketValue(Player.valor_mercado)}
              </span>
            </div>

            {/* Nacionalidad alineada a la derecha */}
            <div className="flex justify-end items-center space-x-2">
              <span className="text-[16px] text-[#555] dark:text-[#aaa]">{Player.nacionalidad}</span>
              <div className="w-[32px] h-[24px] rounded-[4px] overflow-hidden">
                <img
                  src={Player.nacionalidad_logo}
                  alt={`Bandera de ${Player.nacionalidad}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
