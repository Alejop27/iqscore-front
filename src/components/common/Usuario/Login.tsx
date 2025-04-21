import React from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Panel Izquierdo */}
      <div className="w-1/2 bg-[#1f1f22] text-white flex flex-col justify-between p-10">
        <div>
          <button 
            onClick={() => navigate("/registro")} 
            className="bg-[#0078D7] hover:bg-[#0064ba] text-white font-semibold px-4 py-2 rounded-md transition"
          >
            Registrarse
          </button>
        </div>
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-3xl font-bold mb-4">Es tu momento de ganar</h1>
          <p className="font-mono text-sm">
            Aprovecha el poder de la Big Data y el análisis predictivo para
            mejorar tu experiencia en fútbol. ¡Haz tus apuestas más
            inteligentes!
          </p>
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="w-1/2 bg-[#dadadb] flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#1f1f22] mb-4">
            ¡Bienvenido a IQScore!
          </h2>
          <p className="text-center text-sm text-gray-700 mb-8">
            La plataforma líder en análisis predictivo de fútbol. <br />
            ¡Únete para empezar a ganar con Big Data!
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm mb-1 text-[#1f1f22]">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0078D7] bg-white text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-[#1f1f22]">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0078D7] bg-white text-gray-800"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="recordar"
                className="accent-[#0078D7]"
              />
              <label htmlFor="recordar" className="text-sm text-[#1f1f22]">
                Recordar Usuario
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0078D7] hover:bg-[#0064ba] text-white py-2 rounded-md font-semibold transition"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;