import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCheck,
  FaLock,
  FaShieldAlt,
  FaUniversity,
  FaInfoCircle
} from "react-icons/fa";

const PaymentGateway: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    paypalEmail: "",
    paypalAmount: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const detectCardType = (number: string): string | null => {
    const cleaned = number.replace(/\D/g, "");
    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    return null;
  };

  const handlePaymentDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    if (name === "cardExpiry") {
      formattedValue = value.replace(/[^0-9]/g, "").slice(0, 4);
      if (formattedValue.length > 2) {
        formattedValue =
          formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      }
    }

    if (name === "cardCvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setPaymentData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 2000);
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Tarjeta de Crédito/Débito",
      icon: <FaCreditCard size={24} className="text-white" />,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <FaPaypal size={24} className="text-white" />,
    },
  ];

  const cardType = detectCardType(paymentData.cardNumber);

  const renderCardIcon = () => {
    switch (cardType) {
      case "visa":
        return <FaCcVisa className="text-blue-500 text-2xl" />;
      case "mastercard":
        return <FaCcMastercard className="text-red-500 text-2xl" />;
      case "amex":
        return <FaCcAmex className="text-green-500 text-2xl" />;
      default:
        return <FaCreditCard className="text-gray-500 text-2xl" />;
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex bg-[#1B1D20] relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            {/* Líneas del campo */}
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

        {/* Pelota animada */}
        <motion.div
          className="absolute z-10"
          initial={{ x: "-10vw", y: "40vh" }}
          animate={{ 
            x: ["0vw", "60vw", "80vw", "20vw", "0vw"],
            y: ["40vh", "10vh", "50vh", "80vh", "40vh"],
            rotate: [0, 180, 360, 720, 1080]
          }}
          transition={{ 
            duration: 35, 
            ease: "linear", 
            repeat: Infinity,
          }}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-[#1B1D20]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,4c1.5,0,2.9,0.35,4.14,0.97l-2.25,2.25 C13.3,7.07,12.66,7,12,7s-1.3,0.07-1.89,0.22L7.86,4.97C9.1,4.35,10.5,4,12,4z M4.97,7.86l2.25,2.25C7.07,10.7,7,11.34,7,12 s0.07,1.3,0.22,1.89l-2.25,2.25C4.35,14.9,4,13.5,4,12C4,10.5,4.35,9.1,4.97,7.86z M12,20c-1.5,0-2.9-0.35-4.14-0.97l2.25-2.25 C10.7,16.93,11.34,17,12,17s1.3-0.07,1.89-0.22l2.25,2.25C14.9,19.65,13.5,20,12,20z M12,15c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,15,12,15z M19.03,16.14l-2.25-2.25C16.93,13.3,17,12.66,17,12s-0.07-1.3-0.22-1.89l2.25-2.25 C19.65,9.1,20,10.5,20,12C20,13.5,19.65,14.9,19.03,16.14z"/>
            </svg>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#1B1D20] relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Campo de fútbol estilizado */}
        <div className="absolute inset-0 bg-[#1B1D20]">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            {/* Líneas del campo */}
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
            
            <div className="bg-[#1B1D20]/80 backdrop-blur-lg p-5 rounded-xl border border-[#354AED]/20 hover:border-[#354AED]/40 transition-all">
              <div className="w-10 h-10 bg-[#8400FF] rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-medium mb-1">Sin Publicidad</h3>
              <p className="text-white/60 text-sm">Experiencia limpia y sin interrupciones</p>
            </div>
            
            <div className="bg-[#1B1D20]/80 backdrop-blur-lg p-5 rounded-xl border border-[#354AED]/20 hover:border-[#354AED]/40 transition-all">
              <div className="w-10 h-10 bg-[#8400FF] rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-medium mb-1">Alertas Personalizadas</h3>
              <p className="text-white/60 text-sm">Notificaciones instantáneas para eventos importantes</p>
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
            <p className="text-white/60 mb-6">Selecciona tu método de pago preferido para continuar.</p>
            
            {!selectedMethod ? (
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-5 bg-[#1B1D20] hover:bg-[#1B1D20]/80 rounded-xl border border-[#354AED]/40 hover:border-[#354AED]/70 transition-all shadow-lg shadow-[#8400FF]/5"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#354AED] rounded-lg flex items-center justify-center mr-4">
                        {method.icon}
                      </div>
                      <span className="text-md text-white font-medium">{method.name}</span>
                    </div>
                    <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                ))}

                <div className="mt-6 p-4 bg-[#1B1D20]/60 rounded-xl border border-[#354AED]/20">
                  <div className="flex items-center mb-3">
                    <FaInfoCircle className="text-[#8400FF] mr-2" />
                    <h3 className="text-white font-medium">Plan Premium Anual</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Total a pagar:</span>
                    <span className="text-xl font-bold text-white">$2.000</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-12 h-12 bg-[#354AED] rounded-full flex items-center justify-center">
                    {selectedMethod === "card" && <FaCreditCard size={24} className="text-white" />}
                    {selectedMethod === "paypal" && <FaPaypal size={24} className="text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedMethod === "card" && "Pago con Tarjeta"}
                    {selectedMethod === "paypal" && "Pago con PayPal"}
                  </h3>
                </div>
              </div>
            )}

            {selectedMethod === "card" ? (
              <form
                onSubmit={handlePaymentSubmit}
                className="space-y-4"
              >
                <div className="relative">
                  <label className="block text-sm text-white/70 mb-2">Número de Tarjeta</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentDataChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full bg-[#1B1D20] border border-[#354AED]/40 rounded-lg px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8400FF] transition-all"
                    required
                  />
                  <div className="absolute top-9 left-4">
                    {renderCardIcon()}
                  </div>
                  <div className="absolute top-9 right-4">
                    <FaLock className="text-[#354AED] opacity-60" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-white/70 mb-2">Nombre en la Tarjeta</label>
                  <input
                    type="text"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handlePaymentDataChange}
                    placeholder="Nombre y Apellido"
                    className="w-full bg-[#1B1D20] border border-[#354AED]/40 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8400FF] transition-all"
                    required
                  />
                </div>
                
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm text-white/70 mb-2">Fecha Expiración</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={paymentData.cardExpiry}
                      onChange={handlePaymentDataChange}
                      placeholder="MM/AA"
                      className="w-full bg-[#1B1D20] border border-[#354AED]/40 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8400FF] transition-all"
                      required
                    />
                  </div>
                  
                  <div className="w-1/2">
                    <label className="block text-sm text-white/70 mb-2">Código CVV</label>
                    <input
                      type="text"
                      name="cardCvv"
                      value={paymentData.cardCvv}
                      onChange={handlePaymentDataChange}
                      placeholder="CVV"
                      className="w-full bg-[#1B1D20] border border-[#354AED]/40 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8400FF] transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isProcessing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#354AED] to-[#8400FF] text-white py-4 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-[#8400FF]/20 focus:outline-none focus:ring-2 focus:ring-[#8400FF]/50 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
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
                        <span>Pagar $2.000</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="flex items-center justify-center w-10 h-6 bg-white/5 border border-white/10 rounded">
                    <FaCcVisa className="text-blue-400" />
                  </div>
                  <div className="flex items-center justify-center w-10 h-6 bg-white/5 border border-white/10 rounded">
                    <FaCcMastercard className="text-red-400" />
                  </div>
                  <div className="flex items-center justify-center w-10 h-6 bg-white/5 border border-white/10 rounded">
                    <FaCcAmex className="text-green-400" />
                  </div>
                </div>
              </form>
            ) : selectedMethod === "paypal" ? (
              <form
                onSubmit={handlePaymentSubmit}
                className="space-y-4"
              ><div className="flex justify-center p-6">
              <div className="w-28 h-28 bg-[#253b80] rounded-full flex items-center justify-center border-4 border-[#1B1D20]">
                <FaPaypal size={48} className="text-white" />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm text-white/70 mb-2">Correo Electrónico de PayPal</label>
              <input
                type="email"
                name="paypalEmail"
                value={paymentData.paypalEmail}
                onChange={handlePaymentDataChange}
                placeholder="tu@email.com"
                className="w-full bg-[#1B1D20] border border-[#354AED]/40 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8400FF] transition-all"
                required
              />
            </div>
            
            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={isProcessing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#253b80] text-white py-4 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-[#253b80]/20 focus:outline-none focus:ring-2 focus:ring-[#253b80]/50 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Conectando con PayPal...</span>
                  </>
                ) : (
                  <>
                    <FaPaypal className="text-white" />
                    <span>Continuar a PayPal</span>
                  </>
                )}
              </motion.button>
            </div>
            
            <div className="mt-4 p-4 bg-[#1B1D20]/60 rounded-xl border border-[#354AED]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Plan Premium Mensual:</span>
                <span className="text-white font-medium">$2.000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Total a pagar:</span>
                <span className="text-xl font-bold text-white">$2.000</span>
              </div>
            </div>
          </form>
        ) : null}

        {selectedMethod && (
          <div className="mt-4">
            <button
              onClick={() => setSelectedMethod(null)}
              className="text-white/60 hover:text-white text-sm flex items-center justify-center w-full transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a métodos de pago
            </button>
          </div>
        )}

        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center p-2 bg-white/5 rounded-lg">
            <FaShieldAlt className="text-[#8400FF] mr-2" />
            <span className="text-xs text-white/60">Pago 100% seguro y encriptado</span>
          </div>
        </div>
      </div>

      {/* Preguntas frecuentes o información adicional */}
      <div className="mt-6 p-4 bg-[#1B1D20]/80 backdrop-blur-lg rounded-xl border border-[#354AED]/20">
        <div className="flex items-center mb-2">
          <FaInfoCircle className="text-[#8400FF] mr-2" />
          <h3 className="text-white font-medium">Información Importante</h3>
        </div>
        <p className="text-white/60 text-sm">
          Al completar tu compra, tendrás acceso inmediato a todas las funciones premium de IQScore por 12 meses. Puedes cancelar la renovación automática en cualquier momento desde tu perfil.
        </p>
      </div>
    </motion.div>
  </div>

  {/* Pelota animada */}
  <motion.div
    className="absolute z-10 hidden lg:block"
    initial={{ x: "-10vw", y: "40vh" }}
    animate={{ 
      x: ["10vw", "60vw", "80vw", "30vw", "10vw"],
      y: ["40vh", "20vh", "60vh", "70vh", "40vh"],
      rotate: [0, 180, 360, 720, 1080]
    }}
    transition={{ 
      duration: 30, 
      ease: "linear", 
      repeat: Infinity,
    }}
  >
    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg shadow-[#354AED]/20">
      <svg className="w-10 h-10 text-[#1B1D20]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,4c1.5,0,2.9,0.35,4.14,0.97l-2.25,2.25 C13.3,7.07,12.66,7,12,7s-1.3,0.07-1.89,0.22L7.86,4.97C9.1,4.35,10.5,4,12,4z M4.97,7.86l2.25,2.25C7.07,10.7,7,11.34,7,12 s0.07,1.3,0.22,1.89l-2.25,2.25C4.35,14.9,4,13.5,4,12C4,10.5,4.35,9.1,4.97,7.86z M12,20c-1.5,0-2.9-0.35-4.14-0.97l2.25-2.25 C10.7,16.93,11.34,17,12,17s1.3-0.07,1.89-0.22l2.25,2.25C14.9,19.65,13.5,20,12,20z M12,15c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,15,12,15z M19.03,16.14l-2.25-2.25C16.93,13.3,17,12.66,17,12s-0.07-1.3-0.22-1.89l2.25-2.25 C19.65,9.1,20,10.5,20,12C20,13.5,19.65,14.9,19.03,16.14z"/>
      </svg>
    </div>
  </motion.div>
</div>
);
};

export default PaymentGateway;