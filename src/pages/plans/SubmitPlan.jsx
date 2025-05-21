// import React, { useState } from "react";
// import { useWorkout } from "../context/WorkoutContext";

// export default function SubmitPlan() {
//   const { formData } = useWorkout();
//   const [result, setResult] = useState("");

//   const handleSubmit = async () => {
//     console.log("Current Form Data:", formData); 
//     const response = await fetch("https://localhost:7055/api/WorkoutPlan/generate-workout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: formData.userId, // ✅ BURASI DEĞİŞTİRİLDİ
//         fitnessCategory: formData.fitnessCategory || "Yoga",
//         age: formData.age,
//         // gender: formData.gender,
//         // goal: formData.goal || "Arıqlamaq",
//         // level: formData.level || "Başlanğıc",
//         // daysPerWeek: formData.daysPerWeek || 3,
//         // bodyType: formData.bodyType || "Normal",
//         // dreamBody: formData.dreamBody || "Əzələli",
//         // targetZone: formData.targetZone || "Qarın",
//         // sleepTime: formData.sleepTime || "6-8 saat",
//         // height: formData.height || 170,
//         // weight: formData.weight || 65,
//       }),
//     });

//     const data = await response.json();
//     setResult(data.content);
//   };

//   return (
//     <div className="max-w-[800px] mx-auto p-6 text-center mt-20">
//       <h1 className="text-3xl font-bold text-purple-800">Planı Yarat</h1>
//       <button
//         onClick={handleSubmit}
//         className="mt-8 bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-800"
//       >
//         Məşq Planı Generasiya Et
//       </button>
//       {result && (
//         <div className="mt-10 bg-gray-100 p-6 rounded-lg text-left whitespace-pre-wrap">
//           {result}
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useWorkout } from "../plans/WorkoutContext";

// export default function SubmitPlan() {
//   const { formData } = useWorkout();
//   const [result, setResult] = useState("");

//   const handleSubmit = async () => {
//     console.log("Current Form Data:", formData);
//     const response = await fetch("https://localhost:7298/api/WorkoutPlan/generate-workout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//          userId: formData.userId,
//   fitnessCategory: formData.fitnessCategory,
//   age: formData.age,
//   gender: formData.gender,
//   bodyType: formData.bodyType,
//   goals: formData.goals, 
//   bodyGoal: formData.bodyGoal,
//   level: formData.level,
//   weight: formData.weight,
//   unit: formData.unit,
//   height: formData.height,
//   heightUnit: formData.heightUnit,
//   sleep: formData.sleep,
//   daysPerWeek: formData.daysPerWeek,
//   targetZones: formData.targetZones,
//       }),
//     });

//     const data = await response.json();
//     setResult(data.content);
//   };

//   React.useEffect(() => {
//     handleSubmit(); 
//   }, []);

//   return (
//     <div className="max-w-[800px] mx-auto p-6 text-center mt-20">
//       <h1 className="text-3xl font-bold text-purple-800">Planı Yarat</h1>
//       {result ? (
//         <div className="mt-10 bg-gray-100 p-6 rounded-lg text-left whitespace-pre-wrap">
//           {result}
//         </div>
//       ) : (
//         <p className="mt-8 text-purple-600">Plan hazırlanıyor...</p>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useWorkout } from "../plans/WorkoutContext";

export default function SubmitPlan() {
  const { formData } = useWorkout();
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    console.log("Current Form Data:", formData);

    const response = await fetch("https://localhost:7298/api/WorkoutPlan/generate-workout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: parseInt(formData.userId),
        fitnessCategory: formData.fitnessCategory || "Yoga",
        age: parseInt(formData.age),
        gender: formData.gender,
        goal: formData.goals?.[0] || "Arıqlamaq", // sadece ilkini gönder
        level: formData.level || "Başlanğıc",
        daysPerWeek: formData.daysPerWeek?.[0] || 3,
        bodyType: formData.bodyType || "Normal",
        dreamBody: formData.bodyGoal || "Əzələli",
        targetZone: formData.targetZones?.[0] || "Bütün bədən",
        sleepTime: formData.sleep || "6-8 saat",
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      return;
    }

    const data = await response.json();
    setResult(data.content);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="max-w-[800px] mx-auto p-6 text-center mt-20">
      <h1 className="text-3xl font-bold text-purple-800">Planı Yarat</h1>
      {result ? (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg text-left whitespace-pre-wrap">
          {result}
        </div>
      ) : (
        <p className="mt-8 text-purple-600">Plan hazırlanıyor...</p>
      )}
    </div>
  );
}




// import Timetable from "./Timetable"; // düzgün path ilə dəyişin
// import React, { useState, useEffect } from "react";
// import { useWorkout } from "../plans/WorkoutContext";


// export default function SubmitPlan() {
//   const { formData } = useWorkout();
//   const [result, setResult] = useState("");

//   const handleSubmit = async () => {
//     const response = await fetch("https://localhost:7298/api/WorkoutPlan/generate-workout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: parseInt(formData.userId),
//         fitnessCategory: formData.fitnessCategory || "Yoga",
//         age: parseInt(formData.age),
//         gender: formData.gender,
//         goal: formData.goals?.[0] || "Arıqlamaq",
//         level: formData.level || "Başlanğıc",
//         daysPerWeek: formData.daysPerWeek?.[0] || 3,
//         bodyType: formData.bodyType || "Normal",
//         dreamBody: formData.bodyGoal || "Əzələli",
//         targetZone: formData.targetZones?.[0] || "Bütün bədən",
//         sleepTime: formData.sleep || "6-8 saat",
//         height: parseFloat(formData.height),
//         weight: parseFloat(formData.weight),
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("API Error:", errorText);
//       return;
//     }

//     const data = await response.json();
//     setResult(data.content);
//   };

//   useEffect(() => {
//     handleSubmit();
//   }, []);

//   return (
//     <div className="max-w-[1000px] mx-auto p-6 text-center mt-20">
//       <h1 className="text-3xl font-bold text-purple-800">Planı Yarat</h1>
//       {result ? (
//         <>
//           <Timetable plan={result} />
//         </>
//       ) : (
//         <p className="mt-8 text-purple-600">Plan hazırlanır...</p>
//       )}
//     </div>
//   );
// }
