import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Liga {
  idLiga: number;
  nombre: string;
  imagen_logo: string;
}
const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const [favoriteLigas, setFavoriteLigas] = useState<Liga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Obtener las ligas favoritas del usuario desde la API
        const response = await fetch("http://localhost:3001/api/usuario/favoritos");
        const data = await response.json();
        setFavoriteLigas(data);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (idLiga: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Previene la navegación al hacer clic en el corazón
    
    try {
      // Eliminar de favoritos en el backend
      await fetch(`http://localhost:3001/api/usuario/favoritos/${idLiga}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // Si necesitas enviar un token de autenticación:
        // credentials: 'include',
      });
      
      // Actualizar el estado local
      setFavoriteLigas(prevFavorites => 
        prevFavorites.filter(liga => liga.idLiga !== idLiga)
      );
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  };

  const handleLigaClick = (liga: Liga) => {
    // En una implementación real esto usaría:
    // navigate(`/league/${liga.idLiga}`);
    console.log(`Navegando a liga: ${liga.nombre}`);
  };

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-bold uppercase mb-4">Mis Favoritos</h2>
      <div className="relative bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333]">
        {loading ? (
          <p className="text-center">Cargando favoritos...</p>
        ) : favoriteLigas.length > 0 ? (
          <div className="flex flex-col gap-5">
            {favoriteLigas.map((liga) => (
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
                  className="text-red-500 hover:text-red-600"
                  onClick={(e) => removeFavorite(liga.idLiga, e)}
                >
                  <Heart fill="currentColor" size={24} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No tienes ligas favoritas</p>
                <button 
                    className="mt-4 bg-[#8400FF] hover:bg-[#8400DA] text-white py-2 px-4 rounded"
                    onClick={() => navigate("/")}
                >
                    Empezar a buscar
                </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;