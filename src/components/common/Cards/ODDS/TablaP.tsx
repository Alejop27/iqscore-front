import React, { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Calendar } from "lucide-react";

interface Team {
  Position: string;
  Team: string;
  Played: string;
  Won: string;
  Drawn: string;
  Lost: string;
  GoalsFor: string;
  GoalsAgainst: string;
  GoalDifference: string;
  Points: string;
}

interface League {
  name: string;
  teams: Team[];
}

interface LeagueTableData {
  scraped_at: string;
  leagues: League[];
}

const LeagueTables: React.FC = () => {
  const [tableData, setTableData] = useState<LeagueTableData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedLeague, setExpandedLeague] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagueTables = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://scrapnew-production.up.railway.app/raspar-tablas-liga");
        if (!response.ok) {
          throw new Error("Error fetching league tables data");
        }
        const data: LeagueTableData = await response.json();
        setTableData(data);
        // Expand first league by default
        if (data.leagues.length > 0) {
          setExpandedLeague(data.leagues[0].name);
        }
      } catch (err: any) {
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueTables();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toggleLeague = (leagueName: string) => {
    setExpandedLeague(expandedLeague === leagueName ? null : leagueName);
  };

  if (loading) {
    return (
      <div className="max-w-lg mx-auto p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto text-center p-8 space-y-2 text-black dark:text-white">
        <p className="font-bold text-lg">No se pudieron obtener las tablas de clasificación</p>
        <p className="text-gray-600 dark:text-gray-400">Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }

  if (!tableData) {
    return (
      <div className="max-w-lg mx-auto text-center p-8 text-black dark:text-white">
        <p className="text-gray-600 dark:text-gray-400">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 text-black dark:text-white font-sans">
      <div className="flex items-center mb-6 gap-2">
        <Calendar size={18} className="text-gray-500 dark:text-gray-400" />
        <h1 className="text-lg font-medium">
          Tablas de Clasificación <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">Actualizado: {formatDate(tableData.scraped_at)}</span>
        </h1>
      </div>

      <div className="space-y-4">
        {tableData.leagues.map((league) => (
          <div
            key={league.name}
            className="bg-white dark:bg-[#1c1f22] rounded-xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300"
          >
            <div 
              className="flex items-center px-6 py-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-[#23272a]"
              onClick={() => toggleLeague(league.name)}
            >
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {league.name}
              </span>
              <span className="ml-auto text-gray-400">
                {expandedLeague === league.name ? 
                  <ChevronUp size={18} /> : 
                  <ChevronDown size={18} />
                }
              </span>
            </div>

            {expandedLeague === league.name && (
              <div className="px-4 pb-4">
                <div className="overflow-hidden rounded-lg">
                  {/* Encabezado de la tabla */}
                  <div className="grid grid-cols-[40px_minmax(0,1fr)_repeat(8,40px)] items-center py-2 px-2 bg-[#8400FF] text-white font-medium text-xs tracking-wide">
                    <div className="text-center">#</div>
                    <div className="pl-2">EQUIPO</div>
                    <div className="text-center">PJ</div>
                    <div className="text-center">G</div>
                    <div className="text-center">E</div>
                    <div className="text-center">P</div>
                    <div className="text-center">GF</div>
                    <div className="text-center">GC</div>
                    <div className="text-center">DG</div>
                    <div className="text-center">PTS</div>
                  </div>

                  {/* Filas de equipos */}
                  <div className="bg-white dark:bg-[#1B1D20] rounded-b-lg divide-y divide-gray-100 dark:divide-gray-800">
                    {league.teams.map((team, index) => {
                      const position = parseInt(team.Position);
                      const isPromotionZone = position <= 4;
                      const isRelegationZone = position >= league.teams.length - 3;
                      
                      return (
                        <div
                          key={index}
                          className={`grid grid-cols-[40px_minmax(0,1fr)_repeat(8,40px)] items-center py-2 px-2 text-sm transition-colors ${
                            isPromotionZone ? 'bg-blue-50/60 dark:bg-blue-900/10' : 
                            isRelegationZone ? 'bg-red-50/60 dark:bg-red-900/10' : ''
                          }`}
                        >
                          <div className="text-center font-medium text-gray-400">{team.Position}</div>
                          <div className="pl-2 font-medium text-black dark:text-white truncate">{team.Team}</div>
                          <div className="text-center text-gray-700 dark:text-gray-300">{team.Played}</div>
                          <div className="text-center text-gray-700 dark:text-gray-300">{team.Won}</div>
                          <div className="text-center text-gray-700 dark:text-gray-300">{team.Drawn}</div>
                          <div className="text-center text-gray-700 dark:text-gray-300">{team.Lost}</div>
                          <div className="text-center text-gray-700 dark:text-gray-300">{team.GoalsFor}</div>
                          <div className="text-center text-gray-700 dark:text-gray-300">{team.GoalsAgainst}</div>
                          <div className="text-center text-gray-700 dark:text-gray-300">{team.GoalDifference}</div>
                          <div className="text-center font-medium">
                            <span className={
                              isPromotionZone ? 'text-green-600 dark:text-green-400' : 
                              isRelegationZone ? 'text-red-600 dark:text-red-400' : 
                              'text-black dark:text-white'
                            }>
                              {team.Points}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeagueTables;