import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PlayerData {
  idJugador: number;
  nombre: string;
  edad: number;
  fecha_nacimiento: string;
  nacionalidad: string;
  nacionalidad_logo: string | null;
  altura: string;
  peso: string;
  pierna_habil: string;
  posicion: string;
  posicion_ideal: string;
  valor_mercado: string;
  partidos_jugados: number;
  goles: number;
  asistencias: number;
  tarjetas_rojas: number;
  tarjetas_amarillas: number;
  pases_completados: number;
  tiros_totales: number;
  tiros_al_arco: number;
  corners: number;
  faltas: number;
  habilidades: string;
  caracteristicas: string | null;
  atributos: string | null;
  numero_camiseta: number | null;
}

interface PlayerTitle {
  idJugador: number;
  nombre_titulo: string;
  año: string;
}

const Statistics: React.FC = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [titles, setTitles] = useState<PlayerTitle[]>([]);
  const [titlesLoading, setTitlesLoading] = useState(true);
  const [titlesError, setTitlesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/jugadores/${playerId}`);
        if (!res.ok) throw new Error("Error al obtener los datos del jugador");
        const data = await res.json();
        setPlayer(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [playerId]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        setTitlesLoading(true);
        const res = await fetch(`http://localhost:3001/api/jugadordetalles/${playerId}/titulos`);
        if (!res.ok) throw new Error("Error al obtener los títulos del jugador");
        const data = await res.json();
        setTitles(data);
      } catch (err: any) {
        setTitlesError(err.message);
      } finally {
        setTitlesLoading(false);
      }
    };

    if (playerId) {
      fetchTitles();
    }
  }, [playerId]);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!player) return null;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 text-black dark:text-white font-nunito">
      <h2 className="text-lg font-semibold mb-4">DATOS DEL JUGADOR</h2>
  
      {/* Grid de dos columnas */}
      <div className="grid md:grid-cols-2 gap-6 bg-white dark:bg-[#1B1D20] p-6 rounded-lg shadow-lg border border-[#ccc] dark:border-[#333] text-sm md:text-base">
        {/* Columna izquierda */}
        <div className="space-y-2">
          <p><strong>Edad:</strong> {player.edad}</p>
          <p><strong>Fecha de Nacimiento:</strong> {new Date(player.fecha_nacimiento).toLocaleDateString()}</p>
          <p><strong>Nacionalidad:</strong> {player.nacionalidad}</p>
          <p><strong>Estatura:</strong> {player.altura} m</p>
          <p><strong>Peso:</strong> {player.peso} kg</p>
          <p><strong>Pierna Hábil:</strong> {player.pierna_habil}</p>
          <p><strong>Posición:</strong> {player.posicion}</p>
          <p><strong>Posición Ideal:</strong> {player.posicion_ideal}</p>
          <p><strong>Número de Camiseta:</strong> {player.numero_camiseta ?? "N/A"}</p>
        </div>
  
        {/* Columna derecha */}
        <div className="space-y-2">
          <p><strong>Partidos Jugados:</strong> {player.partidos_jugados}</p>
          <p><strong>Goles:</strong> {player.goles}</p>
          <p><strong>Asistencias:</strong> {player.asistencias}</p>
          <p><strong>Tarjetas Amarillas:</strong> {player.tarjetas_amarillas}</p>
          <p><strong>Tarjetas Rojas:</strong> {player.tarjetas_rojas}</p>
          <p><strong>Pases Completados:</strong> {player.pases_completados}</p>
          <p><strong>Tiros Totales:</strong> {player.tiros_totales}</p>
          <p><strong>Tiros al Arco:</strong> {player.tiros_al_arco}</p>
          <p><strong>Corners:</strong> {player.corners}</p>
          <p><strong>Faltas Cometidas:</strong> {player.faltas}</p>
          <p><strong>Habilidades:</strong> {player.habilidades}</p>
          <p><strong>Características:</strong> {player.caracteristicas ?? "N/A"}</p>
          <p><strong>Atributos:</strong> {player.atributos ?? "N/A"}</p>
        </div>
      </div>
  
      {/* Títulos en una sección aparte, a lo ancho */}
      <div className="mt-10">
        <h3 className="text-md font-bold mb-4 flex items-center gap-2">
          Títulos del Jugador
        </h3>
        {titlesLoading ? (
          <p className="text-sm text-gray-500">Cargando títulos...</p>
        ) : titlesError ? (
          <p className="text-sm text-red-500">{titlesError}</p>
        ) : titles.length === 0 ? (
          <p className="text-sm italic text-gray-400">Este jugador no ha ganado títulos aún.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {titles.map((title, index) => (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-6 bg-white dark:bg-[#1B1D20] p-6 rounded-lg shadow-lg border border-[#ccc] dark:border-[#333] text-sm md:text-base"
                >

                <div>
                  <p className="font-medium">{title.nombre_titulo}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Año: {title.año}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Statistics;
