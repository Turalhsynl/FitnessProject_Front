
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkout } from "./WorkoutContext";

export default function AgeScreen() {
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const { updateData } = useWorkout();

  const handleNext = () => {
    if (age) {
      updateData({ age: Number(age) });
      navigate("/gender");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f1fd] flex flex-col items-center justify-center px-6 mt-[80px]">
      <h1 className="text-3xl sm:text-4xl font-semibold text-[#3e2f5b] mb-10 text-center">
        What's your age?
      </h1>

      <div className="flex items-center text-2xl text-[#3e2f5b] border-b border-[#c7bae5] w-60 justify-center mb-10">
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="bg-transparent text-center w-24 outline-none"
          placeholder="0"
        />
        <span className="ml-2">years</span>
      </div>

      <button
        onClick={handleNext}
        disabled={!age}
        className={`px-8 py-3 rounded-full font-semibold text-white text-lg transition-all duration-200 ${
          age
            ? "bg-[#a076f9] hover:bg-[#8d64db]"
            : "bg-[#ccc] cursor-not-allowed"
        }`}
      >
        Next step
      </button>
    </div>
  );
}