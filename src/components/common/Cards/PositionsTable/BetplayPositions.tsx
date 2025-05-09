import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MYSQL_URI } from "../../../../config/config";

interface Team {
  idEquipo: number;
  nombre: string;
  logo: string;
  puntos: number;
}

const BetplayPositions: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await fetch(`${MYSQL_URI}/api/liga/posiciones/13`);
        const data = await res.json();

        const processed = data.map((team: any) => ({
          idEquipo: team.idEquipo,
          nombre: team.nombre,
          logo: team.logo,
          puntos: team.puntos ?? 0,
        }));

        setTeams(processed);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, []);

  const handleTeamClick = (teamId: number) => {
    navigate(`/team/${teamId}`);
  };

  return (
    <div className="w-[255px] max-w-[500px] bg-white dark:bg-[#1B1D20] text-gray-800 dark:text-white rounded-lg shadow-lg border border-gray-300 dark:border-[#333] overflow-hidden">
      <div className="bg-gray-100 dark:bg-[#1B1D20] px-4 py-3 border-b border-gray-300 dark:border-[#2a2d30]">
        <h2 className="text-sm font-bold uppercase tracking-wider">
          LIGA BETPLAY
        </h2>
      </div>

      <div className="grid grid-cols-[36px_1fr_40px] px-4 py-2 text-xs font-semibold text-gray-500 dark:text-[#8f9092] border-b border-gray-300 dark:border-[#2a2d30] bg-gray-50 dark:bg-[#1B1D20]">
        <div>POS</div>
        <div>TEAM</div>
        <div>PTS</div>
      </div>

      <div className="flex flex-col">
        {teams.map((team, index) => (
          <div
            key={team.idEquipo}
            onClick={() => handleTeamClick(team.idEquipo)}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2a2d30] grid grid-cols-[36px_1fr_40px] items-center px-4 py-2 text-sm border-b border-gray-200 dark:border-[#2a2d30]"
          >
            <div className={index < 4 ? "font-bold text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}>
              {index + 1}
            </div>
            <div className="flex items-center gap-3">
              <img
                src={team.logo}
                alt={`${team.nombre} Logo`}
                className="w-5 h-5 object-contain"
              />
              <span>{team.nombre}</span>
            </div>
            <div className={index < 4 ? "font-bold text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}>
              {team.puntos}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetplayPositions;
