import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkout } from "./WorkoutContext";

export default function WeightInput() {
  const [unit, setUnit] = useState("kg");
  const [weight, setWeight] = useState("");
  const { updateData } = useWorkout();
  const navigate = useNavigate();

  const handleNext = () => {
    if (weight) {
      updateData({ weight: Number(weight), unit });
      navigate("/heightinput"); // Değiştirilecek rota
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f4ff] flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#3a2d5f] mb-6 text-center">
        What is your weight now?
      </h1>

      <div className="flex bg-[#e7dfff] p-1 rounded-full mb-8">
        {["kg", "lb"].map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
              unit === u ? "bg-[#9d7fe4] text-white" : "text-[#3a2d5f]"
            }`}
          >
            {u}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center text-[#3a2d5f] text-2xl mb-10 border-b border-[#c9b9ef] w-60">
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="bg-transparent w-32 text-center outline-none"
          placeholder="0"
        />
        <span className="ml-2">{unit}</span>
      </div>

      <button
        onClick={handleNext}
        disabled={!weight}
        className={`px-8 py-3 rounded-full text-white font-semibold text-lg transition-all duration-200 ${
          weight
            ? "bg-[#9d7fe4] hover:bg-[#7e63c8]"
            : "bg-[#ccc] cursor-not-allowed"
        }`}
      >
        Next step
      </button>
    </div>
  );
}