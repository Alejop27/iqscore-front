import React, { useState } from "react";

interface ButtonRedirectProps {
  to: string;
  children: React.ReactNode;
  bgColor: string;
  hoverClass: string;
}

const ButtonRedirect: React.FC<ButtonRedirectProps> = ({ to, children, bgColor, hoverClass }) => (
  <a
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-full py-3 px-4 ${bgColor} text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:${hoverClass} transform hover:scale-105`}
  >
    {children}
  </a>
);

const ChatIA: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div
      className="fixed z-10 flex items-end"
      style={{
        bottom: "5%",
        right: isOpen ? 0 : "0",
        transition: "all 0.3s ease",
      }}
    >
      {/* Botón de abrir/cerrar */}
      <div
        className={`w-16 h-16 bg-[#8400FF] flex items-center justify-center cursor-pointer rounded-l-lg shadow-lg transition-all duration-300 z-50 hover:bg-[#6d00cc]`}
        onClick={toggleChat}
        style={{
          borderTopRightRadius: isOpen ? 0 : "10px",
          borderBottomRightRadius: isOpen ? 0 : "10px",
        }}
      >
        <img
          src="./images/chatbot.png"
          alt="Chat Icon"
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Contenedor del chat */}
      {isOpen && (
        <div
          className="w-80 md:w-96 bg-white dark:bg-gray-900 shadow-2xl flex flex-col rounded-l-lg overflow-hidden z-40 border border-gray-200 dark:border-gray-700"
          style={{
            height: "auto",
            maxHeight: "550px",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Encabezado */}
          <div className="bg-gradient-to-r from-[#8400FF] to-[#6d00cc] px-4 py-3">
            <h3 className="text-white font-semibold text-lg">Asistentes Virtuales</h3>
          </div>

          {/* Botones de redirección */}
          <div className="flex flex-col gap-3 p-4">
            <ButtonRedirect 
              to="https://drive.google.com/drive/folders/1STriAXHdyfbfyPmL0DT4bn7S63WSMmVm?usp=sharing" 
              bgColor="bg-[#1FA463]" 
              hoverClass="bg-[#0f8c53]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 87.3 78" fill="currentColor">
                <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3 1.4.8 2.9 1.2 4.5 1.2h50.4c1.6 0 3.1-.4 4.5-1.2 1.35-.8 2.5-1.9 3.3-3.3l3.85-6.65-73.7 0z" fill="#0066da"/>
                <path d="M45.1 13.2L41.25 6.55C40.45 5.15 39.3 4.05 37.95 3.25c-1.4-.8-2.9-1.2-4.5-1.2H18.25c-1.6 0-3.1.45-4.5 1.25-1.35.8-2.5 1.95-3.3 3.25L6.6 13.2H45.1z" fill="#00ac47"/>
                <path d="M45.1 13.2H6.6v53.65h73.7V13.2H45.1z" fill="#ffba00"/>
                <path d="M68.65 0H45.1v78h23.55c1.6 0 3.1-.4 4.5-1.2 1.35-.8 2.5-1.9 3.3-3.3l10.45-18.1V18.2L76.45 3.3C75.65 1.95 74.5.85 73.15.05c-1.4-.8-2.9-1.2-4.5-.05z" fill="#ffffff" fillOpacity=".2"/>
                <path d="M68.65 0H45.1v78h23.55c1.6 0 3.1-.4 4.5-1.2 1.35-.8 2.5-1.9 3.3-3.3l10.45-18.1V18.2L76.45 3.3C75.65 1.95 74.5.85 73.15.05c-1.4-.8-2.9-1.2-4.5-.05z" fill="#EA4335"/>
              </svg>
              Drive
            </ButtonRedirect>
            
            <ButtonRedirect 
              to="http://ia.iqscore.space:8501/" 
              bgColor="bg-[#8400FF]" 
              hoverClass="bg-[#6d00cc]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Chat IA
            </ButtonRedirect>
            
            <ButtonRedirect 
              to="http://ia.iqscore.space:8502" 
              bgColor="bg-[#6C3483]" 
              hoverClass="bg-[#5B2C6F]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              IA Predicciones
            </ButtonRedirect>
            
            <ButtonRedirect 
              to="https://t.me/IqscoreAsistenteFutbol_bot" 
              bgColor="bg-[#0088cc]" 
              hoverClass="bg-[#0077b3]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram Bot
            </ButtonRedirect>
          </div>
          
          {/* Footer */}
          <div className="mt-auto bg-gray-100 dark:bg-gray-800 p-3 text-center text-xs text-gray-500 dark:text-gray-400">
            © 2025 IQ Score - Todos los derechos reservados
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatIA;