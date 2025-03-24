import React, { useState, useEffect } from "react";


// import React, { useState, useEffect } from "react";

// const MembershipPlans = () => {
//   const [plans, setPlans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   useEffect(() => {
//     // Fetching data from backend (replace with actual API URL)
//     fetch("/api/membership-plans")
//       .then((response) => response.json())
//       .then((data) => {
//         setPlans(data);
//         setSelectedPlan(data[0]?.id); // Default selection
//       })
//       .catch((error) => console.error("Error fetching plans:", error));
//   }, []);




const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "One Year Plan",
        description: "No Term, plus free access card. $39 joining fee included, 1-month guest pass, and free 2 PT classes. Free access to all equipment and the swimming pool.",
        price: 299,
        duration: "Year"
      },
      {
        id: 2,
        name: "One Month Plan",
        description: "Access to all gym facilities for one month.",
        price: 29,
        duration: "Month"
      },
      {
        id: 3,
        name: "One Week Plan",
        description: "Access to all gym facilities for one week.",
        price: 15,
        duration: "Week"
      }
    ];
    
    setPlans(mockData);
    setSelectedPlan(mockData[0]?.id);
  }, []);

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
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-4 h-4 rounded-full border ${
                    selectedPlan === plan.id ? "bg-purple-500 border-purple-500" : "border-gray-500"
                  }`}
                />
                <div>
                  <p className="text-white font-semibold">{plan.name}</p>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
              </div>
              <p className="text-white font-bold">${plan.price} / {plan.duration}</p>
            </div>
          ))}
        </div>
        <button
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold w-full md:w-auto"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
};

export default Plan;