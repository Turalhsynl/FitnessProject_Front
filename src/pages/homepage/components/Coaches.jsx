// import React from "react";

// const coaches = [
//   { name: "Ryan Jackson", specialty: "Crossfit" },
//   { name: "Emily Perkins", specialty: "Fitness" },
//   { name: "Austin Ortiz", specialty: "Bodybuilding" },
//   { name: "Samantha Ruiz", specialty: "Yoga" },
// ];

// const Coaches = () => {
//   return (
//     <div className="p-6 text-center">
//       <h2 className="text-3xl text-white font-bold">Meet Our Coaches</h2>
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
//         {coaches.map((coach, index) => (
//           <div key={index} className="p-4 bg-gray-800 rounded text-white">
//             <h3 className="text-xl font-bold text-white">{coach.name}</h3>
//             <p>{coach.specialty}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Coaches;






// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { ArrowRight } from "lucide-react";

// const OurClasses = () => {
//   const classes = [
//     { title: "HIIT", image: "https://max-themes.net/demos/gym/gym/gym/upload/iStock-1149242325-1-600x800.jpg" },
//     { title: "CARDIO", image: "https://max-themes.net/demos/gym/gym/gym/upload/shutterstock_1058059004-600x800.jpg" },
//     { title: "PERSONAL TRAINING", image: "	https://max-themes.net/demos/gym/gym/gym/upload/image-from-rawpixel-id-14141-jpeg-600x800.jpg" },
//   ];

//   return (
//     <section className="relative bg-white py-16 px-4 md:px-20">
//       {/* Background Text */}
//       <h1 className="absolute top-8 left-0 text-[100px] lg:text-[160px] font-extrabold text-gray-200 opacity-20 select-none z-0 leading-none hidden md:block">
//         OUR CLASSES
//       </h1>

//       <div className="relative z-10 text-center md:text-left">
//         <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
//           <div className="w-4 h-1 bg-purple-600 rounded-full" />
//           <h3 className="text-black font-bold italic text-xl">OUR CLASSES</h3>
//         </div>
//         <p className="text-gray-500 max-w-2xl mx-auto md:mx-0 mb-10">
//           It is imperative that everyone maximises the time they spend exercising to help guarantee optimal results.
//         </p>
//       </div>

//       {/* Slider */}
//       <Swiper
//         spaceBetween={30}
//         slidesPerView={1}
//         breakpoints={{ 768: { slidesPerView: 3 } }}
//         navigation={true}
//         modules={[Navigation]}
//         className="z-10"
//       >
//         {classes.map((cls, index) => (
//           <SwiperSlide key={index} className="group text-center">
//             <img
//               src={cls.image}
//               alt={cls.title}
//               className="h-[400px] w-full object-cover"
//             />
//             <h4 className="mt-4 text-lg font-bold text-black">{cls.title}</h4>
//             <div className="h-1 w-6 mx-auto bg-purple-600 mt-2 rounded-full" />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Button */}
//       <div className="flex justify-center mt-10">
//       <button className="mt-6 flex items-center gap-2 bg-[#4c00ff] hover:bg-purple-700 text-white px-6 py-3 -skew-x-12   font-medium transition-all">
//           All Classes <ArrowRight size={20} />
//         </button>
//       </div>
//     </section>
//   );
// };

// export default OurClasses;



import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowRight } from "lucide-react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const OurClasses = () => {
  const [programs, setPrograms] = useState([]);
  const [programImages, setProgramImages] = useState({});
   const accessToken = Cookies.get("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("https://localhost:7298/api/FitnessProgram/GetAll", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setPrograms(data);

        // Fetch each program image
        data.forEach((program) => {
          if (program.imageId) {
            fetchProgramImage(program.imageId, program.id);
          }
        });
      } catch (err) {
        console.error("Program fetch error:", err);
      }
    };

    fetchPrograms();
  }, [accessToken]);

  const fetchProgramImage = async (imageId, programId) => {
    try {
      const res = await fetch(`https://localhost:7298/api/File/${imageId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      setProgramImages((prev) => ({ ...prev, [programId]: data.url }));
    } catch (err) {
      console.error(`Program image fetch error for program ${programId}`, err);
    }
  };

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
        {programs.map((program) => (
          <SwiperSlide key={program.id} className="group text-center">
            <img
              src={programImages[program.id] || "https://via.placeholder.com/600x800?text=Loading..."}
              alt={program.title}
              className="h-[400px] w-full object-cover"
            />
            <h4 className="mt-4 text-lg font-bold text-black">{program.title}</h4>
            <div className="h-1 w-6 mx-auto bg-purple-600 mt-2 rounded-full" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <button className="mt-6 flex items-center gap-2 bg-[#4c00ff] hover:bg-purple-700 text-white px-6 py-3 -skew-x-12 font-medium transition-all">
          All Classes <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default OurClasses;
