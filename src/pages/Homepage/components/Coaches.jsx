import React from "react";

const coaches = [
  { name: "Ryan Jackson", specialty: "Crossfit" },
  { name: "Emily Perkins", specialty: "Fitness" },
  { name: "Austin Ortiz", specialty: "Bodybuilding" },
  { name: "Samantha Ruiz", specialty: "Yoga" },
];

const Coaches = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold">Meet Our Coaches</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {coaches.map((coach, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded">
            <h3 className="text-xl font-bold">{coach.name}</h3>
            <p>{coach.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coaches;