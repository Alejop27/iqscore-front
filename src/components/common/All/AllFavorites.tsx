import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

interface Partido {
  time: string;
  home_team: string;
  away_team: string;
  odds: {
    home: string;
    draw: string;
    away: string;
  };
  match_group_title: string;
}

interface Liga {
  name: string;
  matches: Partido[];
}

interface CuotasData {
  date_scraped: string;
  leagues: Liga[];
}

const Cuotas: React.FC = () => {
  const [ligasCuotas, setLigasCuotas] = useState<CuotasData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCuotas = async () => {
      try {
        // Obtener las cuotas desde la API
        const response = await fetch("http://54.234.36.48:8000/scrape");
        const data = await response.json();
        setLigasCuotas(data);
      } catch (error) {
        console.error("Error al cargar cuotas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCuotas();
  }, []);

  const handleOddsClick = (partido: Partido) => {
    console.log(`Apostar en: ${partido.home_team} vs ${partido.away_team}`);
    // Aquí se implementaría la navegación a la página de apuestas
    // navigate(`/bet/${encodeURIComponent(partido.home_team)}/${encodeURIComponent(partido.away_team)}`);
  };

  const formatOdds = (odds: string) => {
    return odds.startsWith("+") ? odds : odds;
  };

  const getOddsColor = (odds: string) => {
    if (odds.startsWith("+")) {
      return "text-green-500";
    } else if (odds.startsWith("-")) {
      return "text-red-500";
    }
    return "text-gray-800 dark:text-gray-200";
  };

  // Agrupar partidos por fecha
  const getGroupedMatches = () => {
    if (!ligasCuotas || !ligasCuotas.leagues || ligasCuotas.leagues.length === 0) {
      return {};
    }

    const allMatches = ligasCuotas.leagues.flatMap(liga => 
      liga.matches.map(match => ({ ...match, liga: liga.name }))
    );

    return allMatches.reduce((acc, match) => {
      const group = match.match_group_title;
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(match);
      return acc;
    }, {} as Record<string, (Partido & { liga: string })[]>);
  };

  const groupedMatches = getGroupedMatches();

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-bold uppercase mb-4">Cuotas de Partidos</h2>
      <div className="relative bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333]">
        {loading ? (
          <p className="text-center">Cargando cuotas puede demorar un poco</p>
        ) : ligasCuotas && Object.keys(groupedMatches).length > 0 ? (
          <div className="flex flex-col gap-5">
            {Object.entries(groupedMatches).map(([dateGroup, matches]) => (
              <div key={dateGroup} className="mb-6">
                <div className="flex items-center gap-2 mb-3 bg-gray-100 dark:bg-[#23272b] p-2 rounded">
                  <Calendar size={18} />
                  <h3 className="font-semibold">{dateGroup}</h3>
                </div>
                
                {matches.map((partido, idx) => (
                  <div
                    key={`${partido.home_team}-${partido.away_team}-${idx}`}
                    className="flex flex-col md:flex-row md:items-center justify-between py-3 px-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#23272b] rounded transition cursor-pointer"
                    onClick={() => handleOddsClick(partido)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2 md:mb-0">
                      <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[70px]">{partido.time}</span>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{partido.liga}</span>
                        <div className="flex flex-wrap gap-1">
                          <span className="font-medium">{partido.home_team}</span>
                          <span className="text-gray-500">vs</span>
                          <span className="font-medium">{partido.away_team}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-2 md:mt-0">
                      <button 
                        className={`px-3 py-1 border rounded ${getOddsColor(partido.odds.home)} hover:bg-gray-100 dark:hover:bg-[#2c3035]`}
                      >
                        <span className="block text-xs text-gray-500 dark:text-gray-400">Local</span>
                        <span className="font-bold">{formatOdds(partido.odds.home)}</span>
                      </button>
                      <button 
                        className={`px-3 py-1 border rounded ${getOddsColor(partido.odds.draw)} hover:bg-gray-100 dark:hover:bg-[#2c3035]`}
                      >
                        <span className="block text-xs text-gray-500 dark:text-gray-400">Empate</span>
                        <span className="font-bold">{formatOdds(partido.odds.draw)}</span>
                      </button>
                      <button 
                        className={`px-3 py-1 border rounded ${getOddsColor(partido.odds.away)} hover:bg-gray-100 dark:hover:bg-[#2c3035]`}
                      >
                        <span className="block text-xs text-gray-500 dark:text-gray-400">Visitante</span>
                        <span className="font-bold">{formatOdds(partido.odds.away)}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No hay cuotas disponibles en este momento</p>
            <button 
              className="mt-4 bg-[#8400FF] hover:bg-[#8400DA] text-white py-2 px-4 rounded"
              onClick={() => window.location.reload()}
            >
              Actualizar cuotas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cuotas;