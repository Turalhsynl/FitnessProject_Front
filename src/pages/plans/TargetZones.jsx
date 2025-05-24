// import React, { useState } from "react";
// import { useWorkout } from "./WorkoutContext";
// import { useNavigate } from "react-router-dom";

// import maleImg from "../../assets/target_male.webp";
// import femaleImg from "../../assets/target_female.webp";

// const TargetZones = () => {
//   const { formData, updateData } = useWorkout();
//   const isFemale = formData.gender === "female";
//   const navigate = useNavigate();
//   const [selectedZones, setSelectedZones] = useState(formData.targetZones || []);
//   const [fullBody, setFullBody] = useState(formData.fullBody || false);

//   const handleToggle = () => {
//     setFullBody(!fullBody);
//     updateData({ fullBody: !fullBody, targetZones: [] });
//     setSelectedZones([]);
//   };

//   const handleZoneClick = (zone) => {
//     let updatedZones = selectedZones.includes(zone)
//       ? selectedZones.filter((z) => z !== zone)
//       : [...selectedZones, zone];
//     setSelectedZones(updatedZones);
//     updateData({ targetZones: updatedZones });
//     navigate("/submit-plan");
//   };

//   const imageSrc = isFemale ? femaleImg : maleImg;

//   const zones = [
//     { label: "Pecs", top: "34%", left: "58%" },
//     { label: "Arms", top: "44%", left: "63%" },
//     { label: "Belly", top: "56%", left: "49%" },
//     { label: "Legs", top: "84%", left: "52%" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#f7f3fd] flex flex-col items-center justify-center px-4 py-8">
//       <h2 className="text-3xl font-bold text-[#2d1950] mb-6 text-center">
//         What are your target zones?
//       </h2>

//       <div className="flex items-center space-x-3 mb-6">
//         <label className="flex items-center cursor-pointer space-x-2 text-[#2d1950] font-semibold">
//           <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${fullBody ? 'bg-[#8759f2]' : 'bg-gray-300'}`} onClick={handleToggle}>
//             <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${fullBody ? 'translate-x-4' : 'translate-x-0'}`} />
//           </div>
//           <span>Full body</span>
//         </label>
//       </div>

//       <div className="relative w-[280px] md:w-[320px]">
//         <img src={imageSrc} alt="body" className="w-full" />

//         {!fullBody &&
//           zones.map((zone) => (
//             <button
//               key={zone.label}
//               onClick={() => handleZoneClick(zone.label)}
//               className={`absolute flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 
//                 ${selectedZones.includes(zone.label)
//                   ? "bg-[#d8c6ff] text-[#2d1950] border-2 border-[#8759f2]"
//                   : "bg-white text-[#2d1950] border-2 border-[#e4dcf7]"}
//               `}
//               style={{ top: zone.top, left: zone.left, transform: "translate(-50%, -50%)" }}
//             >
//               <span className="mr-2 w-3 h-3 rounded-full border-4 border-white bg-[#8759f2] shadow-md" />
//               {zone.label}
//             </button>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default TargetZones;


// import React, { useState, useEffect } from "react";
// import { useWorkout } from "./WorkoutContext";
// import { useNavigate } from "react-router-dom";

// import maleImg from "../../assets/target_male.webp";
// import femaleImg from "../../assets/target_female.webp";

// const TargetZones = () => {
//   const { formData, updateData } = useWorkout();
//   const isFemale = formData.gender === "female";
//   const navigate = useNavigate();
//   const [selectedZones, setSelectedZones] = useState(formData.targetZones || []);
//   const [fullBody, setFullBody] = useState(formData.fullBody || false);

//   const imageSrc = isFemale ? femaleImg : maleImg;

//   const zones = isFemale
//     ? [
//         { label: "Breasts", top: "30%", left: "58%" },
//         { label: "Arms", top: "42%", left: "64%" },
//         { label: "Belly", top: "56%", left: "50%" },
//         { label: "Butt", top: "68%", left: "60%" },
//         { label: "Legs", top: "84%", left: "54%" },
//       ]
//     : [
//         { label: "Pecs", top: "34%", left: "58%" },
//         { label: "Arms", top: "44%", left: "63%" },
//         { label: "Belly", top: "56%", left: "49%" },
//         { label: "Legs", top: "84%", left: "52%" },
//       ];

//   const handleToggle = () => {
//     const newFullBody = !fullBody;
//     setFullBody(newFullBody);
//     updateData({ fullBody: newFullBody, targetZones: [] });
//     setSelectedZones([]);
//   };

//   const handleZoneClick = (zone) => {
//     const updatedZones = selectedZones.includes(zone)
//       ? selectedZones.filter((z) => z !== zone)
//       : [...selectedZones, zone];
//     setSelectedZones(updatedZones);
//     updateData({ targetZones: updatedZones });
   
//   };

//   return (
//     <div className="min-h-screen bg-[#f7f3fd] flex flex-col items-center justify-center px-4 py-8 text-center">
//       <h2 className="text-3xl font-bold text-[#2d1950] mb-6">
//         What are your target zones?
//       </h2>

//       <div className="flex items-center space-x-3 mb-6">
//         <label className="flex items-center cursor-pointer space-x-2 text-[#2d1950] font-semibold">
//           <div
//             className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
//               fullBody ? "bg-[#8759f2]" : "bg-gray-300"
//             }`}
//             onClick={handleToggle}
//           >
//             <div
//               className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
//                 fullBody ? "translate-x-4" : "translate-x-0"
//               }`}
//             />
//           </div>
//           <span>Full body</span>
//         </label>
//       </div>

//       <div className="relative w-[280px] md:w-[320px]">
//         <img src={imageSrc} alt="body" className="w-full" />

//         {!fullBody &&
//           zones.map((zone, index) => (
//             <button
//               key={index}
//               onClick={() => handleZoneClick(zone.label)}
//               className={`absolute group flex items-center text-sm font-semibold rounded-full px-4 py-2 transition-all duration-200 
//                 ${selectedZones.includes(zone.label)
//                   ? "bg-[#d8c6ff] text-[#2d1950] border-2 border-[#8759f2]"
//                   : "bg-white text-[#2d1950] border-2 border-[#e4dcf7]"}`}
//               style={{
//                 top: zone.top,
//                 left: zone.left,
//                 transform: "translate(-50%, -50%)",
//               }}
//             >
//               <span className="w-3 h-3 rounded-full border-4 border-white bg-[#8759f2] shadow-md mr-2" />
//               {zone.label}
//             </button>
//           ))}
//       </div>

//       <button
//         onClick={() => navigate("/submit-plan")}
//         className="mt-10 bg-[#8759f2] text-white text-lg font-bold py-3 px-8 rounded-full"
//       >
//         Next step
//       </button>
//     </div>
//   );
// };

// export default TargetZones;


import React, { useState, useEffect } from "react";
import { useWorkout } from "./WorkoutContext";
import { useNavigate } from "react-router-dom";

import maleImg from "../../assets/target_male.webp";
import femaleImg from "../../assets/target_female.webp";

const TargetZones = () => {
  const { formData, updateData } = useWorkout();
  const isFemale = formData.gender === "female";
  const navigate = useNavigate();
  const [selectedZones, setSelectedZones] = useState(formData.targetZones || []);
  const [fullBody, setFullBody] = useState(formData.fullBody || false);

  const imageSrc = isFemale ? femaleImg : maleImg;

  const zones = isFemale
    ? ["Breasts", "Arms", "Belly", "Butt", "Legs"]
    : ["Pecs", "Arms", "Belly", "Legs"];

//   const handleToggle = () => {
//     const newFullBody = !fullBody;
//     setFullBody(newFullBody);
//     setSelectedZones([]);
//     updateData({ fullBody: newFullBody, targetZones: [] });
//   };

const handleToggle = () => {
  const newFullBody = !fullBody;
  setFullBody(newFullBody);

  if (newFullBody) {
    // Hepsini seç
    setSelectedZones(zones);
    updateData({ fullBody: true, targetZones: zones });
  } else {
    // Temizle
    setSelectedZones([]);
    updateData({ fullBody: false, targetZones: [] });
  }
};


  const handleZoneClick = (zone) => {
    const updatedZones = selectedZones.includes(zone)
      ? selectedZones.filter((z) => z !== zone)
      : [...selectedZones, zone];
    setSelectedZones(updatedZones);
    updateData({ targetZones: updatedZones });
  };

  return (
    <div className="min-h-screen bg-[#f5f1fc] flex flex-col items-center justify-center text-center py-10 px-4">
      <h2 className="text-3xl font-bold text-[#2d1950] mb-6">
        What are your target zones?
      </h2>

      {/* Toggle */}
      <label className="flex items-center gap-3 mb-6 cursor-pointer">
        <div
          className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
            fullBody ? "bg-[#8759f2]" : "bg-gray-300"
          }`}
          onClick={handleToggle}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
              fullBody ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </div>
        <span className="text-[#2d1950] font-medium">Full body</span>
      </label>

      {/* Body Image */}
      <div className="relative">
        <img src={imageSrc} alt="Body" className="w-[240px] sm:w-[280px] mx-auto" />

        {!fullBody && (
          <div className="absolute left-1/1 transform -translate-x-1/2 top-[15%] w-full flex flex-col items-center gap-3">
            {zones.map((zone, idx) => (
            //   <button
            //     key={zone}
            //     onClick={() => handleZoneClick(zone)}
            //     className={`flex items-center gap-2 bg-white text-[#2d1950] font-medium px-4 py-2 rounded-full shadow-md transition-all
            //     ${selectedZones.includes(zone) ? "ring-2 ring-[#8759f2]" : ""}`}
            //   >
            <button
  key={zone}
  onClick={() => handleZoneClick(zone)}
  disabled={fullBody} // full body aktifse butonlar devre dışı
  className={`flex items-center gap-2 bg-white text-[#2d1950] font-medium px-4 py-2 rounded-full shadow-md transition-all
    ${selectedZones.includes(zone) ? "ring-2 ring-[#8759f2]" : ""}
  `}
>

                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    selectedZones.includes(zone) ? "bg-[#8759f2]" : "bg-gray-300"
                  }`}
                />
                {zone}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/level")}
        className="mt-10 bg-[#8759f2] hover:bg-[#7240dc] text-white text-lg font-bold py-3 px-10 rounded-full"
      >
        Next step
      </button>
    </div>
  );
};

export default TargetZones;
