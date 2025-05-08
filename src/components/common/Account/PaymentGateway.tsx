import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaLock,
  FaShieldAlt,
  FaUniversity,
  FaInfoCircle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importar useNavigate


const PaymentGateway = () => {
  const navigate = useNavigate(); // Inicializar useNavigate

  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleMercadoPagoPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const userId = new URLSearchParams(window.location.search).get('userId') || 'anonymous';
  
      const response = await fetch('http://localhost:3001/api/MercadoPago/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email: userEmail,
        }),
      });
  
      const data = await response.json();
  
      if (data.init_point) {
        // Abrir MercadoPago en una nueva pestaña
        const mpWindow = window.open(data.init_point, '_blank');
  
        if (mpWindow) {
          // Verificar periódicamente si la ventana se ha cerrado
          const checkWindowClosed = setInterval(() => {
            if (mpWindow.closed) {
              clearInterval(checkWindowClosed);
              setIsSuccess(true);
              setLoading(false);
              navigate("/"); // Redirigir al usuario a la página de inicio
            }
          }, 500);
        } else {
          throw new Error('No se pudo abrir la ventana de pago. Por favor, desbloquea los pop-ups e intenta nuevamente.');
        }
      } else {
        throw new Error('No se pudo inicializar el pago');
      }
    } catch (err) {
      console.error('Error al procesar el pago:', err);
      setError('Hubo un problema al inicializar el pago. Por favor intenta nuevamente.');
      setLoading(false);
    }
  };
  

  if (isSuccess) {
    return (
      <div className="min-h-screen flex bg-[#1B1D20] relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#354AED]/10 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#354AED]/10 transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-[#354AED]/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 border-2 border-[#354AED]/10 m-10 rounded-xl"></div>
          </div>
        </div>

        {/* Efectos de luz */}
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-[#354AED] opacity-20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#8400FF] opacity-20 rounded-full filter blur-3xl"></div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="m-auto w-full max-w-md bg-[#1B1D20]/90 backdrop-blur-xl p-8 rounded-2xl border border-[#354AED]/30 shadow-xl shadow-[#8400FF]/20 text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-24 bg-[#354AED] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#8400FF]/20"
          >
            <FaCheck className="text-white text-4xl" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">
            ¡Pago Exitoso!
          </h2>
          <p className="text-white/70 text-lg mb-6">
            Tu pago ha sido procesado correctamente.
          </p>
          <div className="w-full h-2 bg-[#1B1D20] rounded-full overflow-hidden mb-6">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className="h-full bg-gradient-to-r from-[#354AED] to-[#8400FF]" 
            />
          </div>
          <p className="text-white/60">
            Serás redirigido en unos momentos...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#1B1D20] relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#1B1D20]">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#354AED]/10 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#354AED]/10 transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-[#354AED]/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 border-2 border-[#354AED]/10 m-10 rounded-xl"></div>
          </div>
        </div>

        {/* Efectos de luz */}
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-[#354AED] opacity-20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#8400FF] opacity-20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Panel izquierdo - Información de servicio */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          {/* Logo y título */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-[#354AED] flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="currentColor">
                <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M16.9,8.57l-2.3,2.32c-0.07,0.07-0.13,0.16-0.16,0.26l-0.93,2.98c-0.21,0.67-1.13,0.71-1.42,0.07l-0.82-1.84c-0.07-0.16-0.2-0.29-0.36-0.36l-1.84-0.82c-0.64-0.29-0.6-1.2,0.07-1.42l2.98-0.93c0.1-0.03,0.19-0.09,0.26-0.16l2.32-2.3C15.31,6.34,18.02,6.58,16.9,8.57z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">IQScore</h1>
            <p className="text-xl text-white/70">Pasarela de Pago Premium</p>
          </div>

          {/* Beneficios Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1B1D20]/80 backdrop-blur-lg p-5 rounded-xl border border-[#354AED]/20 hover:border-[#354AED]/40 transition-all">
              <div className="w-10 h-10 bg-[#8400FF] rounded-lg flex items-center justify-center mb-3">
                <FaShieldAlt className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white text-lg font-medium mb-1">Pronósticos Premium</h3>
              <p className="text-white/60 text-sm">Acceso a predicciones exclusivas con mayor precisión</p>
            </div>
            
            <div className="bg-[#1B1D20]/80 backdrop-blur-lg p-5 rounded-xl border border-[#354AED]/20 hover:border-[#354AED]/40 transition-all">
              <div className="w-10 h-10 bg-[#8400FF] rounded-lg flex items-center justify-center mb-3">
                <FaUniversity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white text-lg font-medium mb-1">Datos Históricos</h3>
              <p className="text-white/60 text-sm">Análisis completo de datos históricos sin restricciones</p>
            </div>
          </div>

          {/* Testimonios */}
          <div className="bg-[#1B1D20]/80 backdrop-blur-lg p-5 rounded-xl border border-[#354AED]/30 hover:border-[#354AED]/50 transition-all">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/70 text-sm">4.9/5 basado en más de 10,000 usuarios</span>
            </div>
            <p className="text-white/80 text-sm italic">"IQScore ha transformado mi forma de analizar los partidos de fútbol. Las predicciones son increíblemente precisas."</p>
          </div>
        </motion.div>
      </div>

      {/* Panel derecho - Formulario de pago */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#1B1D20]/80 backdrop-blur-xl p-8 rounded-2xl border border-[#354AED]/30 shadow-xl shadow-[#8400FF]/5 relative overflow-hidden">
            {/* Efectos decorativos */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#354AED] opacity-10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#8400FF] opacity-10 rounded-full filter blur-3xl"></div>
            
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
              <FaLock className="mr-2 text-[#8400FF]" /> Pago Seguro
            </h2>
            <p className="text-white/60 mb-6">Completa la información para proceder con el pago.</p>
            
            {/* MercadoPago Form */}
            <form onSubmit={handleMercadoPagoPayment} className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Correo Electrónico</label>
                <input
                  name="email"
                  type="email"
                  value={userEmail}
                  onChange={handleEmailChange}
                  placeholder="tu@email.com"
                  className="w-full bg-[#1B1D20] border border-[#354AED]/40 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8400FF] transition-all"
                  required
                />
              </div>
              
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
                    
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#354AED] to-[#8400FF] text-white py-4 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-[#8400FF]/20 focus:outline-none focus:ring-2 focus:ring-[#8400FF]/50 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <FaLock className="text-white" />
                      <span>Pagar $10</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            {/* MercadoPago logo */}


            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center p-2 bg-white/5 rounded-lg">
                <FaShieldAlt className="text-[#8400FF] mr-2" />
                <span className="text-xs text-white/60">Pago 100% seguro y encriptado</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-[#1B1D20]/60 rounded-xl border border-[#354AED]/20">
            <div className="flex items-center mb-3">
              <FaInfoCircle className="text-[#8400FF] mr-2" />
              <h3 className="text-white font-medium">Plan Premium Anual</h3>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60">Total a pagar:</span>
              <span className="text-xl font-bold text-white">$2.000</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Overlay de carga */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#8400FF] mx-auto mb-4"></div>
            <h3 className="text-white text-xl font-medium">Procesando pago...</h3>
            <p className="text-white/70 mt-2">Por favor no cierre esta ventana hasta completar el pago</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;