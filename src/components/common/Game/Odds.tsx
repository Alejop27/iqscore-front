import React from "react";

const MatchEvents: React.FC = () => {
  const events = [
    {
      id: 1,
      type: "goal",
      team: "Local",
      minute: 12,
      player: "Juan Pérez",
      icon: "⚽️",
    },
    {
      id: 2,
      type: "yellow_card",
      team: "Visitante",
      minute: 28,
      player: "Carlos Gómez",
      icon: "🟨",
    },
    {
      id: 3,
      type: "substitution",
      team: "Local",
      minute: 55,
      playerOut: "Andrés Ríos",
      playerIn: "Luis Díaz",
      icon: "🔁",
    },
    {
      id: 4,
      type: "red_card",
      team: "Visitante",
      minute: 78,
      player: "Miguel Torres",
      icon: "🟥",
    },
  ];

  return (
    <div className="max-w-[1240px] mx-auto font-nunito text-black dark:text-white">
      <h3 className="text-[18px] font-bold uppercase mb-4">Acontecimientos del partido</h3>
      <div className="relative bg-white dark:bg-[#1B1D20] p-6 rounded-lg shadow-lg border border-[#ccc] dark:border-[#333]">
        {events.map((event) => (
          <div key={event.id} className="flex items-center mb-4 last:mb-0">
            <div className="text-2xl mr-4">{event.icon}</div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {event.minute}' - {event.team}
              </span>
              <span className="text-sm">
                {event.type === "substitution"
                  ? `Cambio: Sale ${event.playerOut}, entra ${event.playerIn}`
                  : `${event.type === "goal" ? "Gol de" : event.type === "yellow_card" ? "Tarjeta amarilla para" : "Tarjeta roja para"} ${event.player}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchEvents;
