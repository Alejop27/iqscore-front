import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Team {
  name: string;
  logo: string;
  yellowCards?: string;
  possession?: string;
}

interface Match {
  homeTeam: Team;
  awayTeam: Team;
  time?: string;
  date?: string;
  status?: 'live' | 'finished' | 'scheduled' | string;
  currentTime?: string;
  score?: string;
  href?: string;
}

interface MatchDetails {
  homeTeam: Team;
  awayTeam: Team;
  matchDetails: {
    score?: string;
    status?: string;
    dateTime?: string;
  };
  probabilities: {
    home?: string;
    draw?: string;
    away?: string;
    homeValue?: number;
    drawValue?: number;
    awayValue?: number;
  };
}

const MatchInfoCard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { match } = location.state as { match: Match };
  
  const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Si no hay datos del partido, redirigir
  if (!match) {
    navigate("/");
    return null;
  }

useEffect(() => {
  const fetchMatchDetails = async () => {
    if (!match.href) {
      setError("No se encontró un enlace para este partido");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Extraer el ID del partido de la URL completa
      const matchId = match.href.split('/').pop();
      
      // Usar el endpoint GET con el ID del partido
      const response = await fetch(`https://scrrap-production.up.railway.app/scrape_match/${matchId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        // Si falla, intentar con el endpoint POST como fallback
        const postResponse = await fetch('https://scrrap-production.up.railway.app/scrape_match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: match.href })
        });
        
        if (!postResponse.ok) {
          throw new Error(`Error al cargar los detalles: ${postResponse.status} ${postResponse.statusText}`);
        }
        
        const postData = await postResponse.json();
        setMatchDetails(postData);
        return;
      }

      const data = await response.json();
      setMatchDetails(data);
    } catch (err) {
      console.error('Error al obtener detalles del partido:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido en la conexión');
      }
    } finally {
      setLoading(false);
    }
  };

  fetchMatchDetails();
}, [match.href]);

  const fixEncoding = (text: string): string => {
    return text
      .replace(/�/g, 'á')
      .replace(/�/g, 'é')
      .replace(/�/g, 'í')
      .replace(/�/g, 'ó')
      .replace(/�/g, 'ú')
      .replace(/�/g, 'ñ');
  };

  if (loading) {
    return (
      <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito p-8">
        <h2 className="text-[18px] font-bold uppercase mb-4">
          INFORMACIÓN DEL PARTIDO
        </h2>
        <div className="bg-white dark:bg-[#1B1D20] p-6 rounded-lg shadow-lg border border-[#ccc] dark:border-[#333]">
          <div className="animate-pulse flex flex-col">
            <div className="flex items-center justify-between p-6">
              <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 w-20 rounded"></div>
              <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 w-full rounded mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito p-8">
        <h2 className="text-[18px] font-bold uppercase mb-4">
          INFORMACIÓN DEL PARTIDO
        </h2>
        <div className="bg-white dark:bg-[#1B1D20] p-6 rounded-lg shadow-lg border border-[#ccc] dark:border-[#333] text-center">
          <p className="font-bold mb-2">No se pudieron cargar los detalles del partido</p>
          <p>{error}</p>
          <button 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            Volver a partidos
          </button>
        </div>
      </div>
    );
  }

  // Usar datos detallados si están disponibles, o datos básicos del partido
  const homeTeam = matchDetails?.homeTeam || match.homeTeam;
  const awayTeam = matchDetails?.awayTeam || match.awayTeam;
  const score = matchDetails?.matchDetails?.score || match.score || "0-0";
  const status = matchDetails?.matchDetails?.status || match.status || "scheduled";
  
  // Probabilidades
  const probHome = matchDetails?.probabilities?.homeValue || 33;
  const probDraw = matchDetails?.probabilities?.drawValue || 34;
  const probAway = matchDetails?.probabilities?.awayValue || 33;
  
  // Fecha y hora
  const dateTime = matchDetails?.matchDetails?.dateTime || (match.date && match.time ? `${match.date} ${match.time}` : "Fecha no disponible");

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito p-4">
      <h2 className="text-[18px] font-bold uppercase mb-4">
        INFORMACIÓN DEL PARTIDO
      </h2>

      <div className="relative bg-white dark:bg-[#1B1D20] p-6 rounded-lg shadow-lg border border-[#ccc] dark:border-[#333]">
        <div className="flex items-center justify-between p-6">
          {/* Equipo Local */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <img
                src={homeTeam.logo || '/placeholder-team.png'}
                alt={`${homeTeam.name} Logo`}
                className="max-w-full max-h-full"
                onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }}
              />
            </div>
            <p className="text-sm uppercase tracking-[0.5px] mb-1">
              {fixEncoding(homeTeam.name)}
            </p>
            <p className="text-2xl font-bold">
              {score?.split('-')[0]?.trim() || '0'}
            </p>
            {homeTeam.yellowCards && (
              <div className="mt-2 flex items-center">
                <div className="w-3 h-4 bg-yellow-400 mr-1"></div>
                <span className="text-sm">{homeTeam.yellowCards}</span>
              </div>
            )}
            {homeTeam.possession && (
              <p className="text-sm mt-1">Posesión: {homeTeam.possession}</p>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col items-center text-center">
            <p className="mb-1">Estado</p>
            <p className="text-sm mb-1">{dateTime}</p>
            {status.toLowerCase().includes('live') && (
              <p className="text-red-500 font-bold animate-pulse">EN VIVO</p>
            )}
            {status.toLowerCase().includes('full-time') && (
              <p className="text-green-500 font-bold">FINALIZADO</p>
            )}
            {!status.toLowerCase().includes('live') && !status.toLowerCase().includes('full-time') && (
              <p className="font-bold">{status}</p>
            )}
            <p className="text-2xl font-bold mt-2">VS</p>
          </div>

          {/* Equipo Visitante */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <img
                src={awayTeam.logo || '/placeholder-team.png'}
                alt={`${awayTeam.name} Logo`}
                className="max-w-full max-h-full"
                onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }}
              />
            </div>
            <p className="text-sm uppercase tracking-[0.5px] mb-1">
              {fixEncoding(awayTeam.name)}
            </p>
            <p className="text-2xl font-bold">
              {score?.split('-')[1]?.trim() || '0'}
            </p>
            {awayTeam.yellowCards && (
              <div className="mt-2 flex items-center">
                <div className="w-3 h-4 bg-yellow-400 mr-1"></div>
                <span className="text-sm">{awayTeam.yellowCards}</span>
              </div>
            )}
            {awayTeam.possession && (
              <p className="text-sm mt-1">Posesión: {awayTeam.possession}</p>
            )}
          </div>
        </div>

        {/* Barra de Probabilidades */}
        <div className="mt-6">
          <div className="text-xs flex justify-between mb-1 px-1">
            <span>{fixEncoding(homeTeam.name)} {probHome}%</span>
            <span>Empate {probDraw}%</span>
            <span>{fixEncoding(awayTeam.name)} {probAway}%</span>
          </div>
          <div className="h-4 w-full rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden shadow-inner flex">
            <div
              className="h-full bg-purple-500 dark:bg-purple-600"
              style={{ width: `${probHome}%` }}
            ></div>
            <div
              className="h-full bg-yellow-400 dark:bg-yellow-500"
              style={{ width: `${probDraw}%` }}
            ></div>
            <div
              className="h-full bg-blue-500 dark:bg-blue-400"
              style={{ width: `${probAway}%` }}
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MatchInfoCard;