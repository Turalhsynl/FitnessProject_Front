import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkout } from "./WorkoutContext";

const sleepOptions = [
  { label: "Less than 5 hours", emoji: "😴" },
  { label: "5-6 hours", emoji: "🛌" },
  { label: "7-8 hours", emoji: "🌙" },
  { label: "More than 8 hours", emoji: "🛏️" },
];

export default function SleepSelection() {
  const [selectedSleep, setSelectedSleep] = useState(null);
  const navigate = useNavigate();
  const { updateData } = useWorkout();

  const handleNext = () => {
    if (selectedSleep) {
      updateData({ sleep: selectedSleep });
      navigate("/workoutdays");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f4ff] text-center px-6 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#3a2d5f] mb-8">
        How much sleep do you usually get?
      </h1>

      <div className="flex flex-col gap-4 max-w-md mx-auto mb-10">
        {sleepOptions.map((option) => {
          const isSelected = selectedSleep === option.label;
          return (
            <div
              key={option.label}
              onClick={() => setSelectedSleep(option.label)}
              className={`cursor-pointer rounded-2xl p-4 text-left transition-all duration-300 border 
              ${isSelected ? "bg-[#e9ddfb] border-[#9d7fe4]" : "bg-white border-[#e3dbf5]"} 
              hover:bg-[#f3ecff]`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-lg font-semibold text-[#3a2d5f]">{option.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={!selectedSleep}
        className={`px-8 py-3 rounded-full text-white font-semibold text-lg transition-all duration-200 ${
          selectedSleep
            ? "bg-[#9d7fe4] hover:bg-[#7e63c8]"
            : "bg-[#ccc] cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}