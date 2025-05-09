  import React, { useEffect, useState } from "react";
  import { FaHeart, FaRegHeart } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";
  import { MYSQL_URI } from '../../../config/config';

  interface Liga {
    idLiga: number;
    nombre: string;
    imagen_logo: string;
  }

  const AllLeague: React.FC = () => {
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});
    const [ligas, setLigas] = useState<Liga[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchLigas = async () => {
        try {
          const response = await fetch(`${MYSQL_URI}/api/ligas`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          setLigas(data);
        } catch (error) {
          console.error("Error al cargar ligas:", error);
          // Opcional: manejar el estado de error en tu UI
          // setError('No se pudieron cargar las ligas');
        } finally {
          setLoading(false);
        }
      };
    
      fetchLigas();
    }, [MYSQL_URI]); // Agregamos MONGO_URI como dependencia

    const toggleFavorite = (idLiga: number, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevents navigation when clicking the heart
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [idLiga]: !prevFavorites[idLiga],
      }));
    };

    const handleLigaClick = (liga: Liga) => {
      navigate(`/league/${liga.idLiga}`);
    };

    return (
      <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
        <h2 className="text-[18px] font-bold uppercase mb-4">Ligas</h2>
        <div className="relative bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333]">
          {loading ? (
            <p className="text-center">Cargando ligas...</p>
          ) : (
            <div className="flex flex-col gap-5">
              {ligas.map((liga) => (
                <div
                  key={liga.idLiga}
                  className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#23272b] rounded transition"
                  onClick={() => handleLigaClick(liga)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={liga.imagen_logo}
                      alt={`${liga.nombre} Logo`}
                      className="w-9 h-9 object-contain"
                    />
                    <span className="text-black dark:text-white text-lg">{liga.nombre}</span>
                  </div>
                  <button
                    className="text-black dark:text-white text-xl opacity-80 hover:opacity-100 cursor-pointer"
                    onClick={(e) => toggleFavorite(liga.idLiga, e)}
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

  export default AllLeague;
