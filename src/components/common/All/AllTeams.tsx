import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const AllTeams = () => {
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({
    "real-madrid": false,
    "barcelona": false,
    "manchester-city": false,
    "bayern-munich": false,
    "psg": false,
    "juventus": false,
  });

  const toggleFavorite = (team: string) => {
    setFavorites((prev) => ({
      ...prev,
      [team]: !prev[team],
    }));
  };

  const teams = [
    {
      id: "real-madrid",
      name: "Real Madrid",
      logo:
        "https://static0.givemesportimages.com/wordpress/wp-content/uploads/2024/08/real-madrid-logo-resized.png",
    },
    {
      id: "barcelona",
      name: "FC Barcelona",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png",
    },
    {
      id: "manchester-city",
      name: "Manchester City",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
    },
    {
      id: "bayern-munich",
      name: "Bayern Munich",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    },
    {
      id: "psg",
      name: "Paris Saint-Germain",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png",
    },
    {
      id: "juventus",
      name: "Juventus",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/1200px-Juventus_FC_2017_icon_%28black%29.svg.png",
    },
  ];

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-bold uppercase mb-4">Equipos</h2>
      <div className="relative bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333]">
        <div className="flex flex-col gap-5">
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex items-center justify-between py-2"
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
                onClick={() => toggleFavorite(team.id)}
                className={`text-xl opacity-80 hover:opacity-100 focus:outline-none ${
                  favorites[team.id]
                    ? "text-red-500"
                    : "text-black dark:text-white"
                }`}
              >
                {favorites[team.id] ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTeams;
