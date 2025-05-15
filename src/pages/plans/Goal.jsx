// import React, { useState } from "react";

// const goals = [
//   {
//     title: "Lose weight",
//     description: "Shed those extra pounds",
//     icon: "🔥",
//   },
//   {
//     title: "Manage mood swings",
//     description: "Feel more balanced and less stressed",
//     icon: "🌱",
//   },
//   {
//     title: "Balance hormones",
//     description: "Relieve menopause symptoms",
//     icon: "⚖️",
//   },
//   {
//     title: "Improve mobility",
//     description: "Keep my bones healthy and prevent arthritis",
//     icon: "🦢",
//   },
//   {
//     title: "Enhance skin",
//     description: "Achieve a more youthful glow and reduce wrinkles",
//     icon: "✨",
//   },
//   {
//     title: "Improve heart health",
//     description: "Manage my blood pressure and cholesterol",
//     icon: "💜",
//   },
// ];

// export default function GoalsSelection() {
//   const [selectedGoal, setSelectedGoal] = useState("Lose weight");

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f7fc] px-4">
//       <div className="w-full max-w-md">
//         <h2 className="text-center text-2xl font-bold mb-2">What do you want to achieve?</h2>
//         <p className="text-center text-sm text-gray-600 mb-6">choose what's important to you now</p>

//         <div className="space-y-4">
//           {goals.map((goal) => (
//             <div
//               key={goal.title}
//               onClick={() => setSelectedGoal(goal.title)}
//               className={`flex items-start p-4 border rounded-2xl cursor-pointer transition-all duration-200 ${
//                 selectedGoal === goal.title
//                   ? "bg-purple-100 border-purple-500 shadow-md"
//                   : "bg-white hover:bg-purple-50"
//               }`}
//             >
//               <div className="text-xl mr-4">{goal.icon}</div>
//               <div>
//                 <h3 className="font-semibold text-base text-gray-800">{goal.title}</h3>
//                 <p className="text-sm text-gray-500">{goal.description}</p>
//               </div>
//               <div className="ml-auto">
//                 {selectedGoal === goal.title && (
//                   <div className="w-5 h-5 bg-purple-600 text-white rounded-sm flex items-center justify-center">
//                     ✓
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <button className="w-full mt-6 bg-purple-600 text-white text-lg font-medium py-3 rounded-full hover:bg-purple-700 transition">
//           Next step
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";

const goals = [
  { title: "Lose weight", description: "Shed those extra pounds", icon: "🔥" },
  { title: "Manage mood swings", description: "Feel more balanced and less stressed", icon: "🌱" },
  { title: "Balance hormones", description: "Relieve menopause symptoms", icon: "⚖️" },
  { title: "Improve mobility", description: "Keep my bones healthy and prevent arthritis", icon: "🦢" },
  { title: "Enhance skin", description: "Achieve a more youthful glow and reduce wrinkles", icon: "✨" },
  { title: "Improve heart health", description: "Manage my blood pressure and cholesterol", icon: "💜" },
];

export default function GoalsSelection() {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleSelect = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f7fc] px-4">
      <div className="w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-2">What do you want to achieve?</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Choose what's important to you now</p>

        <div className="space-y-4">
          {goals.map((goal) => (
            <div
              key={goal.title}
              onClick={() => handleSelect(goal.title)}
              className={`flex items-start p-4 border rounded-2xl cursor-pointer transition-all duration-200 ${
                selectedGoals.includes(goal.title)
                  ? "bg-purple-100 border-purple-500 shadow-md"
                  : "bg-white hover:bg-purple-50"
              }`}
            >
              <div className="text-xl mr-4">{goal.icon}</div>
              <div>
                <h3 className="font-semibold text-base text-gray-800">{goal.title}</h3>
                <p className="text-sm text-gray-500">{goal.description}</p>
              </div>
              <div className="ml-auto">
                <input
                  type="checkbox"
                  checked={selectedGoals.includes(goal.title)}
                  onChange={() => handleSelect(goal.title)}
                  className="w-5 h-5 mt-3 accent-purple-600"
                />
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 bg-purple-600 text-white text-lg font-medium py-3 rounded-full hover:bg-purple-700 transition">
          Next step
        </button>
      </div>
    </div>
  );
}
