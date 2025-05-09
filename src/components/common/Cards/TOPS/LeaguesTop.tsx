import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MYSQL_URI } from "../../../../config/config";

interface Liga {
  idLiga: number;
  nombre: string;
  imagen_logo: string;
}

const LeagueTops: React.FC = () => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLigas = async () => {
      try {
        const response = await fetch(`${MYSQL_URI}/api/ligas`);
        const data = await response.json();
        setLigas(data.slice(0, 5)); // Solo las primeras 5 ligas
      } catch (error) {
        console.error("Error al cargar ligas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLigas();
  }, []);

  const toggleFavorite = (idLiga: number) => {
    setFavorites((prev) => ({
      ...prev,
      [idLiga]: !prev[idLiga],
    }));
  };

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-bold uppercase mb-4">MEJORES LIGAS</h2>
      <div className="relative bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333]">
        {loading ? (
          <p className="text-center">Cargando ligas...</p>
        ) : (
          <div className="flex flex-col gap-5">
            {ligas.map((liga) => (
              <div
                key={liga.idLiga}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={liga.imagen_logo}
                    alt={`${liga.nombre} Logo`}
                    className="w-9 h-9 object-contain"
                  />
                  <span className="text-[18px]">{liga.nombre}</span>
                </div>
                <button
                  onClick={() => toggleFavorite(liga.idLiga)}
                  className="text-black dark:text-white text-xl opacity-80 hover:opacity-100 focus:outline-none"
                >
                  {favorites[liga.idLiga] ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueTops;
