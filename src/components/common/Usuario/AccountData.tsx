import React from "react";

const AccountData: React.FC = () => {
  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-semibold uppercase mb-3">DATOS DE LA CUENTA</h2>
      <div className="bg-white dark:bg-[#1B1D20] p-6 rounded-lg shadow-lg border border-[#ccc] dark:border-[#333]">
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-sm mb-1">Nombre de usuario:</span>
            <span className="text-sm text-gray-500 dark:text-gray-400"></span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm mb-1">Correo Electrónico:</span>
            <span className="text-sm text-gray-500 dark:text-gray-400"></span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm mb-1">Contraseña:</span>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">••••••••</span>
              <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium py-1 px-3 rounded transition duration-200">
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountData;