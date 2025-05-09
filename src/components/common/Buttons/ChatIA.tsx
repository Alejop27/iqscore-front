import React, { useState } from "react";
import ButtonRedirect from "./ButtonRedirect";

const ChatIA: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div
      className="fixed z-10 flex items-end"
      style={{
        bottom: "5%",
        right: isOpen ? 0 : "0",
        transition: "right 0.3s",
      }}
    >
      {/* Botón de abrir/cerrar */}
      <div
        className={`w-[60px] h-[70px] bg-[#8400FF] flex flex-col items-center justify-center text-[18px] tracking-[8px] cursor-pointer rounded-l-[10px] shadow-[ -3px_0_8px_rgba(0,0,0,0.2)] transition-all duration-300 z-[999] font-bold font-sans hover:bg-[rgb(82,0,159)]`}
        onClick={toggleChat}
        style={{
          borderTopRightRadius: isOpen ? 0 : "10px",
          borderBottomRightRadius: isOpen ? 0 : "10px",
        }}
      >
        <img
          src="./images/chatbot.png"
          alt="Chat Icon"
          className="w-[40px] h-[40px]"
        />
      </div>

      {/* Contenedor del chat */}
      {isOpen && (
        <div
          className="w-[450px] bg-[#CFCFCF] dark:bg-[#181818] shadow-lg flex flex-col rounded-bl-[10px] overflow-hidden z-[998] border border-[#878787] dark:border-gray-700"
          style={{
            height: "auto",
            maxHeight: "550px",
            transition: "transform 0.3s",
          }}
        >
          {/* Botones de redirección */}
          <div className="flex flex-col gap-2 p-4 border-t border-gray-300">
            <ButtonRedirect to="https://drive.google.com/drive/folders/1STriAXHdyfbfyPmL0DT4bn7S63WSMmVm?usp=sharing "  hoverClass="bg-[#6d00cc]">Drive</ButtonRedirect>
            <ButtonRedirect to="http://98.81.211.250:8501/" hoverClass="bg-[#6d00cc]">Chat IA 1</ButtonRedirect>
            <ButtonRedirect to="http://54.163.197.215:8501"  hoverClass="bg-[#6d00cc]">Chat IA 2</ButtonRedirect>
          </div>
          <div>

          </div>
        </div>
      )}
    </div>
  );
};//bg-[#ff6347]

export default ChatIA;
