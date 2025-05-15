import React from "react";
import { useNavigate } from "react-router-dom";

const ageGroups = [
  { label: "35-44", image: "https://harnafit.com/_next/image?url=https://s3.harna-app.com/quizes_images/f8ed7f92-75bd-473b-ab96-4781f6b5a0c7.png&w=3840&q=75" },
  { label: "45-54", image: "https://harna-yoga.com/_next/image?url=https://s3.harna-app.com/quizes_images/924bb39b-0659-4055-a65f-c9f6091d5bb4.png&w=3840&q=75" },
  { label: "55-64", image: "https://harna-yoga.com/_next/image?url=https://s3.harna-app.com/quizes_images/c032b021-5509-44ed-94b9-75e2f6ce7f36.png&w=3840&q=75" },
  { label: "65+", image: "https://harnafit.com/_next/image?url=https://s3.harna-app.com/quizes_images/2ee2ebb7-7433-4459-9fa5-5f7b208e02fa.png&w=3840&q=75" },
];

export default function Yoga() {
  const navigate = useNavigate();

  const handleAgeSelect = (age) => {
    // Seçilən yaşı istəyə uyğun context və ya local state-də saxlaya bilərsən
    navigate("/gender");
  };

  return (
    <div className="min-h-screen bg-[#f8f4ff] text-center px-6 py-10">
      <h1 className="text-[70px] font-semibold text-[#3a2d5f]">Chair Yoga</h1>
      <p className="text-[18px] font-semibold  mb-2 text-[#3a2d5f]">Tailored to your age</p>
      <p className="text-sm font-bold text-[#3a2d5f] mb-40">1-MINUTE QUIZ</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-[750px] mx-auto">
        {ageGroups.map((group) => (
          <div
            key={group.label}
            className="bg-[#ddd4f9] w-[162px] h-[160px] rounded-3xl  cursor-pointer  "
            onClick={() => handleAgeSelect(group.label)}
          >
            <img src={group.image} alt={group.label} className="object-cover w-[162px]  h-[198px]" />
            <div className="bg-purple-600 text-white font-semibold py-2 w-[175px] h-[58px] rounded-full">
              {group.label} →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}