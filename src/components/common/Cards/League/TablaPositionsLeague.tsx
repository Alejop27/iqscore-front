import React from "react";

const TablePositionsLeague: React.FC = () => {
  const tablaData = [
    { pos: 1, equipo: "America de Cali", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 2, equipo: "Nacional", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 3, equipo: "Junior", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 4, equipo: "Bucaramanga", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 5, equipo: "Millonarios", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 6, equipo: "Santa Fe", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 7, equipo: "America de Cali", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 8, equipo: "Nacional", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 9, equipo: "Junior", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 10, equipo: "Bucaramanga", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 11, equipo: "Millonarios", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 12, equipo: "Santa Fe", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 13, equipo: "America de Cali", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 14, equipo: "Nacional", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 15, equipo: "Junior", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 16, equipo: "Bucaramanga", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 17, equipo: "Millonarios", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 18, equipo: "Santa Fe", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 19, equipo: "Millonarios", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
    { pos: 20, equipo: "Santa Fe", pj: 12, g: 12, e: 12, p: 12, gfgc: "12:15", pts: 12 },
  ];

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h3 className="font-['Nunito_Sans'] font-bold text-lg text-black dark:text-white uppercase mb-4">
        Tabla de posiciones
      </h3>

      <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_1.5fr_1fr] items-center py-3 px-6 bg-[#8400FF] text-white font-semibold text-sm rounded-t-lg">
        <div>#</div>
        <div>Equipo</div>
        <div className="text-center">PJ</div>
        <div className="text-center">G</div>
        <div className="text-center">E</div>
        <div className="text-center">P</div>
        <div className="text-center">GF:GC</div>
        <div className="text-center">PTS</div>
      </div>

      {/* Card con los datos */}
      <div className="relative bg-white dark:bg-[#1B1D20] p-6 pt-0 rounded-b-lg shadow-lg border border-[#ccc] dark:border-[#333]">
        {tablaData.map((team) => (
          <div
            key={team.pos}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_1.5fr_1fr] items-center py-3 px-6 border-b border-[#222] text-sm last:border-b-0"
          >
            <div>
              <div className="font-medium text-[#aaa]">{team.pos}</div>
            </div>
            <div className="mb-2 text-black dark:text-white">{team.equipo}</div>
            <div className="text-center mb-2 text-black dark:text-white">{team.pj}</div>
            <div className="text-center mb-2 text-black dark:text-white">{team.g}</div>
            <div className="text-center mb-2 text-black dark:text-white">{team.e}</div>
            <div className="text-center mb-2 text-black dark:text-white">{team.p}</div>
            <div className="text-center mb-2 text-black dark:text-white">{team.gfgc}</div>
            <div className="text-center mb-2 text-black dark:text-white">{team.pts}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablePositionsLeague;