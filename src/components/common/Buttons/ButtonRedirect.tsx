import React from "react";
import { useNavigate } from "react-router-dom";

interface ButtonRedirectProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  hoverClass?: string;  

}

const ButtonRedirect: React.FC<ButtonRedirectProps> = ({ to, children, className, hoverClass }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Si la URL es externa, redirige usando window.location.href
    if (to.startsWith("http")) {
      window.location.href = to;
    } else {
      // Si es interna, usa navigate
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 bg-[#8400FF] text-white rounded hover:${hoverClass} transition ${className ?? ""}`}
    >
      {children}
    </button>
  );
};
//#8400FF
export default ButtonRedirect;
