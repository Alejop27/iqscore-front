// Al inicio, no hay cambios
import React, { useState, useEffect } from "react";
import { FaUser, FaCog, FaSearch } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  });

  useEffect(() => {
    const html = document.querySelector("html");
    theme === "dark" ? html?.classList.add("dark") : html?.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#2c3ec4] dark:bg-[#1B1D20] w-full z-50">
      <nav className="font-sans font-semibold text-white px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between h-20 max-w-[1280px] w-full mx-auto">
        
        {/* Logo + Search */}
        <div className="flex items-center gap-4 sm:gap-6 w-full max-w-[600px]">
          <img
            src="../../../../public/images/LogoIQ.png" // Cambia esto por la ruta real de tu logo
            alt="IQSCORE Logo"
            className="h-10 w-auto object-contain"
          />

          <div className="relative flex-grow">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-[#EAEAEA]">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Busca en IQSCORE"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-black dark:text-white bg-[#f3f4f6] dark:bg-[#20262A] py-2 pl-10 pr-4 rounded-md shadow-sm border border-gray-300 dark:border-none outline-none placeholder-gray-500 dark:placeholder-[#EAEAEA] transition focus:ring-2 focus:ring-[#2c3ec4] dark:focus:ring-[#4c51bf] text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <a href="Leagues" className="text-white hover:bg-gray-400 dark:hover:bg-[#2a2a2a] px-2 py-1 rounded-md transition duration-200 ease-in-out hover:shadow-sm">
            LIGAS
          </a>
          <a href="Teams" className="text-white hover:bg-gray-400 dark:hover:bg-[#2a2a2a] px-2 py-1 rounded-md transition duration-200 ease-in-out hover:shadow-sm">
            EQUIPOS
          </a>
          <a href="#" className="text-white hover:bg-gray-400 dark:hover:bg-[#2a2a2a] px-2 py-1 rounded-md transition duration-200 ease-in-out hover:shadow-sm">
            FAVORITOS
          </a>

          <button className="bg-[#EAEAEA] py-2 px-4 rounded-md flex items-center gap-2 text-[#1D1B20] font-bold hover:bg-[#d6d6d6] transition text-sm sm:text-base">
            <FaUser /> <span>INICIAR</span>
          </button>

          {/* Cog and Theme Menu */}
          <div className="relative">
            <button
              className="text-white hover:text-gray-300 transition text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaCog />
            </button>
            {menuOpen && (
              <div className="absolute left-[-110px] mt-2 bg-white dark:bg-[#2b2b2b] p-4 rounded-lg shadow-lg w-48 z-20">
                <p className="font-semibold text-gray-700 dark:text-gray-200">Opciones de Modo</p>
                <button
                  className="mt-2 w-full py-2 px-4 bg-[#4a5568] text-white rounded-md hover:bg-[#1D1B20] transition"
                  onClick={handleThemeChange}
                >
                  Claro/Oscuro
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
