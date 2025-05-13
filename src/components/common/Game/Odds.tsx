import React from "react";

interface Event {
  id?: number;
  type: string;
  team: string;
  minute: number;
  player?: string;
  playerOut?: string;
  playerIn?: string;
  assist?: string;
  icon?: string;
} 
interface Props {
  events?: Event[];  // <-- El `?` la hace opcional
}

const MatchEvents: React.FC<Props> = ({ events = [] }) => { 
  // Mapear tipos de eventos a íconos
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal':
        return '⚽️';
      case 'yellow_card':
        return '🟨';
      case 'red_card':
        return '🟥';
      case 'substitution':
        return '🔁';
      default:
        return '🔵';
    }
  };

  // Ordenar eventos por minuto
  const sortedEvents = [...events].sort((a, b) => a.minute - b.minute);

  return (
    <div className="max-w-[1240px] mx-auto font-nunito text-black dark:text-white">
      <h3 className="text-[18px] font-bold uppercase mb-4">Acontecimientos del partido</h3>
      <div className="relative bg-white dark:bg-[#1B1D20] p-6 rounded-lg shadow-lg border border-[#ccc] dark:border-[#333]">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event, index) => (
            <div key={index} className="flex items-center mb-4 last:mb-0">
              <div className="text-2xl mr-4">{getEventIcon(event.type)}</div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {event.minute}' - {event.team === 'home' ? 'Local' : 'Visitante'}
                </span>
                <span className="text-sm">
                  {event.type === 'substitution'
                    ? `Cambio: Sale ${event.playerOut}, entra ${event.playerIn}`
                    : event.type === 'goal'
                    ? `Gol de ${event.player}${event.assist ? ` (Asistencia: ${event.assist})` : ''}`
                    : event.type === 'yellow_card'
                    ? `Tarjeta amarilla para ${event.player}`
                    : event.type === 'red_card'
                    ? `Tarjeta roja para ${event.player}`
                    : `${event.player ? `${event.player} - ` : ''}${event.type}`}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No hay eventos registrados</p>
        )}
      </div>
    </div>
  );
};

export default MatchEvents;