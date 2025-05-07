import React from "react";

const ProfileCard: React.FC = () => {
  return (
    <div className="w-full text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-semibold uppercase mb-3">CUENTA</h2>
      <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333]">
        <p className="text-sm text-black dark:text-white mb-4">Imagen de perfil</p>

        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-gray-500">
          <img
            src="https://flagcdn.com/w320/fr.png"
            alt="Imagen de perfil"
            className="w-full h-full object-cover"
          />
        </div>

        <button className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-4 rounded-md transition duration-200">
          Cambiar
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;