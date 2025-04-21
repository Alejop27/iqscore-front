import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RegistroSteps: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderPaso = () => {
    switch (step) {
      case 1:
        return <PasoUno />;
      case 2:
        return <PasoDos />;
      case 3:
        return <PasoTres />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel Izquierdo */}
      <div className="w-1/2 bg-[#1f1f22] text-white flex flex-col justify-between p-10">
        <div>
          <button className="bg-[#0078D7] text-white px-4 py-2 rounded-md font-semibold">
            Iniciar sesión
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
      <div className="w-1/2 bg-[#dadadb] p-10">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#1f1f22] mb-2">
            ¡Bienvenido a IQScore!
          </h2>
          <p className="text-center text-sm text-gray-700 mb-6">
            La plataforma líder en análisis predictivo de fútbol. <br />
            ¡Únete para empezar a ganar con Big Data!
          </p>

          {/* Navegación por pasos */}
          <div className="flex justify-center space-x-4 mb-6">
            {["Información", "Edad y Ubicación", "Equipos y ligas"].map(
              (label, index) => (
                <button
                  key={index}
                  className={`px-4 py-1 rounded-full border ${
                    step === index + 1
                      ? "bg-[#0078D7] text-white"
                      : "border-[#0078D7] text-[#0078D7]"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>

          {/* Formulario dinámico con animación */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {renderPaso()}
            </motion.div>
          </AnimatePresence>

          {/* Botones de navegación */}
          <div className="flex justify-between mt-10">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                Regresar
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={nextStep}
                className="bg-[#0078D7] text-white px-4 py-2 rounded-md ml-auto"
              >
                Siguiente
              </button>
            ) : (
              <button className="bg-[#0078D7] text-white px-4 py-2 rounded-md ml-auto">
                Terminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PasoUno() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[#1f1f22]">Paso 1: Información Básica</p>
      <input
        className="w-full border-b border-black bg-transparent p-2"
        placeholder="Nombre de usuario"
      />
      <input
        className="w-full border-b border-black bg-transparent p-2"
        placeholder="Correo Electrónico"
      />
      <input
        className="w-full border-b border-black bg-transparent p-2"
        placeholder="Contraseña"
        type="password"
      />
      <input
        className="w-full border-b border-black bg-transparent p-2"
        placeholder="Confirmar contraseña"
        type="password"
      />
      <input
        className="w-full border-b border-black bg-transparent p-2"
        placeholder="Nombres y Apellidos"
      />
    </div>
  );
}

function PasoDos() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[#1f1f22]">Paso 2: Edad y Ubicación</p>
      <input
        className="w-full border-b border-black bg-transparent p-2"
        placeholder="Edad"
      />
      <input
        className="w-full border-b border-black bg-transparent p-2"
        placeholder="Ciudad de residencia"
      />
      <input
        className="w-full border-b border-black bg-transparent p-2"
        placeholder="País"
      />
      <input
        className="w-full border-b border-black bg-transparent p-2"
        type="date"
      />
      <input
        className="w-full border-b border-black bg-transparent p-2"
        placeholder="Cédula de ciudadanía"
      />
    </div>
  );
}

function PasoTres() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[#1f1f22]">Paso 3: Equipos y Ligas</p>
      {/* Puedes personalizar esta parte con selects o checkboxes */}
      <p className="text-gray-500 italic">
        Aquí puedes elegir tus equipos y ligas favoritas...
      </p>
    </div>
  );
}


export default RegistroSteps;