import React from 'react';

interface Team {
  name: string;
  logo: string;
}

interface Match {
  homeTeam: Team;
  awayTeam: Team;
  time: string;
  date: string; // NUEVO
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

const ligaUnica: League = {
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
      awayTeam: { name: "Atlético Bucaramanga", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Atl%C3%A9ticoBucaramanga.png" },
      time: "18:05",
      date: "2025-04-23",
      odds: { home: "1.24", draw: "2.5", away: "4.45" }
    },
    {
      homeTeam: { name: "América de Cali", logo: "https://a.espncdn.com/i/teamlogos/soccer/500/8109.png" },
      awayTeam: { name: "Atlético Bucaramanga", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Atl%C3%A9ticoBucaramanga.png" },
      time: "18:05",
      date: "2025-04-26",
      odds: { home: "1.24", draw: "2.5", away: "4.45" }
    }
  ]
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
};

const GamesLeague: React.FC = () => {
  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h1 className="text-[18px] font-bold uppercase mb-4">Partidos</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1c1f22] dark:shadow-[0_10px_20px_#111517,0_0_0px_#BEBEBE] dark:border-[#333]">
        <div className="p-2">
          {ligaUnica.matches.map((match, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center gap-2 mb-6 w-full overflow-hidden"
            >
              {/* Equipos, fecha y hora */}
              <div className="flex items-center justify-between w-full text-sm">
                <span className="w-1/3 text-left truncate">{match.homeTeam.name}</span>

                <div className="flex flex-col items-center w-1/3">
                  <span className="text-xs ">{formatDate(match.date)}</span>
                  <div className="flex items-center gap-2 mb-1">
                    <img src={match.homeTeam.logo} alt="Home" className="w-10 h-10" />
                    <span>{match.time}</span>
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
    </div>
  );
};

export default GamesLeague;
