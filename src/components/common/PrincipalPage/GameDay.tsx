import React from 'react';

interface Team {
  name: string;
  logo: string;
}

interface Match {
  homeTeam: Team;
  awayTeam: Team;
  time: string;
  date: string;
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

interface PartidosDelDiaProps {
  leagues: League[];
}

const defaultData: PartidosDelDiaProps = {
  leagues: [
    {
      name: "Liga Betplay Dimayor",
      logo: "https://a.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F1543.png",
      matches: [
        {
          homeTeam: { name: "América de Cali", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/8109.png" },
          awayTeam: { name: "Atlético Bucaramanga", logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Escudo_Atl%C3%A9tico_Bucaramanga_2024.png" },
          time: "18:05",
          date: "2025-04-19",
          odds: { home: "1.24", draw: "2.5", away: "4.45" }
        },
        {
          homeTeam: { name: "Atlético Nacional", logo: "/logos/nacional.png" },
          awayTeam: { name: "Millonarios", logo: "/logos/millonarios.png" },
          time: "20:10",
          date: "2025-04-20",
          odds: { home: "2.00", draw: "3.00", away: "3.50" }
        }
      ]
    },
    {
      name: "Premier League",
      logo: "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/23.png",
      matches: [
        {
          homeTeam: { name: "Manchester United", logo: "/logos/man-united.png" },
          awayTeam: { name: "Chelsea", logo: "/logos/chelsea.png" },
          time: "13:30",
          date: "2025-04-21",
          odds: { home: "2.10", draw: "3.30", away: "3.10" }
        },
        {
          homeTeam: { name: "Liverpool", logo: "/logos/liverpool.png" },
          awayTeam: { name: "Arsenal", logo: "/logos/arsenal.png" },
          time: "16:00",
          date: "2025-04-22",
          odds: { home: "1.95", draw: "3.25", away: "3.60" }
        }
      ]
    }
  ]
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

const PartidosDelDia: React.FC<Partial<PartidosDelDiaProps>> = (props) => {
  const { leagues } = { ...defaultData, ...props };

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h1 className="text-[18px] font-bold uppercase mb-4 p-2 dark:text-white">PARTIDOS DEL {getCurrentDate()}</h1>

      {leagues.map((league, index) => (
        <div
          key={index}
          className="bg-white dark:bg-[#1c1f22] rounded-lg shadow-lg border border-[#ccc] dark:shadow-[0_10px_20px_#111517,0_0_0px_#BEBEBE] dark:border-[#333] mb-4"
        >
          <div className="flex items-center px-4 py-3 border-b border-[#ddd] dark:border-[#333]">
            <img src={league.logo} alt={league.name} className="w-12 h-12 mr-3" />
            <span className="text-[#333] dark:text-[#ccc] text-[18px] font-medium">{league.name}</span>
          </div>

          <div className="px-4 py-2">
            {league.matches.map((match, matchIndex) => (
              <div
                key={matchIndex}
                className="py-4 mb-2 border-b last:border-b-0 border-[#ddd] dark:border-[#333]"
              >
                {/* Teams and Date Row */}
                <div className="grid grid-cols-3 mb-4">
                  {/* Home Team */}
                  <div className="flex items-center">
                    <div className="text-sm text-black dark:text-white mr-2">{match.homeTeam.name}</div>
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-10 h-10" />
                  </div>
                  
                  {/* Date and Time */}
                  <div className="text-center">
                    <div className="text-xs text-black dark:text-white">{formatDate(match.date)}</div>
                    <div className="text-sm text-black dark:text-white font-medium">{match.time}</div>
                  </div>
                  
                  {/* Away Team */}
                  <div className="flex items-center justify-end">
                    <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-10 h-10 mr-2" />
                    <div className="text-sm text-black dark:text-white">{match.awayTeam.name}</div>
                  </div>
                </div>
                
                {/* Odds */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="text-xs border border-[#8400FF] text-black font-bold rounded px-3 py-1 hover:bg-[#9600ff] hover:text-white dark:text-white">
                    {match.odds.home}
                  </button>
                  <button className="text-xs border border-[#8400FF] text-black font-bold rounded px-3 py-1 hover:bg-[#9600ff] hover:text-white dark:text-white">
                    {match.odds.draw}
                  </button>
                  <button className="text-xs bg-[#8400FF] text-white font-bold rounded px-3 py-1 hover:bg-[#9600ff]">
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

export default PartidosDelDia;