import React, { useState, useEffect } from "react";
import { FaUser, FaCog, FaSearch, FaList, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // Asegúrate de que la ruta sea correcta

interface Resultado {
  resultado: string;
  [key: string]: any;
}


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, login } = useAuth();

  // Sincroniza el usuario desde localStorage al contexto si es necesario
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.email) {
            login(parsed);
          }
        } catch (e) {
          // Si hay error en el parseo, ignora
        }
      }
    }
    // Solo se ejecuta al montar o cuando user cambia a null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    }
    return "light";
  });



  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Resultado[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    theme === "dark" ? html?.classList.add("dark") : html?.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const fetchResults = async () => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }

    setLoadingSearch(true);
    try {
      const response = await fetch(`http://localhost:3001/api/buscar/${encodeURIComponent(search)}`);
      const data = await response.json();
      
      console.log("Datos recibidos:", data);
      
      setResults(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  const extractInfo = (resultText: string) => {
    const info: Record<string, string> = {};
  
    if (resultText.startsWith("Liga:")) info.tipo = "Liga";
    else if (resultText.startsWith("Equipo:")) info.tipo = "Equipo";
    else if (resultText.startsWith("Jugador:")) info.tipo = "Jugador";
  
    const nameMatch = resultText.match(/^(Liga|Equipo|Jugador): ([^,]+)/);
    if (nameMatch) info.nombre = nameMatch[2].trim();
  
    const logoMatch = resultText.match(/Logo: ([^,]+)/);
    if (logoMatch) info.logo = logoMatch[1].trim();
  
    const logoNacionalidadMatch = resultText.match(/Logo Nacionalidad: ([^,]+)/);
    if (logoNacionalidadMatch) info.logoNacionalidad = logoNacionalidadMatch[1].trim();
  
    const idJugadorMatch = resultText.match(/ID Jugador: (\d+)/);
    if (idJugadorMatch) info["ID Jugador"] = idJugadorMatch[1];
  
    const idEquipoMatch = resultText.match(/ID Equipo: (\d+)/);
    if (idEquipoMatch) info["ID Equipo"] = idEquipoMatch[1];
  
    const idLigaMatch = resultText.match(/ID Liga: (\d+)/);
    if (idLigaMatch) info["ID Liga"] = idLigaMatch[1];
  
    return info;
  };

  const handleLogout = () => {
    logout();
    navigate("/iniciar");
  };
  

  // Función para obtener el nombre del resultado
  const getName = (item: Resultado) => {
    if (!item.resultado) return "Sin nombre";
    
    const info = extractInfo(item.resultado);
    return info.nombre || "Sin nombre";
  };

  // Función para obtener la imagen del resultado
  const getImageSrc = (item: Resultado) => {
    if (!item.resultado) return "/images/placeholder.png";
    
    const info = extractInfo(item.resultado);
    return info.logoNacionalidad || info.logo || "/images/placeholder.png";
  };
  
  // Función para obtener el tipo de resultado
  const getType = (item: Resultado) => {
    if (!item.resultado) return "";
    
    const info = extractInfo(item.resultado);
    return info.tipo || "";
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        document.getElementById("mobileSearchInput")?.focus();
      }, 100);
    } else {
      setSearch("");
      setResults([]);
    }
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-[#2c3ec4] dark:bg-[#1B1D20] w-full z-50">
        <nav className="font-sans font-semibold text-white px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between h-20 max-w-[1280px] w-full mx-auto">
          
          {/* Logo + Search */}
          <div className="flex items-center gap-4 sm:gap-6 w-full max-w-[600px] relative">
            <a href="/">
              <img
                src="/images/LogoIQ.png"
                alt="IQSCORE Logo"
                className="h-20 w-auto object-contain"
              />
            </a>

            <div className="relative flex-grow hidden md:block">
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

              {/* Search Results for desktop */}
              {search && (
                <div className="absolute top-12 left-0 w-full bg-white dark:bg-[#20262A] border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-64 overflow-y-auto z-30">
                  {loadingSearch ? (
                    <div className="p-4 text-gray-500 text-sm">Buscando...</div>
                  ) : results.length > 0 ? (
                    results.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] cursor-pointer text-black dark:text-white text-sm"
                        onClick={() => {
                          const info = extractInfo(item.resultado);
                          setSearch("");
                          setResults([]);
                          if (info.tipo === "Equipo") {
                            navigate(`/team/${info["ID Equipo"]}`);
                          } else if (info.tipo === "Jugador") {
                            navigate(`/player/${info["ID Jugador"]}`);
                          } else if (info.tipo === "Liga") {
                            navigate(`/league/${info["ID Liga"]}`);
                          }
                        }}
                        
                      >
                        <img
                          src={getImageSrc(item)}
                          alt="Logo"
                          className="w-8 h-8 object-cover rounded-full"
                        />
                        <div>
                          <span className="font-semibold block">
                            {getName(item)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {getType(item)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500 text-sm">No se encontraron resultados.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <a href="/Leagues" className="text-white hover:bg-gray-400 dark:hover:bg-[#2a2a2a] px-2 py-1 rounded-md transition duration-200 ease-in-out hover:shadow-sm">
              LIGAS
            </a>
            <a href="/Teams" className="text-white hover:bg-gray-400 dark:hover:bg-[#2a2a2a] px-2 py-1 rounded-md transition duration-200 ease-in-out hover:shadow-sm">
              EQUIPOS
            </a>
            <a href="/favoritos" className="text-white hover:bg-gray-400 dark:hover:bg-[#2a2a2a] px-2 py-1 rounded-md transition duration-200 ease-in-out hover:shadow-sm">
              FAVORITOS
            </a>


            {/* Usuario autenticado o botón INICIAR */}
            {user ? (
              <div className="flex items-center gap-3 bg-[#EAEAEA] py-2 px-4 rounded-md text-[#1D1B20] font-bold">
                <FaUser className="text-[#8400FF]" />
                <span className="text-sm sm:text-base">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-[#8400FF] hover:text-[#1D1B20] transition-colors text-sm font-medium ml-2"
                  title="Cerrar sesión"
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Cerrar sesión</span>
                </button>
              </div>
            ) : (
              <a href="/iniciar" className="bg-[#EAEAEA] py-2 px-4 rounded-md flex items-center gap-2 text-[#1D1B20] font-bold hover:bg-[#d6d6d6] transition text-sm sm:text-base">
                <FaUser /> <span>INICIAR</span>
              </a>
            )}

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

          {/* Settings icon for mobile */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white hover:text-gray-300 transition text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaCog />
            </button>
            {menuOpen && (
              <div className="absolute right-4 mt-32 bg-white dark:bg-[#2b2b2b] p-4 rounded-lg shadow-lg w-48 z-20">
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
        </nav>
      </div>

      {/* Mobile Search Panel */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center md:hidden">
          <div className="bg-white dark:bg-[#1B1D20] w-11/12 mx-auto rounded-lg p-4">
            <div className="relative mb-4">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-[#EAEAEA]">
                <FaSearch />
              </div>
              <input
                id="mobileSearchInput"
                type="text"
                placeholder="Busca en IQSCORE"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-black dark:text-white bg-[#f3f4f6] dark:bg-[#20262A] py-3 pl-10 pr-4 rounded-md shadow-sm border border-gray-300 dark:border-none outline-none placeholder-gray-500 dark:placeholder-[#EAEAEA] transition focus:ring-2 focus:ring-[#2c3ec4] dark:focus:ring-[#4c51bf] text-base"
                autoFocus
              />
            </div>
            
            {/* Search Results for mobile */}
            <div className="max-h-64 overflow-y-auto">
              {loadingSearch ? (
                <div className="p-4 text-gray-500 text-center">Buscando...</div>
              ) : results.length > 0 ? (
                results.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] cursor-pointer text-black dark:text-white border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                    onClick={() => {
                      const info = extractInfo(item.resultado);
                      setSearch("");
                      setResults([]);
                      setSearchOpen(false);
                      if (info.tipo === "Equipo") {
                        navigate(`/team/${info["ID Equipo"]}`);
                      } else if (info.tipo === "Jugador") {
                        navigate(`/player/${info["ID Jugador"]}`);
                      } else if (info.tipo === "Liga") {
                        navigate(`/league/${info["ID Liga"]}`);
                      }
                    }}
                    
                  >
                    <img
                      src={getImageSrc(item)}
                      alt="Logo"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div>
                      <span className="font-semibold block">
                        {getName(item)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getType(item)}
                      </span>
                    </div>
                  </div>
                ))
              ) : search.trim() !== "" ? (
                <div className="p-4 text-gray-500 text-center">No se encontraron resultados.</div>
              ) : null}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                onClick={toggleSearch}
                className="bg-[#2c3ec4] dark:bg-[#4c51bf] text-white px-4 py-2 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#2c3ec4] dark:bg-[#1B1D20] text-white z-50 shadow-lg">
        <div className="grid grid-cols-3 h-16">
          <a href="/Leagues" className="flex flex-col items-center justify-center">
            <FaList className="text-xl" />
            <span className="text-xs mt-1">Ligas</span>
          </a>
          
          <button onClick={toggleSearch} className="flex flex-col items-center justify-center">
            <FaSearch className="text-xl" />
            <span className="text-xs mt-1">Buscar</span>
          </button>
          
          {user ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center"
              title="Cerrar sesión"
            >
              <FaUser className="text-xl" />
              <span className="text-xs mt-1">{user.email.split("@")[0]}</span>
              <span className="text-[10px] text-[#8400FF]">Salir</span>
            </button>
          ) : (
            <a href="/cuenta" className="flex flex-col items-center justify-center">
              <FaUser className="text-xl" />
              <span className="text-xs mt-1">Perfil</span>
            </a>
          )}
        </div>
      </div>
      
      {/* Add padding to the bottom on mobile to prevent content from being hidden behind the bottom nav */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default Navbar;
