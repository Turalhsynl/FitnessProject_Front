// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";


// const Plan = () => {
//   const [plans, setPlans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await fetch("https://localhost:7298/api/MembershipPlan");
//         const result = await response.json();

//         if (result.isSuccess && Array.isArray(result.data)) {
//           setPlans(result.data);
//           setSelectedPlan(result.data[0]?.id);
//         } else {
//           console.error("API returned error or invalid data");
//         }
//       } catch (error) {
//         console.error("Failed to fetch plans:", error);
//       }
//     };

//     fetchPlans();
//   }, []);

//   return (
//     <div className="bg-black text-white py-16 px-8">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-3xl font-bold italic text-white mb-2">JOIN NOW</h2>
//         <p className="text-gray-400 mb-6">Select Your Plan</p>
//         <div className="space-y-4">
//           {plans.map((plan) => (
//             <div
//               key={plan.id}
//               className={`p-6 rounded-lg cursor-pointer border ${selectedPlan === plan.id ? "border-purple-500" : "border-gray-700"
//                 } bg-gray-900 flex justify-between items-center`}
//               onClick={() => setSelectedPlan(plan.id)}
//             >
//               <div className="flex items-center space-x-4">
//                 <div
//                   className={`w-4 h-4 rounded-full border ${selectedPlan === plan.id ? "bg-purple-500 border-purple-500" : "border-gray-500"
//                     }`}
//                 />
//                 <div>
//                   <p className="text-white font-semibold">{plan.name}</p>
//                   <p className="text-gray-400 text-sm">
//                     Access to {plan.maxProgramsAllowed} program{plan.maxProgramsAllowed > 1 ? "s" : ""}
//                   </p>
//                 </div>
//               </div>
//               <p className="text-white font-bold">${plan.price} / Month</p>
//             </div>
//           ))}
//         </div>
//         <button
//   onClick={() =>
//     navigate("/select-coach", {
//       state: {
//         selectedPlanId: selectedPlan,
//         maxProgramsAllowed: plans.find((p) => p.id === selectedPlan)?.maxProgramsAllowed || 1,
//       },
//     })
//   }
//   className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold w-full md:w-auto"
// >
//   Next Step →
// </button>
//       </div>
//     </div>
//   );
// };

// export default Plan;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedPlanId = Number(localStorage.getItem("selectedPlanId"));
  
    const fetchPlans = async () => {
      try {
        const response = await fetch("https://localhost:7298/api/MembershipPlan");
        const result = await response.json();
  
        if (result.isSuccess && Array.isArray(result.data)) {
          setPlans(result.data);
  
          const defaultPlanId = storedPlanId || result.data[0]?.id;
          setSelectedPlan(defaultPlanId);
        } else {
          console.error("API returned error or invalid data");
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };
  
    fetchPlans();
  }, []);
  
  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    localStorage.setItem("selectedPlanId", planId);
  };

  const handleNextStep = () => {
    const selected = plans.find((p) => p.id === selectedPlan);
    navigate("/select-coach", {
      state: {
        selectedPlanId: selectedPlan,
        maxProgramsAllowed: selected?.maxProgramsAllowed || 1,
      },
    });

    // Eğer istersen seçimi temizleyebilirsin:
    // localStorage.removeItem("selectedPlanId");
  };

  return (
    <div className="bg-black text-white py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold italic text-white mb-2">JOIN NOW</h2>
        <p className="text-gray-400 mb-6">Select Your Plan</p>
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-lg cursor-pointer border ${
                selectedPlan === plan.id ? "border-purple-500" : "border-gray-700"
              } bg-gray-900 flex justify-between items-center`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-4 h-4 rounded-full border ${
                    selectedPlan === plan.id
                      ? "bg-purple-500 border-purple-500"
                      : "border-gray-500"
                  }`}
                />
                <div>
                  <p className="text-white font-semibold">{plan.name}</p>
                  <p className="text-gray-400 text-sm">
                    Access to {plan.maxProgramsAllowed} program
                    {plan.maxProgramsAllowed > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <p className="text-white font-bold">${plan.price} / Month</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleNextStep}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold w-full md:w-auto"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
};

export default Plan;
