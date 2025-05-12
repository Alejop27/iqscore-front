import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Definición de tipos
interface Author {
  name: string;
  profile_url: string;
}

interface Noticia {
  title: string;
  link: string;
  authors: Author[];
  publication_date_iso: string;
  image_url: string;
}

interface ApiResponse {
  scraped_at: string;
  articles: Noticia[];
}

const NoticiasRelevo = () => {
  const [indice, setIndice] = useState<number>(0);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch('https://scrapnew-production.up.railway.app/raspar-noticias-relevo');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        setNoticias(data.articles);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar las noticias';
        setError(errorMessage);
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  const handlePrev = () => {
    setIndice((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNext = () => {
    setIndice((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
        <h2 className="text-[16px] md:text-[18px] font-bold uppercase mb-2 md:mb-4 px-2 md:px-0">
          ÚLTIMAS NOTICIAS
        </h2>
        <div className="bg-white dark:bg-[#1B1D20] p-8 rounded-lg text-center">
          Cargando noticias...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
        <h2 className="text-[16px] md:text-[18px] font-bold uppercase mb-2 md:mb-4 px-2 md:px-0">
          ÚLTIMAS NOTICIAS
        </h2>
        <div className="bg-white dark:bg-[#1B1D20] p-8 rounded-lg text-center text-red-500">
          Error al cargar las noticias: {error}
        </div>
      </div>
    );
  }

  if (noticias.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
        <h2 className="text-[16px] md:text-[18px] font-bold uppercase mb-2 md:mb-4 px-2 md:px-0">
          ÚLTIMAS NOTICIAS
        </h2>
        <div className="bg-white dark:bg-[#1B1D20] p-8 rounded-lg text-center">
          No se encontraron noticias disponibles
        </div>
      </div>
    );
  }

  const noticiasCarousel = noticias.slice(0, 3);
  const noticiasListado = noticias.slice(3);

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[16px] md:text-[18px] font-bold uppercase mb-2 md:mb-4 px-2 md:px-0">
        ÚLTIMAS NOTICIAS
      </h2>

      {/* Carrusel con las 3 primeras noticias */}
      <div className="relative bg-white p-3 md:p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333] mb-8">
        <button
          onClick={handlePrev}
          className="absolute left-1 md:left-5 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-lg md:text-xl opacity-70 hover:opacity-100 z-10"
        >
          <FaChevronLeft />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${indice * 100}%)` }}
          >
            {noticiasCarousel.map((noticia, index) => (
              <div
                key={index}
                className="w-full min-w-full shrink-0"
              >
                {/* Versión móvil: Horizontal layout con imagen a la izquierda */}
                <div className="md:hidden flex flex-row h-auto">
                  {/* Imagen a la izquierda en móvil */}
                  <div className="w-1/2 h-auto">
                    <img
                      src={noticia.image_url}
                      alt={noticia.title}
                      className="w-full h-full object-cover rounded-l-lg"
                      onError={(e) => { e.currentTarget.src = '/placeholder-news.jpg'; }}
                    />
                  </div>

                  {/* Contenido a la derecha en móvil */}
                  <div className="w-1/2 p-2 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[14px] font-bold mb-1 line-clamp-3">{noticia.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-1">
                        {noticia.authors.slice(0, 1).map((author: Author, i: number) => (
                          <a 
                            key={i} 
                            href={author.profile_url} 
                            className="text-[10px] text-[#8400FF] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {author.name}
                          </a>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        {formatDate(noticia.publication_date_iso).split(',')[0]}
                      </p>
                    </div>
                    
                    <a
                      href={noticia.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 self-start bg-[#8400FF] hover:bg-[#6a00cc] text-white px-2 py-1 rounded-md text-[11px] transition-colors"
                    >
                      Leer más
                    </a>
                  </div>
                </div>

                {/* Versión desktop: Vertical layout */}
                <div className="hidden md:flex md:flex-col h-[500px]">
                  {/* Imagen de la noticia */}
                  <div className="h-[60%] overflow-hidden">
                    <img
                      src={noticia.image_url}
                      alt={noticia.title}
                      className="w-full h-full object-cover rounded-t-lg"
                      onError={(e) => { e.currentTarget.src = '/placeholder-news.jpg'; }}
                    />
                  </div>

                  {/* Contenido de la noticia */}
                  <div className="h-[40%] p-4 flex flex-col justify-between overflow-hidden">
                    <div>
                      <h3 className="text-[20px] font-bold mb-2 line-clamp-2">{noticia.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {noticia.authors.map((author: Author, i: number) => (
                          <a 
                            key={i} 
                            href={author.profile_url} 
                            className="text-[13px] text-[#8400FF] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {author.name}
                          </a>
                        ))}
                      </div>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400">
                        Publicado: {formatDate(noticia.publication_date_iso)}
                      </p>
                    </div>
                    
                    <a
                      href={noticia.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 self-start bg-[#8400FF] hover:bg-[#6a00cc] text-white px-4 py-2 rounded-md text-[14px] transition-colors"
                    >
                      Leer noticia completa
                    </a>
                  </div>
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

        <div className="flex justify-center mt-4 gap-1 md:gap-2">
          {noticiasCarousel.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === indice ? "bg-[#8400FF]" : "bg-gray-300 dark:bg-gray-600"
              }`}
              onClick={() => setIndice(idx)}
            />
          ))}
        </div>
      </div>

      {/* Listado de las siguientes noticias */}
      {noticiasListado.length > 0 && (
        <div className="bg-white dark:bg-[#1B1D20] p-4 md:p-6 rounded-lg shadow-lg border border-[#ccc] dark:border-[#333]">
          <h3 className="text-[16px] md:text-[18px] font-bold mb-4">Más noticias</h3>
          <div className="grid gap-4">
            {noticiasListado.map((noticia, index) => (
              <div key={index} className="flex flex-row gap-3 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                {/* Imagen a la izquierda tanto en móvil como en desktop */}
                <div className="w-1/3 md:w-1/4">
                  <img
                    src={noticia.image_url}
                    alt={noticia.title}
                    className="w-full h-20 md:h-32 object-cover rounded-lg"
                    onError={(e) => { e.currentTarget.src = '/placeholder-news.jpg'; }}
                  />
                </div>
                {/* Contenido a la derecha tanto en móvil como en desktop */}
                <div className="w-2/3 md:w-3/4">
                  <h4 className="text-[14px] md:text-[16px] font-bold mb-1 line-clamp-2">{noticia.title}</h4>
                  <div className="flex flex-wrap gap-1 md:gap-2 mb-1">
                    {noticia.authors.slice(0, 1).map((author: Author, i: number) => (
                      <a 
                        key={i} 
                        href={author.profile_url} 
                        className="text-[10px] md:text-[11px] text-[#8400FF] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {author.name}
                      </a>
                    ))}
                  </div>
                  <p className="text-[10px] md:text-[12px] text-gray-500 dark:text-gray-400 mb-1 md:mb-2">
                    {formatDate(noticia.publication_date_iso).split(',')[0]}
                  </p>
                  <a
                    href={noticia.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] md:text-[14px] text-[#8400FF] hover:underline"
                  >
                    Leer más →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticiasRelevo;