import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { MYSQL_URI } from '../../../config/config'; // Import MYSQL_URI from config

// Define an interface for the team data
interface Team {
  id: string;
  name: string;
  logo: string;
}

interface League{
  idLiga: number;
  nombre: string
}

const AllTeams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [league, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>("1"); // Default league ID

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    //  fetch data leagues from backend
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${MYSQL_URI}/api/ligas`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: any[] = await response.json();
        const formattedLeagues: League[] = data.map((league) => ({
          idLiga: league.idLiga,
          nombre: league.nombre,
        }));
        setLeagues(formattedLeagues);
        setError(null);
      } catch (error) {
        console.error("Error fetching leagues:", error);
        setError("Failed to load leagues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    // Fetch data teams from backend
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${MYSQL_URI}/api/liga/equipos/${selectedLeague}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: any[] = await response.json();
        const formattedTeams: Team[] = data.map((team) => ({
          id: team.idEquipo.toString(),
          name: team.nombre,
          logo: team.logo ?? getDefaultLogo(team.nombre),
        }));
        setTeams(formattedTeams);
        setError(null);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError("Failed to load teams. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [selectedLeague]); // Re-fetch teams when selectedLeague changes

  // Helper function to get a default logo if none is provided
  const getDefaultLogo = (teamName: string): string => {
    return `https://via.placeholder.com/150?text=${encodeURIComponent(teamName)}`;
  };

  // Toggle favorite status for a team
  const toggleFavorite = (teamId: string) => {
    setFavorites(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  // Navigate to team page
  const handleTeamClick = (teamId: string) => {
    navigate(`/team/${teamId}`); // Navigate to the team page with the team ID
  };

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-bold uppercase mb-4">Equipos</h2>
      <div className="mb-4">
        <label htmlFor="league-select" className="mr-2">Select League:</label>
        <select
          id="league-select"
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="p-2 border rounded dark:bg-[#1B1D20] dark:border-[#333] dark:text-white"
        >
          {league.length > 0 ? (
            league.map((league) => (
              <option key={league.idLiga} value={league.idLiga.toString()}>
                {league.nombre}
              </option>
            ))
          ) : (
            <option value="1">Loading leagues...</option>
          )}
        </select>
      </div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333]">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : teams.length === 0 ? (
          <div className="text-center py-4">No teams found</div>
        ) : (
          <div className="flex flex-col gap-5">
            {teams.map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between py-2 cursor-pointer"
                onClick={() => handleTeamClick(team.id)} // Add onClick to navigate
              >
                <div className="flex items-center gap-4">
                  <img
                    src={team.logo}
                    alt={`${team.name} Logo`}
                    className="w-9 h-9 object-contain"
                  />
                  <span className="text-[18px]">{team.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking the favorite button
                    toggleFavorite(team.id);
                  }}
                  className={`text-xl opacity-80 hover:opacity-100 focus:outline-none ${favorites[team.id]
                      ? "text-red-500"
                      : "text-black dark:text-white"
                    }`}
                  aria-label={favorites[team.id] ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorites[team.id] ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTeams;
