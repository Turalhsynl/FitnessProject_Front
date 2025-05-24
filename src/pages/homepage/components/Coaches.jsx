import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowRight } from "lucide-react";

const OurClasses = () => {
  const classes = [
    { title: "HIIT", image: "https://max-themes.net/demos/gym/gym/gym/upload/iStock-1149242325-1-600x800.jpg" },
    { title: "CARDIO", image: "https://max-themes.net/demos/gym/gym/gym/upload/shutterstock_1058059004-600x800.jpg" },
    { title: "PERSONAL TRAINING", image: "	https://max-themes.net/demos/gym/gym/gym/upload/image-from-rawpixel-id-14141-jpeg-600x800.jpg" },
  ];

  return (
    <section className="relative bg-white py-16 px-4 md:px-20">
      {/* Background Text */}
      <h1 className="absolute top-8 left-0 text-[100px] lg:text-[160px] font-extrabold text-gray-200 opacity-20 select-none z-0 leading-none hidden md:block">
        OUR CLASSES
      </h1>

      <div className="relative z-10 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
          <div className="w-4 h-1 bg-purple-600 rounded-full" />
          <h3 className="text-black font-bold italic text-xl">OUR CLASSES</h3>
        </div>
        <p className="text-gray-500 max-w-2xl mx-auto md:mx-0 mb-10">
          It is imperative that everyone maximises the time they spend exercising to help guarantee optimal results.
        </p>
      </div>

      {/* Slider */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 3 } }}
        navigation={true}
        modules={[Navigation]}
        className="z-10"
      >
        {classes.map((cls, index) => (
          <SwiperSlide key={index} className="group text-center">
            <img
              src={cls.image}
              alt={cls.title}
              className="h-[400px] w-full object-cover"
            />
            <h4 className="mt-4 text-lg font-bold text-black">{cls.title}</h4>
            <div className="h-1 w-6 mx-auto bg-purple-600 mt-2 rounded-full" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Button */}
      <div className="flex justify-center mt-10">
      <button className="mt-6 flex items-center gap-2 bg-[#4c00ff] hover:bg-purple-700 text-white px-6 py-3 -skew-x-12   font-medium transition-all">
          All Classes <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default OurClasses;