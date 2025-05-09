import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MYSQL_URI } from "../../../../config/config";

interface LigaInfoType {
  idLiga: number;
  nombre: string;
  pais: string;
  nivel: string;
  año_inicio: number;
  año_fin: number;
  imagen_logo: string;
  imagen_trofeo: string;
  descripcion_historica: string;
}

const LeagueInfo: React.FC = () => {
  const { idLiga } = useParams<{ idLiga: string }>();
  const ligaId = Number(idLiga);
  const [liga, setLiga] = useState<LigaInfoType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiga = async () => {
      try {
        const response = await fetch(`${MYSQL_URI}/api/liga/${ligaId}`);
        const data = await response.json();
        setLiga(data[0]);
      } catch (error) {
        console.error("Error al cargar la liga:", error);
      } finally {
        setLoading(false);
      }
    };

    if (idLiga) {
      fetchLiga();
    }
  }, [idLiga]);

  if (loading) {
    return <div className="text-center mt-10">Cargando información de la liga...</div>;
  }

  if (!liga) {
    return <div className="text-center text-red-500 mt-10">No se encontró información de la liga.</div>;
  }

  return (
    <div className="max-w-[1250px] mx-auto text-black dark:text-white font-nunito px-4">
      <h2 className="text-[18px] font-bold uppercase mb-4">{liga.nombre}</h2>
      <div className="bg-white rounded-lg overflow-hidden p-6 shadow-lg border border-[#ccc] dark:bg-[#1c1f22] dark:border-[#333]">
        {/* Encabezado centrado */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={liga.imagen_logo}
            alt={`${liga.nombre} Logo`}
            className="w-24 h-24 object-contain mb-2"
          />
          <h2 className="text-[22px] font-bold break-words">{liga.nombre}</h2>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
            <img
              src={`https://flagcdn.com/w40/${liga.pais.toLowerCase().slice(0, 2)}.png`}
              alt={`${liga.pais} Flag`}
              className="w-6 h-4 rounded-sm mr-2 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg";
              }}
            />
            {liga.pais}
          </div>
        </div>

        {/* Información adicional */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{liga.nivel} ({liga.año_inicio} - {liga.año_fin})</h3>
          <p className="text-base text-gray-600 dark:text-gray-300 break-words">{liga.descripcion_historica}</p>
        </div>
      </div>
    </div>
  );
};

export default LeagueInfo;
