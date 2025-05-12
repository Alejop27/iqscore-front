import React, { useEffect, useState } from "react";

interface Match {
  teams: string;
  date: string;
  stadium: string;
  prediction: string;
  odd: string;
}

interface TitleOdd {
  team: string;
  "Fecha y hora": string;
  Estadio: string;
  "1X2": string;
}

interface CombinedBet {
  description: string;
  bets: {
    match: string;
    bet: string;
    odd: string;
  }[];
}

interface OddsData {
  scraped_at: string;
  matches: Match[];
  title_odds: TitleOdd[];
  combined_bet: CombinedBet;
}

const FootballOddsCard: React.FC = () => {
  const [oddsData, setOddsData] = useState<OddsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOddsData = async () => {
      try {
        const response = await fetch("https://scrapnew-production.up.railway.app/raspar-cuotas-liga");
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

  if (loading) {
    return (
      <div className="max-w-screen-lg mx-auto text-center p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen-lg mx-auto text-center p-8 text-black dark:text-white">
        <p className="font-bold">No se pudieron obtener las cuotas</p>
        <p>Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }

  if (!oddsData) {
    return (
      <div className="max-w-screen-lg mx-auto text-center p-8 text-black dark:text-white">
        <p>No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto text-black dark:text-white font-sans">
      <h1 className="text-[18px] font-bold uppercase mb-4">
        CUOTAS DE LA LIGA: {formatDate(oddsData.scraped_at)}
      </h1>

      {/* Matches section */}
      <div className="bg-white dark:bg-[#1c1f22] rounded-lg shadow-lg border border-[#ccc] dark:border-gray-700 mb-6 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-[#ccc] bg-gray-50 dark:bg-[#1c1f22]">
          <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">Partidos</span>
        </div>

        <div className="px-4 py-2">
          {oddsData.matches.map((match, index) => (
            <div
              key={index}
              className="py-4 mb-2 border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Teams */}
                <div className="text-center md:text-left">
                  <h3 className="font-medium">
                    {match.teams.split(/(?=[A-Z])/).join(" vs ")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {match.stadium}
                  </p>
                </div>
                
                {/* Date */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {match.date}
                  </p>
                </div>
                
                {/* Prediction & Odd */}
                <div className="text-center md:text-right">
                  <p className="text-sm font-medium">
                    <span className="text-gray-600 dark:text-gray-400">Predicción: </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {match.prediction}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Title Odds section */}
      <div className="bg-white dark:bg-[#1c1f22] rounded-lg shadow-lg border border-[#ccc] dark:border-gray-700 mb-6 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-[#ccc] bg-gray-50 dark:bg-[#1c1f22]">
          <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">Cuotas 1X2</span>
        </div>

        <div className="px-4 py-2">
          {oddsData.title_odds.map((odd, index) => (
            <div
              key={index}
              className="py-4 mb-2 border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {/* Match */}
                <div className="text-center md:text-left">
                  <h3 className="font-medium">
                    {odd.team.split(/(?=[A-Z])/).join(" vs ")}
                  </h3>
                </div>
                
                {/* Date */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {odd["Fecha y hora"]}
                  </p>
                </div>
                
                {/* Stadium */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {odd.Estadio}
                  </p>
                </div>
                
                {/* Odds */}
                <div className="text-center md:text-right">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    {odd["1X2"]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Combined Bet section */}
      <div className="bg-white dark:bg-[#1c1f22] rounded-lg shadow-lg border border-[#ccc] dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-[#ccc] bg-gray-50 dark:bg-[#1c1f22]">
          <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">Apuesta Combinada</span>
        </div>

        <div className="px-4 py-2">
          <p className="text-gray-700 dark:text-gray-300 mb-4 py-2">
            {oddsData.combined_bet.description}
          </p>
          
          {oddsData.combined_bet.bets.map((bet, index) => (
            <div
              key={index}
              className="py-4 mb-2 border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Match */}
                <div className="text-center md:text-left">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Partido:</span> {bet.match}
                  </p>
                </div>
                
                {/* Bet */}
                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Apuesta:</span> {bet.bet}
                  </p>
                </div>
                
                {/* Odd */}
                <div className="text-center md:text-right">
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    <span className="text-gray-700 dark:text-gray-300">Cuota:</span> {bet.odd}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FootballOddsCard;