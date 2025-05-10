import { useState, useEffect } from 'react';

// Interfaces
interface Team {
  name: string;
  logo: string;
}

interface Match {
  homeTeam: Team;
  awayTeam: Team;
  time: string;
  date: string;
  status?: 'live' | 'finished' | string;
  currentTime?: string;
  score?: string;
}

interface League {
  name: string;
  logo: string;
  matches: Match[];
}

export default function PartidosConAPI() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3005/api/scraping/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Error al cargar los partidos: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.data && result.data.leagues) {
          const fixedLeagues = result.data.leagues.map((league: League) => ({
            ...league,
            matches: league.matches.map((match: Match) => ({
              ...match,
              homeTeam: {
                ...match.homeTeam,
                name: fixEncoding(match.homeTeam.name)
              },
              awayTeam: {
                ...match.awayTeam,
                name: fixEncoding(match.awayTeam.name)
              }
            }))
          }));
          setLeagues(fixedLeagues);
        } else if (result.output) {
          setError('Los datos no están en formato JSON');
        } else {
          setLeagues([]);
        }
      } catch (err) {
        console.error('Error detallado al obtener partidos:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido en la conexión');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
  }, []);

  const fixEncoding = (text: string): string => {
    return text
      .replace(/�/g, 'á')
      .replace(/�/g, 'é')
      .replace(/�/g, 'í')
      .replace(/�/g, 'ó')
      .replace(/�/g, 'ú')
      .replace(/�/g, 'ñ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <div className="max-w-lg mx-auto text-center p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto text-center p-8 text-black dark:text-white">
        <p className="font-bold">No se pudieron obtener los partidos</p>
        <p>Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto text-black dark:text-white font-sans">
      <h1 className="text-[18px] font-bold uppercase mb-4">
        PARTIDOS DEL {getCurrentDate()}
      </h1>

      {leagues.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
          <p>No hay partidos disponibles para hoy.</p>
        </div>
      ) : (
        leagues.map((league, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1c1f22] rounded-lg shadow-lg border border-[#ccc] dark:border-gray-700 mb-6 overflow-hidden"
          >
            <div className="flex items-center px-5 py-4 border-b border-gray-200 dark:border-[#ccc] bg-gray-50 dark:bg-[#1c1f22]">
              <img 
                src={league.logo || '/placeholder-logo.png'} 
                alt={league.name} 
                className="w-8 h-12 mr-4 object-contain" 
                onError={(e) => { e.currentTarget.src = '/placeholder-logo.png'; }}
              />
              <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">{league.name}</span>
            </div>

            <div className="px-4 py-2">
              {league.matches.map((match, matchIndex) => (
                <div
                  key={matchIndex}
                  className="py-4 mb-2 border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="grid grid-cols-3 items-center">
                    {/* Home Team */}
                    <div className="flex items-center justify-start">
                      <img 
                        src={match.homeTeam.logo || '/placeholder-team.png'} 
                        alt={match.homeTeam.name} 
                        className="w-10 h-10 object-contain mr-2" 
                        onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }}
                      />
                      <div className="text-sm font-medium text-black dark:text-white">
                        {match.homeTeam.name}
                      </div>
                    </div>

                    {/* Date, Time or Live Info */}
                    <div className="text-center">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {match.date ? formatDate(match.date) : '--/--'}
                      </div>
                      {match.status === 'live' ? (
                        <div className="flex flex-col items-center">
                          <div className="text-sm font-bold text-red-600 dark:text-red-500 mb-1 animate-pulse">
                            {match.currentTime || 'EN VIVO'}
                          </div>
                          <div className="text-sm font-bold text-green-600 dark:text-green-500">
                            {match.score || '0-0'}
                          </div>
                        </div>
                      ) : match.status === 'finished' ? (
                        <div className="flex flex-col items-center">
                          <div className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">
                            FINALIZADO
                          </div>
                          <div className="text-sm font-bold text-black dark:text-white">
                            {match.score || '0-0'}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm font-medium text-black dark:text-white">
                          {match.time || '--:--'}
                        </div>
                      )}
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center justify-end">
                      <div className="text-sm font-medium text-black dark:text-white mr-2">
                        {match.awayTeam.name}
                      </div>
                      <img 
                        src={match.awayTeam.logo || '/placeholder-team.png'} 
                        alt={match.awayTeam.name} 
                        className="w-10 h-10 object-contain" 
                        onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
