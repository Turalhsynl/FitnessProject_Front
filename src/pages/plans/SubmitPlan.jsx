

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
        goal: formData.goals?.[0] || "Arıqlamaq", 
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
      <h1 className="text-3xl font-bold text-purple-800">Create Plan</h1>
      {result ? (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg text-left whitespace-pre-wrap">
          {result}
        </div>
      ) : (
        <p className="mt-8 text-purple-600">A plan is being prepared...</p>
      )}
    </div>
  );
}

