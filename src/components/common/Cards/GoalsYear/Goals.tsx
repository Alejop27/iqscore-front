import React, { useEffect, useState } from "react";

interface Goleador {
  "#": string;
  JUGADOR: string;
  PAÍS: string;
  EQUIPO: string;
  GOLES: string;
  PJ: string;
  PROMEDIO: string;
}

interface GoleadoresData {
  scraped_at: string;
  source_url: string;
  data: {
    overall_2025: Goleador[];
    monthly: {
      enero: any[];
      febrero: any[];
    };
  };
  errors: any[];
  debug_info: any;
}

const TopScorersCard: React.FC = () => {
  const [scorersData, setScorersData] = useState<GoleadoresData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScorersData = async () => {
      try {
        const response = await fetch("https://scrapgoals-production.up.railway.app/scrape");
        const data: GoleadoresData = await response.json();
        setScorersData(data);
      } catch (err) {
        setError("Error al cargar los datos de goleadores");
        console.error("Error fetching scorers data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScorersData();
  }, []);

  const renderCountryFlag = (country: string) => {
    // Aquí podrías implementar lógica para mostrar banderas según el país
    return (
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {country}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center text-black dark:text-white mt-10 font-nunito">
        Cargando tabla de goleadores...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 mt-10 font-nunito">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto text-black dark:text-white font-nunito">
      <h3 className="font-bold text-lg text-black dark:text-white uppercase mb-4">
        Top Goleadores 2025
      </h3>

      {/* Encabezado */}
      <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center py-3 px-6 bg-[#8400FF] text-white font-semibold text-sm rounded-t-lg">
        <div>#</div>
        <div>Jugador</div>
        <div className="text-center">Equipo</div>
        <div className="text-center">Goles</div>
        <div className="text-center">PJ</div>
        <div className="text-center">Prom.</div>
      </div>

      {/* Contenido */}
      <div className="relative bg-white dark:bg-[#1B1D20] p-6 pt-0 rounded-b-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {scorersData?.data.overall_2025.map((scorer) => (
          <div
            key={scorer.JUGADOR}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center py-3 px-6 border-b border-gray-200 dark:border-gray-700 text-sm last:border-b-0"
          >
            <div className="font-medium text-gray-400">{scorer["#"]}</div>
            <div>
              <div className="font-medium text-black dark:text-white">
                {scorer.JUGADOR}
              </div>
              {renderCountryFlag(scorer.PAÍS)}
            </div>
            <div className="text-center text-black dark:text-white">
              {scorer.EQUIPO}
            </div>
            <div className="text-center font-bold text-black dark:text-white">
              {scorer.GOLES}
            </div>
            <div className="text-center text-black dark:text-white">
              {scorer.PJ}
            </div>
            <div className="text-center font-bold text-[#8400FF] dark:text-purple-300">
              {scorer.PROMEDIO}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Actualizado: {new Date(scorersData?.scraped_at || '').toLocaleString()}
      </div>
    </div>
  );
};

export default TopScorersCard;