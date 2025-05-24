


// import React, { useState } from "react";
// import { useWorkout } from "./WorkoutContext";
// const BodyTypeSelector = () => {
//   const { formData, updateData } = useWorkout();
//   const gender = formData.gender;

//   const options = gender === "female"
//     ? [
//         { label: "Regular", image: "/female-regular.jpg" },
//         { label: "Flabby", image: "/female-flabby.jpg" },
//         { label: "Extra", image: "/female-extra.jpg" },
//       ]
//     : [
//         { label: "Regular", image: "/male-regular.jpg" },
//         { label: "Flabby", image: "/male-flabby.jpg" },
//         { label: "Extra", image: "/male-extra.jpg" },
//       ];

//   const [selected, setSelected] = useState(formData.bodyType || "");

//   const handleSelect = (label) => {
//     setSelected(label);
//     updateData({ bodyType: label });
//   };

//   return (
//     <div className="min-h-screen bg-[#f6f2fe] flex items-center justify-center px-4">
//       <div className="w-full max-w-xl">
//         <h2 className="text-3xl font-bold text-center text-[#2d1950] mb-8">
//           What is your body type?
//         </h2>
//         <div className="space-y-6">
//           {options.map((opt) => (
//             <div
//               key={opt.label}
//               onClick={() => handleSelect(opt.label)}
//               className={`flex items-center p-4 border-2 rounded-[24px] cursor-pointer transition duration-200 ${
//                 selected === opt.label
//                   ? "border-[#a387d1] bg-white shadow-lg"
//                   : "border-[#e1d5f0] bg-white"
//               }`}
//             >
//               <div className="w-16 h-16 rounded-[16px] overflow-hidden mr-4">
//                 <img
//                   src={opt.image}
//                   alt={opt.label}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <span className="text-lg font-semibold text-[#2d1950]">{opt.label}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BodyTypeSelector;


import React, { useState, useEffect } from "react";
import { useWorkout } from "./WorkoutContext";
import regular from "../../assets/mid_sized.webp"
import flabby from "../../assets/heavier_side.webp"
import extra from "../../assets/overweight.webp"
import regular_man from "../../assets/mid_sized_man.webp"
import flabby_man from "../../assets/heavier_side_man.webp"
import extra_man from "../../assets/overweight_man.webp"
import { useNavigate } from "react-router-dom";
const BodyTypeSelector = () => {
  const { formData, updateData } = useWorkout();
  const [selected, setSelected] = useState(formData.bodyType || "");
  const navigate = useNavigate("/bodytype");
  const isFemale = formData.gender === "female";

  const options = [
    {
      label: "Regular",
      image: isFemale ? regular : regular_man,
    },
    {
      label: "Flabby",
      image: isFemale ? flabby : flabby_man,
    },
    {
      label: "Extra",
      image: isFemale ? extra : extra_man,
    },
  ];

  const handleSelect = (type) => {
    setSelected(type);
    updateData({ bodyType: type });
    navigate("/bodygoal");
  };

  return (
    <div className="min-h-screen bg-[#f7f3fd] flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-[#2d1950] mb-8">
          What is your body type?
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
              <span className="text-lg font-semibold text-[#2d1950]">{opt.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodyTypeSelector;
