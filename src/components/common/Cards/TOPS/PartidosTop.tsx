import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Team {
  name: string;
  logo?: string;
}

interface Match {
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time?: string;
  score?: string;
  status?: string;
  currentTime?: string;
}

const PartidosTop: React.FC = () => {
  const [topMatches, setTopMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [indice, setIndice] = useState(0);
  const [leagueName, setLeagueName] = useState("Liga Betplay"); // Default league name

  useEffect(() => {
    const fetchTopMatches = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://scrrap-production.up.railway.app/scrape', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error al cargar los partidos: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.leagues && result.leagues.length > 0) {
          // Try to find Colombian league first
          let selectedLeague = result.leagues.find(
            (league: any) => league.name === "Apertura Colombia" || league.name.includes("Colombia")
          );

          // If Colombian league not found, use the first available league
          if (!selectedLeague) {
            selectedLeague = result.leagues[0];
            setLeagueName(selectedLeague.name || "Partidos Top"); // Update league name
          } else {
            setLeagueName("Liga Betplay"); // Keep Colombian league name
          }

          if (!selectedLeague || !selectedLeague.matches || selectedLeague.matches.length === 0) {
            setError("No se encontraron partidos disponibles");
            return;
          }

          const formattedMatches = (selectedLeague.matches as Match[]).slice(0, 3).map((match: Match, index: number) => ({
            id: index + 1,
            local: {
              nombre: match.homeTeam.name,
              logo: match.homeTeam.logo || '/placeholder-team.png'
            },
            visitante: {
              nombre: match.awayTeam.name,
              logo: match.awayTeam.logo || '/placeholder-team.png'
            },
            fecha: match.date,
            hora: match.time || "00:00",
            score: match.score || "",
            status: match.status || "scheduled",
            currentTime: match.currentTime || ""
          }));

          setTopMatches(formattedMatches);
        } else {
          setError('No se encontraron ligas disponibles');
        }
      } catch (err) {
        console.error('Error al obtener partidos top:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchTopMatches();
  }, []);

  const handlePrev = () => {
    setIndice((prev) => (prev > 0 ? prev - 1 : topMatches.length - 1));
  };

  const handleNext = () => {
    setIndice((prev) => (prev < topMatches.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (topMatches.length > 0) {
      const interval = setInterval(() => {
        setIndice((prev) => (prev < topMatches.length - 1 ? prev + 1 : 0));
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [topMatches]);

  const renderEstado = (status: string, hora: string, currentTime?: string) => {
    switch (status) {
      case "live": 
        return <span className="text-red-500 font-semibold">{currentTime || "EN VIVO"}</span>;
      case "finished": 
        return <span className="text-gray-500 font-semibold">FINALIZADO</span>;
      case "scheduled": 
      default: 
        return <span className="text-black dark:text-white font-semibold">{hora}</span>;
    }
  };

  if (loading || error || topMatches.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
        <h2 className="text-[16px] md:text-[18px] font-bold uppercase mb-2 md:mb-4 px-2 md:px-0">
          {leagueName.toUpperCase()}
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333] text-center">
          {loading ? "Cargando partidos..." : error ? `Error: ${error}` : "No hay partidos disponibles"}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[16px] md:text-[18px] font-bold uppercase mb-2 md:mb-4 px-2 md:px-0">
        {leagueName.toUpperCase()}
      </h2>

      <div className="relative bg-white p-3 md:p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333]">
        <button
          onClick={handlePrev}
          className="absolute left-1 md:left-5 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-lg md:text-xl opacity-70 hover:opacity-100 z-10"
        >
          <FaChevronLeft />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${indice * 100}%)` }}
          >
            {topMatches.map((partido, index) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center px-2 md:px-8 py-4 w-full min-w-full shrink-0"
              >
                {/* Local */}
                <div className="flex flex-col items-center gap-1 md:gap-4 text-center w-1/3">
                  <img
                    src={partido.local.logo}
                    alt={partido.local.nombre}
                    className="w-[60px] h-[60px] object-contain"
                    onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }}
                  />
                  <h3 className="text-[10px] md:text-[12px] uppercase mt-1 truncate w-full">{partido.local.nombre}</h3>
                </div>

                {/* Centro */}
                <div className="flex flex-col items-center gap-1 w-1/3 text-center">
                  <div className="text-[10px] md:text-[12px]">
                    {renderEstado(partido.status, partido.hora, partido.currentTime)}
                  </div>
                  {partido.score && (
                    <div className="text-[14px] md:text-[18px] font-bold">
                      {partido.score}
                    </div>
                  )}
                </div>

                {/* Visitante */}
                <div className="flex flex-col items-center gap-1 md:gap-4 text-center w-1/3">
                  <img
                    src={partido.visitante.logo}
                    alt={partido.visitante.nombre}
                    className="w-[60px] h-[60px] object-contain"
                    onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }}
                  />
                  <h3 className="text-[10px] md:text-[12px] uppercase mt-1 truncate w-full">{partido.visitante.nombre}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-1 md:right-5 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-lg md:text-xl opacity-70 hover:opacity-100 z-10"
        >
          <FaChevronRight />
        </button>

        <div className="flex justify-center mt-2 md:mt-4 gap-1 md:gap-2">
          {topMatches.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 md:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === indice ? "w-4 md:w-6 bg-[#8400FF]" : "w-1 md:w-2 bg-gray-300 dark:bg-gray-600"
              }`}
              onClick={() => setIndice(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartidosTop;