import React from "react";

const PremiumPlanCard: React.FC = () => {
  return (
    <div className="w-full text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-semibold uppercase mb-3">PLAN PREMIUM</h2>
      <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-[#ccc] dark:bg-[#1B1D20] dark:border-[#333] relative overflow-hidden">
        {/* Badge de descuento */}
        <div className="absolute -right-12 top-6 bg-purple-600 text-white py-1 px-12 transform rotate-45 text-sm font-bold">
          20% OFF
        </div>
        
        <div className="flex flex-col">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold mb-2">Mejora tu experiencia</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Accede a todas las funciones exclusivas y contenido premium
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-center items-end mb-4">
              <span className="text-3xl font-bold">€9.99</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">/mes</span>
            </div>
            
            <div className="flex justify-center">
              <span className="text-sm line-through text-gray-500">€12.99</span>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-sm">Acceso a todo el contenido</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-sm">Sin publicidad</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-sm">Soporte prioritario</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-sm">Funciones exclusivas</span>
            </div>
          </div>
          
          <button className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 px-4 rounded-md transition duration-200">
            Obtener Premium
          </button>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Cancela en cualquier momento
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlanCard;