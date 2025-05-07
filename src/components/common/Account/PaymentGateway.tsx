import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "/images/LogoIQ.png";
import {
  FaCreditCard,
  FaUniversity,
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCheck,
  FaMoneyBillWave,
  FaBuilding,
} from "react-icons/fa";

const PaymentGateway: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    pseEmail: "",
    pseAmount: "",
    psePersonType: "Natural",
    pseGateway: "PayU",
    pseBank: "",
    paypalEmail: "",
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
      id: "pse",
      name: "PSE (Pago Seguro en Línea)",
      icon: <FaUniversity size={24} className="text-white" />,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <FaPaypal size={24} className="text-white" />,
    },
  ];

  const pseBanks = [
    "Bancolombia",
    "Davivienda",
    "Banco de Bogotá",
    "Nequi",
    "BBVA",
    "Mercado Pago", // ✅ Agregado
    "Banco Agrario",
    "Banco AV Villas",
    "Banco de Occidente",
    "Banco Popular",
    "Itaú",
    "Scotiabank Colpatria",
  ];

  const ballVariants = {
    animate: {
      y: [-10, -200, -20, -50, -20],
      opacity: [1, 1, 1, 1, 0],
      transition: {
        duration: 3,
        times: [0, 0.2, 0.5, 0.8, 1],
        ease: "easeInOut",
      },
    },
  };

  const cardType = detectCardType(paymentData.cardNumber);

  const renderCardIcon = () => {
    switch (cardType) {
      case "visa":
        return <FaCcVisa className="text-blue-500" />;
      case "mastercard":
        return <FaCcMastercard className="text-red-500" />;
      case "amex":
        return <FaCcAmex className="text-green-500" />;
      default:
        return <FaCreditCard className="text-gray-500" />;
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500">
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              ¡Pago Exitoso!
            </h2>
            <p className="text-white/90 mb-6">
              Tu pago ha sido procesado correctamente.
            </p>
            <p className="text-white/90 mb-6">
              Serás redirigido en unos momentos...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500">
      <div className="w-1/2 relative flex flex-col justify-center items-center p-12 text-white overflow-hidden">
        <motion.div
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black text-xl absolute top-1/3 filter drop-shadow-lg"
          variants={ballVariants}
          animate="animate"
        >
          ⚽
        </motion.div>
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg z-10">
          IQScore
        </h1>
        <p className="text-center max-w-xs text-lg leading-relaxed opacity-90 z-10">
          Plataforma de análisis predictivo de fútbol. Completa tu pago para
          acceder a todas las funcionalidades premium.
        </p>
      </div>

      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30">
          <img
            src={logo}
            alt="IQSports Logo"
            className="w-32 h-auto mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Pasarela de Pago
          </h2>
          <p className="text-center text-sm text-white/90 mb-6">
            Selecciona tu método de pago preferido para continuar.
          </p>

          {!selectedMethod ? (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className="flex flex-col items-center justify-center p-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl border-2 border-white transition-all shadow-lg"
                >
                  <div className="text-white mb-2">{method.icon}</div>
                  <span className="text-sm text-white font-bold">
                    {method.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="mb-4">
              <h3 className="text-2xl font-extrabold text-white text-center mb-2 font-sans">
                {selectedMethod === "card" && "Tarjeta de Crédito/Débito"}
                {selectedMethod === "pse" && "PSE (Pago Seguro en Línea)"}
                {selectedMethod === "paypal" && "PayPal"}
              </h3>
              <div className="flex justify-center mb-4">
                {selectedMethod === "card" && (
                  <FaCreditCard size={32} className="text-white" />
                )}
                {selectedMethod === "pse" && (
                  <FaUniversity size={32} className="text-white" />
                )}
                {selectedMethod === "paypal" && (
                  <FaPaypal size={32} className="text-white" />
                )}
              </div>
            </div>
          )}

          {selectedMethod === "card" ? (
            <form
              onSubmit={handlePaymentSubmit}
              className="space-y-4 bg-white/80 p-6 rounded-xl border-2 border-indigo-600 shadow-lg"
            >
              <h3 className="text-lg font-bold text-indigo-900 mb-4">
                Detalles de la Tarjeta
              </h3>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handlePaymentDataChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-5 py-3 rounded-xl bg-white text-black border border-indigo-300 pl-14"
                  required
                />
                <div className="absolute top-3 left-3">{renderCardIcon()}</div>
              </div>
              <input
                type="text"
                name="cardName"
                value={paymentData.cardName}
                onChange={handlePaymentDataChange}
                placeholder="Nombre en la tarjeta"
                className="w-full px-5 py-3 rounded-xl bg-white text-black border border-indigo-300"
                required
              />
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="cardExpiry"
                  value={paymentData.cardExpiry}
                  onChange={handlePaymentDataChange}
                  placeholder="MM/AA"
                  className="w-1/2 px-5 py-3 rounded-xl bg-white text-black border border-indigo-300"
                  required
                />
                <input
                  type="text"
                  name="cardCvv"
                  value={paymentData.cardCvv}
                  onChange={handlePaymentDataChange}
                  placeholder="CVV"
                  className="w-1/2 px-5 py-3 rounded-xl bg-white text-black border border-indigo-300"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold transition mt-4 disabled:opacity-70 flex items-center justify-center"
              >
                {isProcessing ? "Procesando..." : "Pagar Ahora"}
              </button>
            </form>
          ) : selectedMethod === "pse" ? (
            <form
              onSubmit={handlePaymentSubmit}
              className="space-y-4 bg-white/80 p-6 rounded-xl border-2 border-indigo-600 shadow-lg"
            >
              <h3 className="text-lg font-bold text-indigo-900 mb-4">
                Pago con PSE
              </h3>

              <div>
                <label className="block text-sm mb-1 text-indigo-900">
                  Ingresa el valor
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="pseAmount"
                    value={paymentData.pseAmount}
                    onChange={handlePaymentDataChange}
                    placeholder="$0"
                    className="w-full px-5 py-3 rounded-xl bg-white text-black border border-indigo-300 pl-10"
                    required
                  />
                  <div className="absolute top-3 left-3">
                    <FaMoneyBillWave className="text-indigo-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1 text-indigo-900">
                  Tipo de persona
                </label>
                <select
                  name="psePersonType"
                  value={paymentData.psePersonType}
                  onChange={handlePaymentDataChange}
                  className="w-full px-5 py-3 rounded-xl bg-white text-black border border-indigo-300"
                  required
                >
                  <option value="Natural">Natural</option>
                  <option value="Jurídica">Jurídica</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-indigo-900">
                  Elige pasarela de pago
                </label>
                <select
                  name="pseGateway"
                  value={paymentData.pseGateway}
                  onChange={handlePaymentDataChange}
                  className="w-full px-5 py-3 rounded-xl bg-white text-black border border-indigo-300"
                  required
                >
                  <option value="PayU">Recarga con PayU</option>
                  <option value="PlaceToPay">PlaceToPay</option>
                  <option value="ePayco">ePayco</option>
                  <option value="Wompi">Wompi</option> {/* ✅ Nueva opción */}
                  <option value="MercadoPago">Mercado Pago</option>{" "}
                  {/* ✅ Nueva opción */}
                  <option value="Stripe">Stripe</option> {/* ✅ Nueva opción */}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-indigo-900">
                  Elige el banco
                </label>
                <div className="relative">
                  <select
                    name="pseBank"
                    value={paymentData.pseBank}
                    onChange={handlePaymentDataChange}
                    className="w-full px-5 py-3 rounded-xl bg-white text-black border border-indigo-300 pl-10"
                    required
                  >
                    <option value="">A continuación seleccione su banco</option>
                    {pseBanks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                  <div className="absolute top-3 left-3">
                    <FaBuilding className="text-indigo-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1 text-indigo-900">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="pseEmail"
                  value={paymentData.pseEmail}
                  onChange={handlePaymentDataChange}
                  placeholder="correo@ejemplo.com"
                  className="w-full px-5 py-3 rounded-xl bg-white text-black border border-indigo-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold transition mt-4 disabled:opacity-70 flex items-center justify-center"
              >
                {isProcessing ? "Procesando..." : "Recargar"}
              </button>
            </form>
          ) : selectedMethod === "paypal" ? (
            <form
              onSubmit={handlePaymentSubmit}
              className="space-y-4 bg-white/80 p-6 rounded-xl border-2 border-indigo-600 shadow-lg"
            >
              <h3 className="text-lg font-bold text-indigo-900 mb-4">
                Pago con PayPal
              </h3>

              <div className="flex justify-center mb-4">
                <FaPaypal className="text-blue-600 text-4xl" />
              </div>

              <p className="text-center text-sm text-indigo-900 mb-4">
                Paga de forma segura utilizando tu cuenta de PayPal. Serás
                redirigido a PayPal para completar el pago.
              </p>

              <div>
                <label className="block text-sm mb-1 text-indigo-900">
                  Correo Electrónico de PayPal
                </label>
                <input
                  type="email"
                  name="paypalEmail"
                  value={paymentData.paypalEmail}
                  onChange={handlePaymentDataChange}
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full px-5 py-3 rounded-xl bg-white text-black border border-indigo-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-indigo-900">
                  Monto a Pagar
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="paypalAmount"
                    placeholder="$0"
                    className="w-full px-5 py-3 rounded-xl bg-white text-black border border-indigo-300 pl-10"
                    required
                  />
                  <div className="absolute top-3 left-3">
                    <FaMoneyBillWave className="text-indigo-500" />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-800">
                  Al hacer clic en "Continuar a PayPal", serás redirigido a la
                  plataforma segura de PayPal para completar tu pago.
                </p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition mt-4 disabled:opacity-70 flex items-center justify-center"
              >
                {isProcessing ? "Procesando..." : "Continuar a PayPal"}
              </button>
            </form>
          ) : null}

          {selectedMethod && (
            <button
              onClick={() => setSelectedMethod(null)}
              className="mt-4 text-white hover:text-indigo-200 text-sm font-medium transition flex items-center justify-center w-full"
            >
              ← Volver a métodos de pago
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentGateway;
