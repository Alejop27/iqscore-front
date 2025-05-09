import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MYSQL_URI } from "../../../../config/config";


interface PosicionEquipo {
  idPosicion: number;
  idLiga: number;
  idEquipo: number;
  posicion: number;
  puntos: number;
  ultimo_partido_1: string | null;
  ultimo_partido_2: string | null;
  ultimo_partido_3: string | null;
  ultimo_partido_4: string | null;
  ultimo_partido_5: string | null;
  nombreEquipo: string;
}

const TablePositionsLeague: React.FC = () => {
  const { idLiga } = useParams<{ idLiga: string }>();
const ligaId = Number(idLiga);
  const [tablaData, setTablaData] = useState<PosicionEquipo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTabla = async () => {
      try {
        const response = await fetch(`${MYSQL_URI}/api/posiciones_liga/liga/${ligaId}`);
        const data = await response.json();
        setTablaData(data);
      } catch (error) {
        console.error("Error al cargar la tabla de posiciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTabla();
  }, [idLiga]);

  const renderUltimos5 = (equipo: PosicionEquipo) => {
    const resultados = [
      equipo.ultimo_partido_1,
      equipo.ultimo_partido_2,
      equipo.ultimo_partido_3,
      equipo.ultimo_partido_4,
      equipo.ultimo_partido_5,
    ];

    return (
      <div className="flex items-center justify-center gap-1">
        {resultados.map((resultado, index) => {
          let bgColor = "bg-gray-400"; // color neutro si es null

          if (resultado === "G") bgColor = "bg-green-500"; // Ganó
          else if (resultado === "P") bgColor = "bg-red-500"; // Perdió
          else if (resultado === "E") bgColor = "bg-yellow-400"; // Empató

          return (
            <span
              key={index}
              className={`${bgColor} text-white font-bold w-5 h-5 flex items-center justify-center text-xs rounded-full`}
            >
              {resultado ?? "-"}
            </span>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center text-black dark:text-white mt-10 font-nunito">
        Cargando tabla de posiciones...
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto text-black dark:text-white font-nunito">
      <h3 className="font-bold text-lg text-black dark:text-white uppercase mb-4">
        Tabla de posiciones
      </h3>

      {/* Encabezado */}
      <div className="grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr] items-center py-3 px-6 bg-[#8400FF] text-white font-semibold text-sm rounded-t-lg">
        <div>#</div>
        <div>Equipo</div>
        <div className="text-center">PTS</div>
        <div className="text-center">Últimos 5</div>
        <div className="text-center">PJ</div>
      </div>

      {/* Contenido */}
      <div className="relative bg-white dark:bg-[#1B1D20] p-6 pt-0 rounded-b-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {tablaData.map((team) => (
          <div
            key={team.idPosicion}
            className="grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr] items-center py-3 px-6 border-b border-gray-200 dark:border-gray-700 text-sm last:border-b-0"
          >
            <div className="font-medium text-gray-400">{team.posicion}</div>
            <div className="mb-2 text-black dark:text-white">{team.nombreEquipo}</div>
            <div className="text-center mb-2 text-black dark:text-white">{team.puntos}</div>
            <div className="text-center mb-2 text-black dark:text-white">{renderUltimos5(team)}</div>
            <div className="text-center mb-2 text-black dark:text-white">
              {team.ultimo_partido_1 || team.ultimo_partido_2 || team.ultimo_partido_3 || team.ultimo_partido_4 || team.ultimo_partido_5 ? 5 : 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablePositionsLeague;
