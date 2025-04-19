import React from 'react';

interface Scorer {
  name: string;
  image: string;
  matchesPlayed: number;
  goals: number;
}

const scorers: Scorer[] = [
  {
    name: "Jugador 1",
    image: "/players/mbappe.png",
    matchesPlayed: 12,
    goals: 12,
  },
  {
    name: "Jugador 2",
    image: "/players/barcelona1.png",
    matchesPlayed: 12,
    goals: 12,
  },
  {
    name: "Jugador 3",
    image: "/players/muller.png",
    matchesPlayed: 12,
    goals: 12,
  },
  {
    name: "Jugador 4",
    image: "/players/unknown1.png",
    matchesPlayed: 12,
    goals: 12,
  },
  {
    name: "Jugador 5",
    image: "/players/barcelona2.png",
    matchesPlayed: 12,
    goals: 12,
  },
];

const TopScorers: React.FC = () => {
  return (
    <div className="max-w-[250px] text-black dark:text-white font-nunito">
      {/* Título por fuera de la card */}
      <h2 className="text-[18px] font-bold uppercase mb-4">Goleadores</h2>

      {/* Card */}
      <div className="bg-white dark:bg-[#111517] text-white rounded-xl p-4 shadow-md border border-[#ccc] dark:bg-[#1c1f22] dark:shadow-[0_10px_20px_#111517,0_0_0px_#BEBEBE] dark:border-[#333]">
        <div className="flex justify-end pr-4 text-sm text-gray-300">
          <div className="w-[40px] text-center text-black dark:text-white">PJ</div>
          <div className="w-[40px] text-center text-black dark:text-white">G</div>
        </div>
        <div className="space-y-4 mt-2">
          {scorers.map((scorer, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <img
                src={scorer.image}
                alt={scorer.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex gap-4 pr-4">
                <div className="w-[40px] text-center text-black dark:text-white">{scorer.matchesPlayed}</div>
                <div className="w-[40px] text-center text-black dark:text-white">{scorer.goals}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopScorers;
