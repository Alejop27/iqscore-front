import React from 'react';

interface Team {
  name: string;
  logo: string;
}

interface Match {
  homeTeam: Team;
  awayTeam: Team;
  time: string;
  date: string;  // Se mantiene el campo de fecha
  odds: {
    home: string;
    draw: string;
    away: string;
  };
}

interface League {
  name: string;
  logo: string;
  matches: Match[];
}

interface ProximosPartidosProps {
  leagues: League[];
}

const defaultData: ProximosPartidosProps = {
  leagues: [
    {
      name: "Liga Betplay Dimayor",
      logo: "https://a.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F1543.png",
      matches: [
        {
          homeTeam: { name: "América de Cali", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/8109.png" },
          awayTeam: { name: "Atlético Bucaramanga", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Atl%C3%A9ticoBucaramanga.png" },
          time: "18:05",
          date: "2025-04-20",
          odds: { home: "1.24", draw: "2.5", away: "4.45" }
        },
        {
          homeTeam: { name: "América de Cali", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/8109.png" },
          awayTeam: { name: "Deportivo Pereira", logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deportivo_Pereira_logo.png" },
          time: "20:10",
          date: "2025-04-22",
          odds: { home: "2.1", draw: "3.1", away: "3.3" }
        }
      ]
    },
    {
      name: "CONMEBOL Sudamericana",
      logo: "https://cdn.conmebol.com/wp-content/uploads/2021/10/logo_conmebol_sudamericana.png",
      matches: [
        {
          homeTeam: { name: "América de Cali", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/8109.png" },
          awayTeam: { name: "Liga de Quito", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/10587.png" },
          time: "19:30",
          date: "2025-04-28",
          odds: { home: "2.10", draw: "3.0", away: "3.85" }
        }
      ]
    },
    {
      name: "Copa Colombia",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Copa_Colombia_logo.png",
      matches: [
        {
          homeTeam: { name: "América de Cali", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/8109.png" },
          awayTeam: { name: "Atlético Nacional", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/8280.png" },
          time: "15:00",
          date: "2025-05-05",
          odds: { home: "1.95", draw: "3.2", away: "4.5" }
        }
      ]
    }
  ]
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtener el mes
  const day = String(date.getDate()).padStart(2, '0'); // Obtener el día
  return `${month}/${day}`; // Formato: mm/dd
};

const TeamGames: React.FC<Partial<ProximosPartidosProps>> = (props) => {
  const { leagues } = { ...defaultData, ...props };

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h1 className="text-[18px] font-bold uppercase mb-4">Próximos Partidos</h1>

      {leagues.map((league, index) => (
        <div key={index} className="mb-10 bg-white dark:bg-[#1c1f22] border border-[#ccc] dark:border-[#333] rounded-lg shadow-lg">
          {/* Header Liga */}
          <div className="flex items-center gap-3 px-6 pt-6 pb-2">
            <img src={league.logo} alt={league.name} className="w-8 h-8" />
            <span className="font-bold text-lg">{league.name}</span>
          </div>

          {/* Lista de Partidos */}
          <div className="p-6">
            {league.matches.map((match, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center gap-2 mb-6 w-full overflow-hidden">
                {/* Equipos, fecha y hora */}
                <div className="flex items-center justify-between w-full text-sm">
                  <span className="w-1/3 text-left truncate">{match.homeTeam.name}</span>

                  <div className="flex flex-col items-center w-1/3">
                    <div className="flex items-center gap-2 mb-1">
                      <img src={match.homeTeam.logo} alt="Home" className="w-10 h-10" />
                      <span className="text-sm text-center">{formatDate(match.date)}  {match.time}</span>  {/* Fecha con formato mm/dd */}
                      <img src={match.awayTeam.logo} alt="Away" className="w-10 h-10" />
                    </div>
                  </div>

                  <span className="w-1/3 text-right truncate">{match.awayTeam.name}</span>
                </div>

                {/* Cuotas */}
                <div className="flex justify-center gap-2 w-full">
                  <button className="text-xs bg-[#8400FF] text-white font-bold rounded px-3 py-1 hover:bg-[#9600ff]">
                    {match.odds.home}
                  </button>
                  <button className="text-xs border border-[#8400FF] text-black font-bold rounded px-3 py-1 hover:bg-[#9600ff] hover:text-white dark:text-white">
                    {match.odds.draw}
                  </button>
                  <button className="text-xs border border-[#8400FF] text-black font-bold rounded px-3 py-1 hover:bg-[#9600ff] hover:text-white dark:text-white">
                    {match.odds.away}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamGames;
