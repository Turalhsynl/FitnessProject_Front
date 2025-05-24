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

// import React, { useState, useEffect } from "react";
// import { useWorkout } from "../plans/WorkoutContext";

// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// const hours = Array.from({ length: 13 }, (_, i) => {
//   const hour = 8 + i;
//   return `${hour.toString().padStart(2, "0")}:00`;
// });

// // AI cavabındakı strukturu parse edən funksiya (':'-dən təmizlənmiş gün adları ilə)
// function parseAIContent(content) {
//   const weeks = {};
//   const weekRegex = /#### (\d+)\.? Həftə:[\s\S]*?(?=####|\Z)/g;
//   // Gün adlarından sonundakı ':' silinir, '\n' ilə bitir
//   const dayRegex = /- \*\*(.*?)\*\*:\n([\s\S]*?)(?=\n- \*\*|$)/g;

//   let weekMatch;
//   while ((weekMatch = weekRegex.exec(content)) !== null) {
//     const weekTitle = `Həftə ${weekMatch[1]}`;
//     const weekContent = weekMatch[0];
//     weeks[weekTitle] = {};

//     let dayMatch;
//     while ((dayMatch = dayRegex.exec(weekContent)) !== null) {
//       let dayName = dayMatch[1].trim(); // misal: "Bazar ertəsi"
//       // Təhlükəsizlik üçün ':' varsa kəs
//       if (dayName.endsWith(":")) dayName = dayName.slice(0, -1);

//       const exercises = dayMatch[2]
//         .split("\n")
//         .map((e) => e.replace(/^[-•*]\s*/, "").trim())
//         .filter(Boolean);

//       weeks[weekTitle][dayName] = exercises;
//     }
//   }

//   return weeks;
// }

// // Azərbaycan gün adlarını ingiliscəyə map edən funksiya
// const dayMap = {
//   "Bazar ertəsi": "Monday",
//   "Çərşənbə axşamı": "Tuesday",
//   "Çərşənbə": "Wednesday",
//   "Cümə axşamı": "Thursday",
//   "Cümə": "Friday",
//   "Şənbə": "Saturday",
//   "Bazar": "Sunday",
// };

// function getDayData(parsedData) {
//   const mapped = {};

//   Object.entries(parsedData).forEach(([week, days]) => {
//     Object.entries(days).forEach(([dayName, exercises]) => {
//       // dayName starts with azərbaycan dili gün adı olmalıdır
//       const dayKey = Object.keys(dayMap).find((azDay) => dayName.startsWith(azDay));
//       if (dayKey) {
//         const enDay = dayMap[dayKey];
//         mapped[enDay] = { week, day: dayName, exercises };
//       }
//     });
//   });

//   // Bütün ingilis günlərini yoxla, yoxdursa null qoy
//   days.forEach((dayName) => {
//     if (!mapped[dayName]) mapped[dayName] = null;
//   });

//   return mapped;
// }

// export default function SubmitPlan() {
//   const { formData } = useWorkout();
//   const [result, setResult] = useState("");
//   const [structuredData, setStructuredData] = useState({});

//   const handleSubmit = async () => {
//     console.log(formData);

//     try {
//       const response = await fetch("https://localhost:7298/api/WorkoutPlan/generate-workout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: parseInt(formData.userId),
//           fitnessCategory: formData.fitnessCategory || "Yoga",
//           age: parseInt(formData.age),
//           gender: formData.gender,
//           goal: formData.goals?.[0] || "Arıqlamaq",
//           level: formData.level || "Başlanğıc",
//           daysPerWeek: formData.daysPerWeek?.join(", ") || "Monday, Wednesday, Friday",
//           bodyType: formData.bodyType || "Normal",
//           dreamBody: formData.bodyGoal || "Əzələli",
//           targetZone: formData.targetZones?.[0] || "Bütün bədən",
//           sleepTime: formData.sleep || "6-8 saat",
//           height: parseFloat(formData.height),
//           weight: parseFloat(formData.weight),
//         }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("API Error:", errorText);
//         return;
//       }

//       const data = await response.json();
//       console.log("Raw AI content:", data.content);
//       setResult(data.content);

//       const parsed = parseAIContent(data.content);
//       console.log("Parsed AI content:", parsed);

//       const dayData = getDayData(parsed);
//       console.log("Mapped day data:", dayData);

//       setStructuredData(dayData);
//     } catch (error) {
//       console.error("Əlaqə xətası:", error);
//     }
//   };

//   useEffect(() => {
//     handleSubmit();
//   }, []);

//   useEffect(() => {
//     console.log("Structured:", structuredData);
//   }, [structuredData]);

//   return (
//     <div className="max-w-6xl mx-auto p-6 mt-20">
//       <h1 className="text-3xl font-bold text-purple-800 text-center">Planı Yarat</h1>

//       {!result ? (
//         <p className="mt-8 text-purple-600 text-center">Plan hazırlanır...</p>
//       ) : (
//         <div className="overflow-x-auto mt-10">
//           <div className="grid grid-cols-8 border border-gray-300">
//             {/* Header */}
//             <div className="bg-gray-200 p-2 font-semibold text-center border border-gray-300">Saat</div>
//             {days.map((day) => (
//               <div
//                 key={day}
//                 className="bg-gray-200 p-2 font-semibold text-center border border-gray-300"
//               >
//                 {day}
//               </div>
//             ))}

//             {/* Rows */}
//             {hours.map((hour, rowIdx) => (
//               <React.Fragment key={hour}>
//                 <div className="p-2 text-sm text-center border border-gray-200">{hour}</div>
//                 {days.map((day) => {
//                   const data = structuredData?.[day];
//                   const item = data?.exercises?.[rowIdx];
//                   return (
//                     <div key={`${day}-${hour}`} className="p-2 text-xs border border-gray-100">
//                       {item || ""}
//                     </div>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { useWorkout } from "../plans/WorkoutContext";

// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// const hours = Array.from({ length: 13 }, (_, i) => {
//   const hour = 8 + i;
//   return `${hour.toString().padStart(2, "0")}:00`;
// });

// // Azərbaycan gün adlarını ingiliscəyə map edən obyekt
// const dayMap = {
//   "Bazar ertəsi": "Monday",
//   "Çərşənbə axşamı": "Tuesday",
//   "Çərşənbə": "Wednesday",
//   "Cümə axşamı": "Thursday",
//   "Cümə": "Friday",
//   "Şənbə": "Saturday",
//   "Bazar": "Sunday",
// };

// // AI cavabını parse edən funksiya
// function parseAIContent(content) {
//   const weeks = {};
//   const weekRegex = /Həftə (\d+):[\s\S]*?(?=Həftə \d+:|$)/g;
//   const dayRegex = /- \*\*(.*?)\*\*:\n([\s\S]*?)(?=\n- \*\*|$)/g;

//   let weekMatch;
//   while ((weekMatch = weekRegex.exec(content)) !== null) {
//     const weekTitle = `Həftə ${weekMatch[1]}`;
//     const weekContent = weekMatch[0];
//     weeks[weekTitle] = {};

//     let dayMatch;
//     while ((dayMatch = dayRegex.exec(weekContent)) !== null) {
//       let dayName = dayMatch[1].trim();
//       if (dayName.endsWith(":")) {
//         dayName = dayName.slice(0, -1);
//       }

//       const exercises = dayMatch[2]
//         .split("\n")
//         .map((line) => line.replace(/^[-•*]\s*/, "").trim())
//         .filter(Boolean);

//       weeks[weekTitle][dayName] = exercises;
//     }
//   }

//   return weeks;
// }

// // Günü map edən funksiya
// function getDayData(parsedData) {
//   const mapped = {};

//   Object.entries(parsedData).forEach(([week, days]) => {
//     Object.entries(days).forEach(([azDay, exercises]) => {
//       const azMatch = Object.keys(dayMap).find((az) => azDay.startsWith(az));
//       if (azMatch) {
//         const enDay = dayMap[azMatch];
//         mapped[enDay] = {
//           week,
//           day: azDay,
//           exercises,
//         };
//       }
//     });
//   });

//   // Bütün günlər üçün null əlavə et (əgər yoxdur)
//   days.forEach((day) => {
//     if (!mapped[day]) mapped[day] = null;
//   });

//   return mapped;
// }

// export default function SubmitPlan() {
//   const { formData } = useWorkout();
//   const [result, setResult] = useState("");
//   const [structuredData, setStructuredData] = useState({});

//   const handleSubmit = async () => {
//     try {
//       console.log("Current Form Data:", formData); 
//       const response = await fetch("https://localhost:7298/api/WorkoutPlan/generate-workout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: parseInt(formData.userId),
//           fitnessCategory: formData.fitnessCategory || "Yoga",
//           age: parseInt(formData.age),
//           gender: formData.gender,
//           goal: formData.goals?.[0] || "Arıqlamaq",
//           level: formData.level || "Başlanğıc",
//           daysPerWeek: formData.daysPerWeek?.join(", ") || "Monday, Wednesday, Friday",
//           bodyType: formData.bodyType || "Normal",
//           dreamBody: formData.bodyGoal || "Əzələli",
//           targetZone: formData.targetZones?.[0] || "Bütün bədən",
//           sleepTime: formData.sleep || "6-8 saat",
//           height: parseFloat(formData.height),
//           weight: parseFloat(formData.weight),
//         }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("API Error:", errorText);
//         return;
//       }

//       const data = await response.json();
//       setResult(data.content);

//       const parsed = parseAIContent(data.content);
//       const dayData = getDayData(parsed);
//       setStructuredData(dayData);
//     } catch (error) {
//       console.error("Əlaqə xətası:", error);
//     }
//   };

//   useEffect(() => {
//     handleSubmit();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-6 mt-20">
//       <h1 className="text-3xl font-bold text-purple-800 text-center">Planı Yarat</h1>

//       {!result ? (
//         <p className="mt-8 text-purple-600 text-center">Plan hazırlanır...</p>
//       ) : (
//         <div className="overflow-x-auto mt-10">
//           <div className="grid grid-cols-8 border border-gray-300">
//             {/* Header */}
//             <div className="bg-gray-200 p-2 font-semibold text-center border border-gray-300">Saat</div>
//             {days.map((day) => (
//               <div key={day} className="bg-gray-200 p-2 font-semibold text-center border border-gray-300">
//                 {day}
//               </div>
//             ))}

//             {/* Rows */}
//             {hours.map((hour, rowIdx) => (
//               <React.Fragment key={hour}>
//                 <div className="p-2 text-sm text-center border border-gray-200">{hour}</div>
//                 {days.map((day) => {
//                   const dayInfo = structuredData[day];
//                   const item = dayInfo?.exercises?.[rowIdx];
//                   return (
//                     <div key={`${day}-${hour}`} className="p-2 text-xs border border-gray-100">
//                       {item || ""}
//                     </div>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
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
        daysPerWeek: formData.daysPerWeek || 3,
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
