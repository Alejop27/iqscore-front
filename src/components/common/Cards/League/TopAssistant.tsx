import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MYSQL_URI } from "../../../../config/config";

interface Assistant {
  idJugador: number;
  nombre: string;
  imagen: string;
  partidosJugados: number;
  asistencias: number;
}

const TopAssistant: React.FC = () => {
  const { idLiga } = useParams<{ idLiga: string }>();
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!idLiga) return;

    const fetchAssistants = async () => {
      try {
        const response = await fetch(`${MYSQL_URI}/api/liga/jugadores/mas-asistencias/${idLiga}`);
        const data = await response.json();
        setAssistants(data);
      } catch (error) {
        console.error("Error fetching assistants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssistants();
  }, [idLiga]);

  if (!idLiga) {
    return <div className="text-center text-black dark:text-white">No se ha seleccionado una liga.</div>;
  }

  if (loading) {
    return <div className="text-center text-black dark:text-white">Cargando asistentes...</div>;
  }

  return (
    <div className="max-w-[250px] text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-bold uppercase mb-4">Asistentes</h2>

      <div className="bg-white text-white rounded-xl p-4 shadow-md border border-[#ccc] dark:bg-[#1c1f22] dark:shadow-[0_10px_20px_#111517,0_0_0px_#BEBEBE] dark:border-[#333]">
        <div className="flex justify-between pr-4 text-sm text-gray-300">
          <div className="w-12 text-center ml-4 text-black dark:text-white">NOMBRE</div>
          <div className="w-[40px] text-center text-black dark:text-white">A</div>
        </div>

        <div className="space-y-4 mt-2">
          {assistants.map((assistant) => (
            <div key={assistant.idJugador} className="flex items-center justify-between">
              <div className="w-12 h-12 flex items-center justify-center text-center text-sm text-black dark:text-white leading-tight break-words ml-4">
                {assistant.nombre}
              </div>
              <div className="flex gap-4 pr-4">
                <div className="w-[40px] text-center text-black dark:text-white">{assistant.asistencias}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopAssistant;
