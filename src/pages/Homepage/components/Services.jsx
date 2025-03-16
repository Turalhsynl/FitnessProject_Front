import React from "react";
import timetableImage from "../../../assets/Photos/deadlift.webp"
import classesImage from "../../../assets/Photos/Core-Workouts-2048x1152.png"
import joinUsImage from "../../../assets/Photos/iStock-1149242325.jpg"

const Card = ({ image, text }) => {
  return (
    <div className="relative w-full sm:w-[380px] md:w-[450px] lg:w-[500px] h-64 sm:h-80 md:h-96 lg:h-[380px] overflow-hidden transform -skew-x-6 sm:-skew-x-12 shadow-lg transition-all duration-300">
      <img src={image} alt={text} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#4c00ff] opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">{text}</h2>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 py-10   px-4 sm:px-8">
      <Card image={timetableImage} text="Timetable" />
      <Card image={classesImage} text="Classes" />
      <Card image={joinUsImage} text="Join Us!" />
    </div>
  );
};

export default Services;