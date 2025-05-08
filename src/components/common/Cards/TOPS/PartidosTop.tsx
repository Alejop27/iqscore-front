import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Team {
  name: string;
  logo: string;
}

interface Match {
  homeTeam: Team;
  awayTeam: Team;
  time: string;
  date: string;
  odds?: {
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

const PartidosTop: React.FC = () => {
  const [topMatches, setTopMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const fetchTopMatches = async () => {
      try {
        setLoading(true);
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
        
        if (result.data && result.data.leagues) {
          // Obtener todos los partidos de todas las ligas
          const allMatches: Match[] = [];
          result.data.leagues.forEach((league: League) => {
            allMatches.push(...league.matches);
          });

          // Tomar los primeros 3 partidos y formatearlos para el carrusel
          const formattedMatches = allMatches.slice(0, 3).map((match, index) => ({
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
            cuotas: match.odds ? [match.odds.home, match.odds.draw, match.odds.away] : ["-", "-", "-"]
          }));

          setTopMatches(formattedMatches);
        } else {
          setError('Los datos no están en el formato esperado');
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
      }, 6000); // Cambia cada 6 segundos

      return () => clearInterval(interval);
    }
  }, [topMatches]);

  if (loading) {
    return (
      <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
        <h2 className="text-[16px] md:text-[18px] font-bold uppercase mb-2 md:mb-4 px-2 md:px-0">
          PARTIDOS TOP DE LA SEMANA
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333] text-center">
          Cargando partidos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
        <h2 className="text-[16px] md:text-[18px] font-bold uppercase mb-2 md:mb-4 px-2 md:px-0">
          PARTIDOS TOP DE LA SEMANA
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333] text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  if (topMatches.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
        <h2 className="text-[16px] md:text-[18px] font-bold uppercase mb-2 md:mb-4 px-2 md:px-0">
          PARTIDOS TOP DE LA SEMANA
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333] text-center">
          No hay partidos top disponibles
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[16px] md:text-[18px] font-bold uppercase mb-2 md:mb-4 px-2 md:px-0">
        PARTIDOS TOP DE LA SEMANA
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
            style={{
              transform: `translateX(-${indice * 100}%)`,
            }}
          >
            {topMatches.map((partido, index) => (
              <div key={index} className="flex flex-row justify-between items-center px-2 md:px-8 py-4 w-full min-w-full shrink-0">
                {/* Equipo Local */}
                <div className="flex flex-col items-center gap-1 md:gap-4 text-center w-1/3 md:w-[250px]">
                  <img
                    src={partido.local.logo}
                    alt={`${partido.local.nombre} Logo`}
                    className="w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] object-contain"
                    onError={(e) => { e.currentTarget.src = '/placeholder-team.png' }}
                  />
                  <h3 className="text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] uppercase mt-1 truncate w-full">{partido.local.nombre}</h3>
                </div>

                {/* VS y Cuotas */}
                <div className="flex flex-col items-center gap-1 md:gap-4 w-1/3">
                  <div className="text-black dark:text-white text-[11px] sm:text-[12px] md:text-[16px] lg:text-[20px] font-semibold">
                    {partido.fecha}
                  </div>



                </div>

                {/* Equipo Visitante */}
                <div className="flex flex-col items-center gap-1 md:gap-4 text-center w-1/3 md:w-[250px]">
                  <img
                    src={partido.visitante.logo}
                    alt={`${partido.visitante.nombre} Logo`}
                    className="w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] object-contain"
                    onError={(e) => { e.currentTarget.src = '/placeholder-team.png' }}
                  />
                  <h3 className="text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] uppercase mt-1 truncate w-full">{partido.visitante.nombre}</h3>
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
        
        {/* Pagination indicators */}
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