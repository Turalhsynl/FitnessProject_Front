import React, { useState } from "react";
import { useWorkout } from "./WorkoutContext";
import fit_male from "../../assets/thin.webp";
import cut_male from "../../assets/toned.webp";
import bulk_male from "../../assets/curvy.webp";

import fit_female from "../../assets/fit.webp";
import athletic_female from "../../assets/athletic.webp";
import shapely_female from "../../assets/shapely.webp";

import { useNavigate } from "react-router-dom";

const BodyGoalSelector = () => {
  const { formData, updateData } = useWorkout();
  const [selected, setSelected] = useState(formData.dreamBody || "");
  const navigate = useNavigate();
  const isFemale = formData.gender === "female";

  const options = [
    {
      label: "Fit",
      image: isFemale ? fit_female : fit_male,
    },
    {
      label: isFemale ? "Athletic" : "Cut",
      image: isFemale ? athletic_female : cut_male,
    },
    {
      label:isFemale ? "Shapely" : "Bulk",
      image: isFemale ? shapely_female : bulk_male,
    },
    
  ];

  const handleSelect = (goal) => {
    setSelected(goal);
    updateData({ bodyGoal: goal });
    navigate("/targetzone");
  };

  return (
    <div className="min-h-screen bg-[#f7f3fd] flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-[#2d1950] mb-8">
          What is your body goal?
        </h2>
        <div className="space-y-6">
          {options.map((opt) => (
            <div
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              className={`flex items-center p-4 border-2 rounded-[24px] cursor-pointer transition duration-200 ${
                selected === opt.label
                  ? "border-[#8759f2] bg-[#e2d8fb]"
                  : "border-[#e4dcf7] bg-white"
              }`}
            >
              <div className="w-[80px] h-[80px] rounded-[24px] overflow-hidden mr-4 bg-gray-100">
                <img
                  src={opt.image}
                  alt={opt.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-semibold text-[#2d1950]">
                {opt.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodyGoalSelector;
