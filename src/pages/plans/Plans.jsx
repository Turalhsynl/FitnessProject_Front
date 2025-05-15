

import React from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    title: "Yoga",
    description:
      "Improve physical and mental health with light and gentle workouts",
    color: "bg-[#946FFF]",
    buttonText: "Start Yoga Plan",
    route: "/plans/age",
    image: "https://harnafit.com/_next/static/media/card_yoga.eb361589.png",
  },
  {
    title: "Pilates",
    description:
      "Strengthen your core and sculpt lean muscles — all at your own pace",
    color: "bg-[#DF668B]",
    buttonText: "Start Pilates Plan",
    route: "/plans/pilates",
    image: "https://harnafit.com/_next/static/media/card_pilates.e2a7c401.png",
  },
  {
    title: "Walking",
    description:
      "Build muscle strength and endurance with joint-friendly exercises",
    color: "bg-[#829dfd]",
    buttonText: "Start Walking Plan",
    route: "/plans/walking",
    image: "https://harnafit.com/_next/static/media/card_walking.8a67d4db.png",
  },
  {
    title: "Cardio",
    description:
      "Lose weight and increase energy levels with a variety of exercises",
    color: "bg-[#C459BE]",
    buttonText: "Start Cardio Plan",
    route: "/plans/cardio",
    image: "https://harnafit.com/_next/static/media/card_cardio.9106072d.png",
  },
];

export default function WorkoutPlans() {
  const navigate = useNavigate();

  return (
    <div className="grid  mt-[80px] grid-cols-1 sm:grid-cols-2 gap-6 p-6 max-w-[1080px] mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.title}
          className="relative rounded-[60px] mb-[50px] overflow-visible w-[493px] h-[580px] text-white text-center"
          style={{
            backgroundImage: `url(${plan.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Title Badge */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
            <div
              className={`text-white text-[40px] font-semibold px-5 py-1 w-[186px] h-[76px] rounded-[16px] ${plan.color}`}
            >
              {plan.title}
            </div>
          </div>

          {/* Content */}
          <div className="absolute bottom-6 w-full px-6 z-10">
            <p className="text-[#3a2d5f] text-[28px] mb-4 ml-4 drop-shadow-md text-left">
              {plan.description}
            </p>
            <button
              onClick={() => navigate(plan.route)}
              className="w-[445px] cursor-pointer h-[80px] bg-white text-[#3a2d5f] text-[28px] font-semibold  rounded-full hover:bg-gray-100 transition shadow"
            >
              {plan.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}