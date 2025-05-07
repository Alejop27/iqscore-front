import React from "react";
import { useNavigate } from "react-router-dom";

interface ButtonRedirectProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const ButtonRedirect: React.FC<ButtonRedirectProps> = ({ to, children, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 bg-[#8400FF] text-white rounded hover:bg-[#6d00cc] transition ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default ButtonRedirect;