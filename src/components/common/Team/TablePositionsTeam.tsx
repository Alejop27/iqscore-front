import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

const TablaPositionsTeam: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [tablaData, setTablaData] = useState<PosicionEquipo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTabla = async () => {
      try {
        if (!teamId) throw new Error("No se proporcionó teamId en la URL");

        const idEquipo = parseInt(teamId, 10);

        const respLiga = await fetch(`http://localhost:3001/api/posiciones_liga/equipo/${idEquipo}`);
        if (!respLiga.ok) throw new Error("No se pudo obtener el idLiga");
        const dataLiga = await respLiga.json();
        const idLiga = dataLiga?.idLiga;

        if (!idLiga) throw new Error("idLiga no encontrado en la respuesta");

        const respTabla = await fetch(`http://localhost:3001/api/posiciones_liga/liga/${idLiga}`);
        if (!respTabla.ok) throw new Error("No se pudo obtener la tabla de posiciones");
        const dataTabla = await respTabla.json();
        setTablaData(dataTabla);
      } catch (error) {
        console.error("Error al cargar la tabla de posiciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTabla();
  }, [teamId]);

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
          let bgColor = "bg-gray-400";
          if (resultado === "G") bgColor = "bg-green-500";
          else if (resultado === "P") bgColor = "bg-red-500";
          else if (resultado === "E") bgColor = "bg-yellow-400";

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
      <h3 className="font-bold text-lg uppercase mb-4">Tabla de posiciones</h3>

      <div className="grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr] items-center py-3 px-6 bg-[#8400FF] text-white font-semibold text-sm rounded-t-lg">
        <div>#</div>
        <div>Equipo</div>
        <div className="text-center">PTS</div>
        <div className="text-center">Últimos 5</div>
        <div className="text-center">PJ</div>
      </div>

      <div className="relative bg-white dark:bg-[#1B1D20] p-6 pt-0 rounded-b-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {tablaData.map((team) => (
          <div
            key={team.idPosicion}
            className="grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr] items-center py-3 px-6 border-b border-gray-200 dark:border-gray-700 text-sm last:border-b-0"
          >
            <div className="font-medium text-gray-400">{team.posicion}</div>
            <div className="mb-2">{team.nombreEquipo}</div>
            <div className="text-center mb-2">{team.puntos}</div>
            <div className="text-center mb-2">{renderUltimos5(team)}</div>
            <div className="text-center mb-2">
              {team.ultimo_partido_1 || team.ultimo_partido_2 || team.ultimo_partido_3 || team.ultimo_partido_4 || team.ultimo_partido_5 ? 5 : 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablaPositionsTeam;
