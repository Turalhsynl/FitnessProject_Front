import React from "react";
// import timetableImage from "../assets/deadlift.webp";
import timetableImage from "../../../assets/deadlift.webp"
import classesImage from "../../../assets/Core-Workouts-2048x1152.png";
import joinUsImage from "../../../assets/iStock-1149242325.jpg";

const Card = ({ image, text }) => {
  return (
    <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
      <img src={image} alt={text} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">{text}</h2>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 py-10 px-4 sm:px-8">
      <Card image={timetableImage} text="Timetable" />
      <Card image={classesImage} text="Classes" />
      <Card image={joinUsImage} text="Join Us!" />
    </div>
  );
};

export default Services;