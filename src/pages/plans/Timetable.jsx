
import React, { useState, useEffect } from "react";
const Timetable = ({ plan }) => {
  const parsePlan = (text) => {
    const days = ["Bazar ertəsi", "Çərşənbə", "Cümə"];
    const lines = text.split("\n").map(line => line.trim()).filter(Boolean);
    const timetable = {};

    let currentDay = "";
    for (let line of lines) {
      if (days.includes(line.replace("**", "").replace("**", ""))) {
        currentDay = line.replace("**", "").replace("**", "");
        timetable[currentDay] = [];
      } else if (currentDay && line) {
        timetable[currentDay].push(line);
      }
    }

    return timetable;
  };

  const timetable = parsePlan(plan);

  const hours = [
    "08:00", "15:00", "10:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
  ];
  const days = ["Bazar ertəsi", "Çərşənbə", "Cümə"];

  return (
    <div className="overflow-x-auto mt-10">
      <div className="grid grid-cols-[80px_repeat(3,1fr)] border border-purple-800">
        {/* Header */}
        <div className="bg-black text-white font-bold p-2">Saat</div>
        {days.map((day) => (
          <div key={day} className="bg-black text-white font-bold p-2 text-center">
            {day}
          </div>
        ))}

        {/* Rows */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="bg-black text-white p-2">{hour}</div>
            {days.map((day) => {
              const activities = timetable[day] || [];
              const found = activities.find((a) =>
                a.includes(hour)
              );
              return (
                <div key={day + hour} className={`p-2 text-sm text-white ${found ? "bg-purple-600" : "bg-black"}`}>
                  {found || ""}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default Timetable;