import React, { useEffect, useState } from "react";

interface Goleador {
  "#"?: string;
  JUGADOR: string;
  PAÍS: string;
  EQUIPO: string;
  GOLES?: string;
  PJ: string;
  PROMEDIO: string;
}

interface GoleadoresData {
  scraped_at: string;
  source_url: string;
  goleadores_anuales: Goleador[];
  goleadores_enero: Goleador[];
  goleadores_febrero: Goleador[];
  goleadores_marzo: Goleador[];
  error: any;
}

const TopScorersCard: React.FC = () => {
  const [scorersData, setScorersData] = useState<GoleadoresData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'anual' | 'enero' | 'febrero' | 'marzo'>('anual');

  useEffect(() => {
    const fetchScorersData = async () => {
      try {
        const response = await fetch("https://scrapgoals-production.up.railway.app/scrape");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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
    return (
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {country}
      </span>
    );
  };

  const renderScorersTable = (scorers: Goleador[], showRanking: boolean) => {
    return (
      <div className="relative bg-white dark:bg-[#1B1D20] p-6 pt-0 rounded-b-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {scorers
          .filter((scorer) => scorer.JUGADOR !== "JUGADOR") // Excluye el encabezado
          .map((scorer, index) => (
            <div
              key={`${scorer.JUGADOR}-${index}`}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center py-3 px-6 border-b border-gray-200 dark:border-gray-700 text-sm last:border-b-0"
            >
              <div className="font-medium text-gray-400">
                {showRanking ? scorer["#"] || index + 1 : index + 1}
              </div>
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

  if (!scorersData) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 mt-10 font-nunito">
        No se encontraron datos de goleadores
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto text-black dark:text-white font-nunito">
      <h3 className="font-bold text-lg text-black dark:text-white uppercase mb-4">
        Top Goleadores 2025
      </h3>

      {/* Tabs */}
      <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'anual' ? 'text-[#8400FF] border-b-2 border-[#8400FF]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('anual')}
        >
          Anual
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'enero' ? 'text-[#8400FF] border-b-2 border-[#8400FF]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('enero')}
        >
          Enero
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'febrero' ? 'text-[#8400FF] border-b-2 border-[#8400FF]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('febrero')}
        >
          Febrero
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'marzo' ? 'text-[#8400FF] border-b-2 border-[#8400FF]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('marzo')}
        >
          Marzo
        </button>
      </div>

      {/* Encabezado */}
      <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center py-3 px-6 bg-[#8400FF] text-white font-semibold text-sm rounded-t-lg">
        <div>#</div>
        <div>Jugador</div>
        <div className="text-center">Equipo</div>
        <div className="text-center">Goles</div>
        <div className="text-center">PJ</div>
        <div className="text-center">Prom.</div>
      </div>

      {/* Tabla según pestaña activa */}
      {activeTab === 'anual' && renderScorersTable(scorersData.goleadores_anuales, true)}
      {activeTab === 'enero' && renderScorersTable(scorersData.goleadores_enero, false)}
      {activeTab === 'febrero' && renderScorersTable(scorersData.goleadores_febrero, true)}
      {activeTab === 'marzo' && renderScorersTable(scorersData.goleadores_marzo, true)}
      
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Actualizado: {new Date(scorersData.scraped_at).toLocaleString()}
        {scorersData.source_url && (
          <span className="ml-2">
            | Fuente: <a href={scorersData.source_url} target="_blank" rel="noopener noreferrer" className="text-[#8400FF]">El Gráfico</a>
          </span>
        )}
      </div>
    </div>
  );
};

export default TopScorersCard;