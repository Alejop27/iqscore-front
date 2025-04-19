import React from "react";

const LeagueInfo: React.FC = () => {
  return (
    <div className="max-w-[1250px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-bold uppercase mb-4">Liga Betplay Dimayor</h2>
      <div className="bg-white dark:bg-[#111517] rounded-lg overflow-hidden text-black dark:text-white font-nunito p-6 shadow-lg border border-[#ccc] dark:bg-[#1c1f22] dark:shadow-[0_10px_20px_#111517,0_0_0px_#BEBEBE] dark:border-[#333] flex items-center gap-6">
        {/* Liga Logo */}
        <div className="w-[80px] h-[100px] flex-shrink-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BetPlay-Dimayor_logo.svg/1200px-BetPlay-Dimayor_logo.svg.png" // Asegúrate que esté en /public si usas Vite o Next.js
            alt="Liga BetPlay Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Liga Info */}
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-1">Liga apertura 2025</h3>
          <div className="flex items-center text-base text-gray-600 dark:text-gray-300">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg"
              alt="Colombia Flag"
              className="w-6 h-4 rounded-sm mr-2 object-cover"
            />
            Colombia
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueInfo;
