import { useState, useEffect } from 'react';

// Define interfaces for our data structure
interface Team {
  name: string;
  logo: string;
}

interface Odds {
  home: string;
  draw: string;
  away: string;
}

interface Match {
  homeTeam: Team;
  awayTeam: Team;
  time: string;
  date: string;
  odds?: Odds;
}

interface League {
  name: string;
  logo: string;
  matches: Match[];
}

// Component to display football matches from API
export default function PartidosConAPI() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        setLoading(true);
        console.log('Intentando conectar a la API de partidos');
        
        const response = await fetch('http://localhost:3005/api/scraping/run', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error al cargar los partidos: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        
        // Check if data is in the expected format
        if (result.data && result.data.leagues) {
          // Fix encoding issues in team names
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

  // Function to fix common encoding issues
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
      <div className="max-w-lg mx-auto text-center p-8 text-red-500">
        <p className="font-bold">Error: {error}</p>
        <p>Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto text-black dark:text-white font-sans">
      <h1 className="text-xl font-bold uppercase mb-4 p-2 dark:text-white">PARTIDOS DEL {getCurrentDate()}</h1>

      {leagues.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
          <p>No hay partidos disponibles para hoy.</p>
        </div>
      ) : (
        leagues.map((league, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1c1f22] rounded-lg shadow-lg border border-[#ccc] dark:border-gray-700 mb-4"
          >
            <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <img 
                src={league.logo || '/placeholder-logo.png'} 
                alt={league.name} 
                className="w-8 h-12 mr-3 object-contain" 
                onError={(e) => {e.currentTarget.src = '/placeholder-logo.png'}}
              />
              <span className="text-gray-800 dark:text-gray-200 text-lg font-medium">{league.name}</span>
            </div>

            <div className="px-4 py-2">
              {league.matches.map((match, matchIndex) => (
                <div
                  key={matchIndex}
                  className="py-4 mb-2 border-b last:border-b-0 border-gray-200 dark:border-gray-700"
                >
                  {/* Teams and Date Row */}
                  <div className="grid grid-cols-3 mb-4">
                    {/* Home Team */}
                    <div className="flex items-center">
                      <div className="text-sm text-black dark:text-white mr-2">{match.homeTeam.name}</div>
                      <img 
                        src={match.homeTeam.logo || '/placeholder-team.png'} 
                        alt={match.homeTeam.name} 
                        className="w-10 h-10 object-contain" 
                        onError={(e) => {e.currentTarget.src = '/placeholder-team.png'}}
                      />
                    </div>
                    
                    {/* Date and Time */}
                    <div className="text-center">
                      <div className="text-xs text-black dark:text-white">{match.date ? formatDate(match.date) : '--/--'}</div>
                      <div className="text-sm text-black dark:text-white font-medium">{match.time || '--:--'}</div>
                    </div>
                    
                    {/* Away Team */}
                    <div className="flex items-center justify-end">
                      <img 
                        src={match.awayTeam.logo || '/placeholder-team.png'} 
                        alt={match.awayTeam.name} 
                        className="w-10 h-10 mr-2 object-contain" 
                        onError={(e) => {e.currentTarget.src = '/placeholder-team.png'}}
                      />
                      <div className="text-sm text-black dark:text-white">{match.awayTeam.name}</div>
                    </div>
                  </div>
                  
                  {/* Odds */}
                  {match.odds && (
                    <div className="grid grid-cols-3 gap-2">
                      <button className="text-xs border border-purple-600 text-black dark:text-white font-bold rounded px-3 py-1 hover:bg-purple-600 hover:text-white transition duration-200">
                        {match.odds.home}
                      </button>
                      <button className="text-xs border border-purple-600 text-black dark:text-white font-bold rounded px-3 py-1 hover:bg-purple-600 hover:text-white transition duration-200">
                        {match.odds.draw}
                      </button>
                      <button className="text-xs bg-purple-600 text-white font-bold rounded px-3 py-1 hover:bg-purple-700 transition duration-200">
                        {match.odds.away}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}