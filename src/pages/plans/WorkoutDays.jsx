import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkout } from "./WorkoutContext";

const daysOfWeek = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
];



export default function WorkoutDays() {
  const [selectedDays, setSelectedDays] = useState([]);
  const navigate = useNavigate();
  const { updateData } = useWorkout();

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

const handleNext = () => {
  if (selectedDays.length > 0) {
    updateData({ daysPerWeek: selectedDays.join(", ") });
    navigate("/weightinput");
  }
};


  return (
    <div className="min-h-screen bg-[#f8f4ff] text-center px-6 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#3a2d5f] mb-2">
        When do you want to workout?
      </h1>
      <p className="text-[#6f5e96] mb-8">Choose at least 1 day for a workout</p>

      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-10">
        {daysOfWeek.map((day) => {
          const isSelected = selectedDays.includes(day);
          return (
            <div
              key={day}
              onClick={() => toggleDay(day)}
              className={`rounded-full w-full py-6 text-center font-semibold text-[#3a2d5f] cursor-pointer transition-all duration-300 border 
              ${isSelected ? "bg-[#e9ddfb] border-[#9d7fe4]" : "bg-white border-[#e3dbf5] hover:bg-[#f3ecff]"}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedDays.length === 0}
        className={`px-8 py-3 rounded-full text-white font-semibold text-lg transition-all duration-200 ${
          selectedDays.length > 0
            ? "bg-[#9d7fe4] hover:bg-[#7e63c8]"
            : "bg-[#ccc]"
        }`}
      >
        Next
      </button>
    </div>
  );
}