import React from "react";
import download from "../../../assets/Photos/download.png"

const Hero = () => {
  return (
    <div
      className="relative  bg-black text-white h-screen flex  bg-cover items-center justify-center bg-no-repeat bg-center bg-black/60 bg-blend-overlay"
      style={{ backgroundImage: `url(${download})` }}
    >
      <div className="z-0 text-center">
        <h1 className="text-5xl font-bold uppercase">No Pain. No Gain</h1>
        <p className="bg-[#5E3AD4] text-white px-4 py-2 inline-block mt-4">Perfect & Fit Body</p>
      </div>
    </div>
  );
};

export default Hero;
