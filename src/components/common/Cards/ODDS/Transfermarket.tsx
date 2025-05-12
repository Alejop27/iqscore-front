import React, { useEffect, useState } from "react";

interface Match {
  league: string;
  homeTeam: string;
  awayTeam: string;
  betType: string;
  odd: string;
  bookmaker: {
    name: string;
    logo: string;
  };
  expiryTime: string;
  offerLink: string;
}

interface OddsData {
  scraped_at: string;
  matches: Match[];
}

const TransfermarktOdds: React.FC = () => {
  const [oddsData, setOddsData] = useState<OddsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOddsData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://scrapnew-production.up.railway.app/raspar-cuotas-generales-transfermarkt");
        if (!response.ok) {
          throw new Error("Error fetching odds data");
        }
        const data: OddsData = await response.json();
        setOddsData(data);
      } catch (err: any) {
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchOddsData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="max-w-lg mx-auto text-center p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto text-center p-8 text-black dark:text-white">
        <p className="font-bold">No se pudieron obtener las cuotas</p>
        <p>Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }

  if (!oddsData) {
    return (
      <div className="max-w-lg mx-auto text-center p-8 text-black dark:text-white">
        <p>No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto text-black dark:text-white font-sans">
      <h1 className="text-[18px] font-bold uppercase mb-4">
        CUOTAS DE TRANSFERMARKT - ACTUALIZADO: {formatDate(oddsData.scraped_at)}
      </h1>

      <div className="bg-white dark:bg-[#1c1f22] rounded-lg shadow-lg border border-[#ccc] dark:border-gray-700 mb-6 overflow-hidden">
        {/* Encabezado */}
        <div className="grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr_2fr_1fr] items-center py-3 px-6 bg-[#8400FF] text-white font-semibold text-sm">
          <div>Partido</div>
          <div className="hidden md:block">Apuesta</div>
          <div>Cuota</div>
          <div className="text-right">Expira</div>
        </div>

        {/* Contenido */}
        <div className="bg-white dark:bg-[#1B1D20] rounded-b-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {oddsData.matches.map((match, index) => (
            <div 
              key={index} 
              className="grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr_2fr_1fr] items-center py-3 px-6 border-b border-gray-200 dark:border-gray-700 text-sm last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {/* Partido */}
              <div className="mb-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">{match.league}</div>
                <div className="font-medium">
                  {match.homeTeam} vs {match.awayTeam}
                </div>
              </div>
              
              {/* Tipo de apuesta (solo en desktop) */}
              <div className="hidden md:block mb-2 text-black dark:text-white">
                {match.betType}
              </div>
              
              {/* Cuota */}
              <div className="mb-2 text-center">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 font-bold rounded-full">
                  {match.odd}
                </span>
              </div>
              
              {/* Tiempo de expiración */}
              <div className="text-right">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTime(match.expiryTime)}
                </div>
                <div className="text-xs">
                  {formatDate(match.expiryTime)}
                </div>
              </div>
              
              {/* Tipo de apuesta (solo en mobile) */}
              <div className="md:hidden col-span-3 mt-2 text-sm text-gray-600 dark:text-gray-300">
                {match.betType}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransfermarktOdds;