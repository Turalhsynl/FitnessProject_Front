// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useWorkout } from "./WorkoutContext";

// const yogaLevels = [
//   { label: "Newbie", description: "Never tried yoga before", emoji: "🌱" },
//   { label: "Entry-level", description: "Had a couple of beginner classes", emoji: "😁" },
//   { label: "Intermediate", description: "Practiced consistently, but not long-term", emoji: "😍" },
//   { label: "Expert", description: "Confident in advanced poses", emoji: "🧘‍♀️" },
// ];

// export default function YogaLevel() {
//   const navigate = useNavigate();
//   const { updateData } = useWorkout();

//   const handleLevelSelect = (level) => {
//     updateData({ yogaLevel: level });
//     navigate("/next-step"); // replace with your actual route
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f4ff] text-center px-6 py-10">
//       <h1 className="text-4xl sm:text-5xl font-bold text-[#3a2d5f] mb-6">What is your yoga level?</h1>

//       <div className="flex flex-col gap-4 max-w-md mx-auto">
//         {yogaLevels.map((level) => (
//           <div
//             key={level.label}
//             onClick={() => handleLevelSelect(level.label)}
//             className="border border-[#e0d6f9] rounded-2xl bg-white p-4 text-left cursor-pointer hover:bg-[#f1eaff] transition"
//           >
//             <div className="flex items-center gap-3">
//               <span className="text-2xl">{level.emoji}</span>
//               <div>
//                 <div className="text-lg font-semibold text-[#3a2d5f]">{level.label}</div>
//                 <div className="text-sm text-[#3a2d5f]">{level.description}</div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkout } from "./WorkoutContext";

const yogaLevels = [
  { label: "Newbie", description: "Never tried yoga before", emoji: "🌱" },
  { label: "Entry-level", description: "Had a couple of beginner classes", emoji: "😁" },
  { label: "Intermediate", description: "Practiced consistently, but not long-term", emoji: "😍" },
  { label: "Expert", description: "Confident in advanced poses", emoji: "🧘‍♀️" },
];

export default function YogaLevel() {
  const navigate = useNavigate();
  const { updateData } = useWorkout();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    updateData({ level: level });
    navigate("/sleep");
  };

  return (
    <div className="min-h-screen bg-[#f8f4ff] text-center px-6 py-10">
      <h1 className="text-4xl sm:text-5xl mt-24 font-bold text-[#3a2d5f] mb-8">What is your level?</h1>

      <div className="flex flex-col gap-4 max-w-lg mx-auto">
        {yogaLevels.map((level) => {
          const isSelected = selectedLevel === level.label;

          return (
            <div
              key={level.label}
              onClick={() => handleLevelSelect(level.label)}
              className={`cursor-pointer rounded-2xl p-4 text-left transition-all duration-300 border 
                ${isSelected ? "bg-purple-200 border-[#9d7fe4]" : "bg-white border-[#e3dbf5]"} 
                hover:bg-[#f3ecff]`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{level.emoji}</span>
                <div>
                  <div className="text-lg font-bold text-[#3a2d5f]">{level.label}</div>
                  <div className="text-sm text-[#3a2d5f]">{level.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}