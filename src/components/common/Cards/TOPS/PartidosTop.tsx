import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const partidos = [
  {
    id: 1,
    local: {
      nombre: "REAL MADRID",
      logo: "https://static0.givemesportimages.com/wordpress/wp-content/uploads/2024/08/real-madrid-logo-resized.png",
    },
    visitante: {
      nombre: "MANCHESTER CITY",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
    },
    fecha: "31/03/2025",
    cuotas: ["2.15", "4.4", "3.52"],
  },
  {
    id: 2,
    local: {
      nombre: "BAYERN MUNICH",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/250px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    },
    visitante: {
      nombre: "ARSENAL",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    },
    fecha: "01/04/2025",
    cuotas: ["1.90", "3.80", "4.20"],
  },
  {
    id: 3,
    local: {
      nombre: "INTER DE MILÁN",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/250px-FC_Internazionale_Milano_2021.svg.png",
    },
    visitante: {
      nombre: "AC MILAN",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    },
    fecha: "02/04/2025",
    cuotas: ["2.00", "3.60", "3.90"],
  },
];

const PartidosTop: React.FC = () => {
  const [indice, setIndice] = useState(0);

  const handlePrev = () => {
    setIndice((prev) => (prev > 0 ? prev - 1 : partidos.length - 1));
  };

  const handleNext = () => {
    setIndice((prev) => (prev < partidos.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndice((prev) => (prev < partidos.length - 1 ? prev + 1 : 0));
    }, 6000); // Cambia cada 6 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[16px] md:text-[18px] font-bold uppercase mb-2 md:mb-4 px-2 md:px-0">
        PARTIDOS TOP DE LA SEMANA
      </h2>

      <div className="relative bg-white p-3 md:p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333]">
        <button
          onClick={handlePrev}
          className="absolute left-1 md:left-5 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-lg md:text-xl opacity-70 hover:opacity-100 z-10"
        >
          <FaChevronLeft />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${indice * 100}%)`, // Desliza el contenido hacia la izquierda
            }}
          >
            {partidos.map((partido, index) => (
              <div key={index} className="flex flex-row justify-between items-center px-2 md:px-8 py-4 w-full min-w-full shrink-0">
                {/* Equipo Local */}
                <div className="flex flex-col items-center gap-1 md:gap-4 text-center w-1/3 md:w-[250px]">
                  <img
                    src={partido.local.logo}
                    alt={`${partido.local.nombre} Logo`}
                    className="w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] object-contain"
                  />
                  <h3 className="text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] uppercase mt-1 truncate w-full">{partido.local.nombre}</h3>
                </div>

                {/* VS y Cuotas */}
                <div className="flex flex-col items-center gap-1 md:gap-4 w-1/3">
                  <div className="text-black dark:text-white text-[11px] sm:text-[12px] md:text-[16px] lg:text-[20px] font-semibold">
                    {partido.fecha}
                  </div>

                  {/* Etiquetas 1 X 2 */}
                  <div className="flex justify-center gap-1 md:gap-2 text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] text-black dark:text-white font-semibold mt-1 md:mt-2">
                    <div className="w-[30px] sm:w-[40px] md:w-[50px] lg:w-[60px] text-center">1</div>
                    <div className="w-[30px] sm:w-[40px] md:w-[50px] lg:w-[60px] text-center">X</div>
                    <div className="w-[30px] sm:w-[40px] md:w-[50px] lg:w-[60px] text-center">2</div>
                  </div>

                  {/* Valores de cuotas */}
                  <div className="flex gap-1 md:gap-2">
                    {partido.cuotas.map((cuota, idx) => (
                      <div
                        key={idx}
                        className="bg-[#8400FF] text-white px-1 md:px-3 py-1 text-center rounded-sm text-[8px] sm:text-[10px] md:text-[14px] lg:text-[16px] w-[30px] sm:w-[40px] md:w-[50px] lg:w-[60px]"
                      >
                        {cuota}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipo Visitante */}
                <div className="flex flex-col items-center gap-1 md:gap-4 text-center w-1/3 md:w-[250px]">
                  <img
                    src={partido.visitante.logo}
                    alt={`${partido.visitante.nombre} Logo`}
                    className="w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] object-contain"
                  />
                  <h3 className="text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] uppercase mt-1 truncate w-full">{partido.visitante.nombre}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-1 md:right-5 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-lg md:text-xl opacity-70 hover:opacity-100 z-10"
        >
          <FaChevronRight />
        </button>
        
        {/* Pagination indicators */}
        <div className="flex justify-center mt-2 md:mt-4 gap-1 md:gap-2">
          {partidos.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 md:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === indice ? "w-4 md:w-6 bg-[#8400FF]" : "w-1 md:w-2 bg-gray-300 dark:bg-gray-600"
              }`}
              onClick={() => setIndice(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartidosTop;