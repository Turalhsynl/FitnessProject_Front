import React, { useState } from "react";

export default function Gender() {
  const [selected, setSelected] = useState(null);

  const genders = [
    { label: "Female", icon: "🙋‍♀️", value: "female" },
    { label: "Male", icon: "🙋‍♂️", value: "male" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f4ff] flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-semibold mb-8 text-purple-900">Select your sex</h2>
      <div className="space-y-4 w-full max-w-sm">
        {genders.map((g) => (
          <div
            key={g.value}
            className={`flex items-center justify-between border-2 rounded-2xl px-5 py-4 text-lg font-medium cursor-pointer ${
              selected === g.value
                ? "bg-purple-200 border-purple-600 text-purple-900"
                : "bg-white border-gray-300 text-gray-800"
            }`}
            onClick={() => setSelected(g.value)}
          >
            <span>
              {g.icon} {g.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}