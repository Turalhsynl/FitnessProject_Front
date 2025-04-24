import React from "react";
import { ArrowRight } from "lucide-react";
// import timetableImage from "../assets/deadlift.webp";
import timetableImage from "../../../assets/deadlift.webp"
import classesImage from "../../../assets/Core-Workouts-2048x1152.png";
import joinUsImage from "../../../assets/iStock-1149242325.jpg";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0">
        <img
          src="https://ihels.ru/storage/material_images/197464/Uprazhneniya-s-kanatom-krossfit1.jpg"
          alt="Gym Background"
          className="w-full h-[1100px] object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-white text-3xl sm:text-5xl font-extrabold leading-tight">
          REACH YOUR GOAL AT{" "}
          <span className="text-purple-500 italic">FIT</span><span className="italic">GYM</span>
        </h1>
        <button className="mt-6 flex items-center gap-2 bg-[#4c00ff] hover:bg-purple-700 text-white px-6 py-3 -skew-x-12   font-medium transition-all">
          View Classes <ArrowRight size={20} />
        </button>
      </div>
      <div className="absolute bottom-[-320px] w-full flex justify-center gap-4 py-6 ">
        <Card image={timetableImage} text="Timetable" />
        <Card image={classesImage} text="Classes" />
        <Card image={joinUsImage} text="Join Us!" />
      </div>
    </div>
  );
};



const Card = ({ image, text }) => {
  return (
    <div className="relative w-[220px] h-40 sm:w-[250px] sm:h-48 lg:w-[380px] lg:h-72 transform -skew-x-12 shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 group">
      <img src={image} alt={text} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#4c00ff] opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white transition-all duration-300 px-4">
        <h2 className=" text-lg mt-[50px] sm:text-xl md:text-2xl font-semibold transition-all duration-300 group-hover:-translate-y-6">
          {text}
        </h2>
        <p className="opacity-0  text-sm sm:text-base transition-opacity duration-300 group-hover:opacity-100 ">
          Explore our advanced fitness programs.
        </p>
        <ArrowRight size={24} className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2" />
      </div>
    </div>
  );
};


export default HeroSection;
