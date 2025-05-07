
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoTeam from "./InfoTeam";

interface TeamData {
  nombre_equipo: string;
  logo: string;
  ciudad: string;
  valor_mercado: string;
  entrenador: string;
  presidente: string;
  estadionombre: string;
  ubicacion_estadio: string;
  historia_equipo: string;
  nombre_liga: string;
  logo_liga: string;
}

const TeamContainer: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>(); // Get teamId from route parameters
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teamId) {
      setError("No team ID provided.");
      setLoading(false);
      return;
    }

    const fetchTeamData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3001/api/equipo/${teamId}`);
        if (!response.ok) {
          throw new Error(`Failed to load team. Status: ${response.status}`);
        }
        const data = await response.json();
        const team: TeamData = Array.isArray(data) ? data[0] : data;
        setTeamData(team);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load team. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!teamData) return <div>No team data found.</div>;

  function formatMarketValue(value: string | number): string {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "-";
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(2).replace(/\.00$/, "")}K`;
    return num.toString();
  }

  return (
    <div>
      <InfoTeam
        name={teamData.nombre_equipo}
        logo={teamData.logo}
        city={teamData.ciudad}
        marketValue={formatMarketValue(teamData.valor_mercado)}
        coach={teamData.entrenador}
        president={teamData.presidente}
        stadiumName={teamData.estadionombre}
        stadiumLocation={teamData.ubicacion_estadio}
        teamHistory={teamData.historia_equipo}
        leagueName={teamData.nombre_liga}
        leagueLogo={teamData.logo_liga}
      />
    </div>
  );
};

export default TeamContainer;
