

// /////////
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useWorkout } from "./WorkoutContext";

// const ageGroups = [
//   { label: "35-44", image: "https://harnafit.com/_next/image?url=https://s3.harna-app.com/quizes_images/f8ed7f92-75bd-473b-ab96-4781f6b5a0c7.png&w=3840&q=75" },
//   { label: "45-54", image: "https://harna-yoga.com/_next/image?url=https://s3.harna-app.com/quizes_images/924bb39b-0659-4055-a65f-c9f6091d5bb4.png&w=3840&q=75" },
//   { label: "55-64", image: "https://harna-yoga.com/_next/image?url=https://s3.harna-app.com/quizes_images/c032b021-5509-44ed-94b9-75e2f6ce7f36.png&w=3840&q=75" },
//   { label: 65, image: "https://harnafit.com/_next/image?url=https://s3.harna-app.com/quizes_images/2ee2ebb7-7433-4459-9fa5-5f7b208e02fa.png&w=3840&q=75" },
// ];

// export default function Yoga() {
//   const navigate = useNavigate();
//   const { updateData } = useWorkout();

//   const handleAgeSelect = (age) => {
//     updateData({ age });
//     navigate("/gender");
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f4ff] text-center px-6 py-10">
//       <h1 className="text-[70px] font-semibold text-[#3a2d5f]">Chair Yoga</h1>
//       <p className="text-[18px] font-semibold  mb-2 text-[#3a2d5f]">Tailored to your age</p>
//       <p className="text-sm font-bold text-[#3a2d5f] mb-40">1-MINUTE QUIZ</p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-[750px] mx-auto">
//         {ageGroups.map((group) => (
//           <div
//             key={group.label}
//             className="bg-[#ddd4f9] w-[162px] h-[160px] rounded-3xl  cursor-pointer  "
//             onClick={() => handleAgeSelect(group.label)}
//           >
//             <img src={group.image} alt={group.label} className="object-cover w-[162px]  h-[198px]" />
//             <div className="bg-purple-600 text-white font-semibold py-2 w-[175px] h-[58px] rounded-full">
//               {group.label} →
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
    <div className="min-h-screen bg-[#f6f1fd] flex flex-col items-center justify-center px-6">
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