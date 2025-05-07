import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PlanPremium: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1240px] mx-auto text-black dark:text-white font-nunito">
      <h2 className="text-[18px] font-bold uppercase mb-4">
        Plan Premium
      </h2>
      <div 
        onClick={() => navigate('/Account')}
        className="bg-[#354AED] rounded-xl p-5 flex items-center justify-between cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
      >
        <div className="flex items-center gap-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2095/2095163.png"
            alt="Goal"
            className="w-[80px] h-[70px] object-contain"
          />
          <p className="text-white font-medium text-[18px] font-nunito">
            Disfruta de los beneficios del plan premium
          </p>
        </div>
        <div className="bg-white/80 w-9 h-9 rounded-md flex items-center justify-center text-[#3949ab]">
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default PlanPremium;