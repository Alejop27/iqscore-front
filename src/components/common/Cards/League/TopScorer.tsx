import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MYSQL_URI } from '../../../../config/config';

interface Scorer {
  idJugador: number;
  nombre: string;
  imagen: string;
  partidosJugados: number;
  goles: number;
}

const TopScorers: React.FC = () => {
  const { idLiga } = useParams<{ idLiga: string }>();
  const [scorers, setScorers] = useState<Scorer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!idLiga) return;

    const fetchScorers = async () => {
      try {
        const response = await fetch(`${MYSQL_URI}/api/liga/jugadores/mas-goles/${idLiga}`);
        const data = await response.json();
        setScorers(data);
      } catch (error) {
        console.error("Error fetching scorers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScorers();
  }, [idLiga]);

  if (!idLiga) {
    return <div className="text-center text-black dark:text-white">No se ha seleccionado una liga.</div>;
  }

  if (loading) {
    return <div className="text-center text-black dark:text-white">Cargando goleadores...</div>;
  }

  return (
    <div className="max-w-[250px] text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-bold uppercase mb-4">Goleadores</h2>

      <div className="bg-white text-white rounded-xl p-4 shadow-md border border-[#ccc] dark:bg-[#1c1f22] dark:shadow-[0_10px_20px_#111517,0_0_0px_#BEBEBE] dark:border-[#333]">
        <div className="flex justify-between pr-4 text-sm text-gray-300">
          <div className="w-12 text-center ml-4 text-black dark:text-white">NOMBRE</div>
          <div className="w-[40px] text-center text-black dark:text-white">G</div>
        </div>

        <div className="space-y-4 mt-2">
          {scorers.map((scorer) => (
            <div key={scorer.idJugador} className="flex items-center justify-between">
              <div className="w-12 h-12 flex items-center justify-center text-center text-sm text-black dark:text-white leading-tight break-words ml-4">
                {scorer.nombre}
              </div>
              <div className="flex gap-4 pr-4">
                <div className="w-[40px] text-center text-black dark:text-white">{scorer.goles}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopScorers;
