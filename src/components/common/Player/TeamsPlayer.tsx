import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MYSQL_URI } from '../../../config/config';

interface ClubHistorial {
  idJugador: number;
  nombre_equipo: string;
  año_inicio: number;
  año_fin: number;
  foto_equipo: string;
}

const PlayerTrajectory: React.FC = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const [historial, setHistorial] = useState<ClubHistorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await fetch(`${MYSQL_URI}/api/jugadordetalles/${playerId}/historial`);
        const data = await response.json();
        setHistorial(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error al obtener historial:", error);
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchHistorial();
    }
  }, [playerId]);

  if (loading) return <p className="text-center">Cargando trayectoria...</p>;
  if (!historial.length) return (
    <div className="w-full max-w-[1280px] mx-auto px-4 text-black dark:text-white font-nunito">
      <h2 className="text-lg font-semibold mb-4">TRAYECTORIA</h2>
      <div className="max-w-[1250px] mx-auto">
        <div className="bg-white dark:bg-[#111517] rounded-lg overflow-hidden text-black dark:text-white font-nunito p-6 shadow-lg border border-[#ccc] dark:border-[#333]">
          <p className="text-center">No tiene historial de equipos.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 text-black dark:text-white font-nunito">
      <h2 className="text-lg font-semibold mb-4">TRAYECTORIA <span className="ml-2">→</span></h2>
      <div className="max-w-[1250px] mx-auto">
        <div className="bg-white dark:bg-[#111517] rounded-lg overflow-hidden text-black dark:text-white font-nunito p-6 shadow-lg border border-[#ccc] dark:border-[#333]">
          <div className="flex items-center gap-x-6 overflow-x-auto">
            {historial.slice().reverse().map((club, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Mostrar imagen si hay foto, de lo contrario mostrar solo el nombre */}
                {club.foto_equipo ? (
                  <div className="w-[64px] h-[64px] flex items-center justify-center mb-2">
                    <img
                      src={club.foto_equipo}
                      alt={club.nombre_equipo}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-[64px] h-[64px] flex items-center justify-center mb-2 bg-gray-300">
                    {/* Se muestra un marcador genérico si no hay foto */}
                  </div>
                )}
                <span className="text-xs text-center">
                  {club.nombre_equipo}
                  <br />
                  ({club.año_inicio} - {club.año_fin})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerTrajectory;
