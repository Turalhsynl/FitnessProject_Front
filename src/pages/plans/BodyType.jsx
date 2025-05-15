// import React, { useState } from "react";

// const BodyTypeSelector = ({ gender }) => {
//   const maleOptions = [
//     { label: "Regular", image: "/male-regular.jpg" },
//     { label: "Flabby", image: "/male-flabby.jpg" },
//     { label: "Extra", image: "/male-extra.jpg" },
//   ];

//   const femaleOptions = [
//     { label: "Regular", image: "/female-regular.jpg" },
//     { label: "Flabby", image: "/female-flabby.jpg" },
//     { label: "Extra", image: "/female-extra.jpg" },
//   ];

//   const options = gender === "male" ? maleOptions : femaleOptions;

//   const [selected, setSelected] = useState("Regular");

//   return (
//     <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold text-center mb-4">What is your body type?</h2>
//       <div className="space-y-4">
//         {options.map((opt) => (
//           <div
//             key={opt.label}
//             onClick={() => setSelected(opt.label)}
//             className={`flex items-center p-3 border rounded-xl cursor-pointer transition ${
//               selected === opt.label ? "border-purple-500 bg-purple-100" : "border-gray-200"
//             }`}
//           >
//             <img src={opt.image} alt={opt.label} className="w-16 h-16 rounded-full object-cover mr-4" />
//             <span className="text-lg font-medium">{opt.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BodyTypeSelector;


//yuxaridaki her 2 gender ucun isleyir asagidaki sadece yoxlamaq ucun yazilib esas yuxaridakidi

import React, { useState } from "react";

const BodyTypeSelector = () => {
  const options = [
    { label: "Regular", image: "/male-regular.jpg" },
    { label: "Flabby", image: "/male-flabby.jpg" },
    { label: "Extra", image: "/male-extra.jpg" },
  ];

  const [selected, setSelected] = useState("Regular");

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">What is your body type?</h2>
      <div className="space-y-4">
        {options.map((opt) => (
          <div
            key={opt.label}
            onClick={() => setSelected(opt.label)}
            className={`flex items-center p-3 border rounded-xl cursor-pointer transition ${
              selected === opt.label ? "border-purple-500 bg-purple-100" : "border-gray-200"
            }`}
          >
            <img
              src={opt.image}
              alt={opt.label}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <span className="text-lg font-medium">{opt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyTypeSelector;