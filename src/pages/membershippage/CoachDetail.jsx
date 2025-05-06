

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { FaFacebookF, FaPinterest, FaTwitter, FaInstagram, FaArrowRight } from "react-icons/fa";
// import { ArrowRight } from "lucide-react";
// const CoachDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [coach, setCoach] = useState(null);
//   const accessToken = Cookies.get("accessToken");

//   useEffect(() => {
//     const fetchCoach = async () => {
//       try {
//         const res = await fetch("https://localhost:7298/api/User/GetAll", {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         const data = await res.json();
//         const selected = data.find((u) => u.id === parseInt(id));
//         setCoach(selected);
//       } catch (err) {
//         console.error("Coach getirme hatası", err);
//       }
//     };

//     fetchCoach();
//   }, [id]);

//   if (!coach) return <div className="text-white text-center py-20">Yükleniyor...</div>;

//   return (
//     <div className="bg-[#0d0d0d] min-h-screen text-white flex flex-col items-center justify-between px-6 py-16">

//       <div className="max-w-6xl w-full bg-transparent flex flex-col md:flex-row items-center relative">

//         <div className="w-full md:w-1/2 relative z-10">
//           <img
//             src="https://max-themes.net/demos/gym/gym/gym/upload/iStock-1149242325-1-600x800.jpg"
//             alt="coach"
//             className="w-full rounded-lg shadow-lg"
//           />
//         </div>


//         <div className="w-full md:w-1/2 text-left px-6 md:pl-12 relative z-10">
//           <p className="italic text-gray-300 text-xl mb-2">Your Trainer</p>

//           <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-0">
//             <span className="text-white block">{coach.firstname.toUpperCase()}</span>
//             <span className="text-[#4c00ff] block">{coach.lastname.toUpperCase()}</span>
//           </h1>

//           <p className="mt-6 text-gray-300 text-sm md:text-base max-w-md">
//             My passion and desire to explore the capabilities of the human body continue to evolve as I learn more and more.
//           </p>

//           <button
//             onClick={() => navigate("/select-program", { state: { coachId: coach.id } })}
//             className="mt-6 flex items-center gap-2 bg-[#4c00ff] cursor-pointer text-white px-6 py-3 -skew-x-12   font-medium transition-all"
//           >
//             Join me! <FaArrowRight />
//           </button>


//           <h2 className="absolute text-[110px] font-black opacity-5 left-6 bottom-0 pointer-events-none hidden md:block">
//             {coach.firstname.toUpperCase()} {coach.lastname.toUpperCase()}
//           </h2>
//         </div>
//       </div>


//       <div className="mt-16 flex flex-col items-center">
//         <div className="flex gap-8 text-2xl text-white">
//           <FaFacebookF />
//           <FaPinterest />
//           <FaTwitter />
//           <FaInstagram />
//         </div>
//         <div className="w-48 h-[3px] bg-purple-600 mt-4 rounded-full"></div>
//       </div>
//     </div>
//   );
// };

// export default CoachDetail;





// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import {
//   FaFacebookF,
//   FaPinterest,
//   FaTwitter,
//   FaInstagram,
//   FaArrowRight,
// } from "react-icons/fa";
// import { ArrowRight } from "lucide-react";

// const CoachDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [coach, setCoach] = useState(null);
//   const [programs, setPrograms] = useState([]);
//   const accessToken = Cookies.get("accessToken");

//   useEffect(() => {
//     const fetchCoach = async () => {
//       try {
//         const res = await fetch("https://localhost:7298/api/User/GetAll", {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         const data = await res.json();
//         const selected = data.find((u) => u.id === parseInt(id));
//         setCoach(selected);
//       } catch (err) {
//         console.error("Coach getirme hatası", err);
//       }
//     };

//     fetchCoach();
//   }, [id]);

//   useEffect(() => {
//     const fetchPrograms = async () => {
//       if (!id) return;
//       try {
//         const response = await fetch(
//           `https://localhost:7298/api/FitnessProgram/GetMyFitnessPrograms/${id}`,
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );
//         const result = await response.json();
//         setPrograms(result.data || []);
//       } catch (error) {
//         console.error("Failed to fetch programs", error);
//       }
//     };

//     fetchPrograms();
//   }, [id]);

//   if (!coach) return <div className="text-white text-center py-20">Yükleniyor...</div>;

//   return (
//     <div className="bg-[#0d0d0d] min-h-screen text-white px-6 py-16">

//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center relative">

//         <div className="w-full md:w-1/2">
//           <img
//             src="https://max-themes.net/demos/gym/gym/gym/upload/iStock-1149242325-1-600x800.jpg"
//             alt="coach"
//             className="w-full rounded-lg shadow-lg"
//           />
//         </div>


//         <div className="w-full md:w-1/2 px-6 md:pl-12">
//           <p className="italic text-gray-300 text-xl mb-2">Your Trainer</p>
//           <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-0">
//             <span>{coach.firstname.toUpperCase()}</span>
//             <span className="text-[#4c00ff] block">{coach.lastname.toUpperCase()}</span>
//           </h1>
//           <p className="mt-6 text-gray-300 max-w-md">
//             My passion and desire to explore the capabilities of the human body continue to evolve as I learn more and more.
//           </p>
//           <button
//             onClick={() => navigate("/select-program", { state: { coachId: coach.id } })}
//             className="mt-6 flex items-center gap-2 bg-[#4c00ff] px-6 py-3 -skew-x-12 font-medium"
//           >
//             Join me! <FaArrowRight />
//           </button>
//           <h2 className="absolute text-[110px] font-black opacity-5 left-6 bottom-0 pointer-events-none hidden md:block">
//             {coach.firstname.toUpperCase()} {coach.lastname.toUpperCase()}
//           </h2>
//         </div>
//       </div>

//       <div className="mt-20 flex flex-col items-center">
//         <div className="flex gap-8 text-2xl text-white">
//           <FaFacebookF />
//           <FaPinterest />
//           <FaTwitter />
//           <FaInstagram />
//         </div>
//         <div className="w-48 h-[3px] bg-purple-600 mt-4 rounded-full"></div>
//       </div>

//       <div className="max-w-6xl mx-auto mt-24 text-center">
//         <p className="uppercase text-purple-500 tracking-widest text-sm">—</p>
//         <h2 className="text-6xl font-extrabold italic -skew-x-12 mb-12">THE <br /> CLASSES</h2>
        
//         <div className="flex flex-col md:flex-row justify-center gap-6">
//           {programs.map((program) => (
//             <div
//               key={program.id}
//               className="relative w-full md:w-[300px] h-[400px] bg-cover bg-center rounded-lg overflow-hidden"
//               style={{
//                 backgroundImage: `linear-gradient(to top, rgba(76, 0, 255, 0.7), rgba(76, 0, 255, 0.7)), url('${ "https://max-themes.net/demos/gym/gym/gym/upload/iStock-1149242325-1-600x800.jpg"}')`,
//               }}
//             >
//               <div className="flex items-center justify-center h-full">
//                 <h3 className="text-2xl font-bold italic text-white">{program.name}</h3>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-12">
//           <button
//             onClick={() => navigate("/all-classes")}
//             className="bg-[#4c00ff] text-white px-8 py-3 font-semibold flex items-center gap-2"
//           >
//             All Classes <ArrowRight />
//           </button>
//         </div>
//       </div>

//       {/* <div className="mt-20 flex flex-col items-center">
//         <div className="flex gap-8 text-2xl text-white">
//           <FaFacebookF />
//           <FaPinterest />
//           <FaTwitter />
//           <FaInstagram />
//         </div>
//         <div className="w-48 h-[3px] bg-purple-600 mt-4 rounded-full"></div>
//       </div> */}
//     </div>
//   );
// };

// export default CoachDetail;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaFacebookF, FaPinterest, FaTwitter, FaInstagram, FaArrowRight } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const CoachDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coach, setCoach] = useState(null);
  const [programs, setPrograms] = useState([]);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const res = await fetch("https://localhost:7298/api/User/GetAll", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        const selected = data.find((u) => u.id === parseInt(id));
        setCoach(selected);
      } catch (err) {
        console.error("Coach getirme hatası", err);
      }
    };

    fetchCoach();
  }, [id]);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (!id) return;
      try {
        const response = await fetch(`https://localhost:7298/api/FitnessProgram/GetMyFitnessPrograms/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const result = await response.json();
        setPrograms(result.data || []);
      } catch (error) {
        console.error("Failed to fetch programs", error);
      }
    };

    fetchPrograms();
  }, [id]);

  if (!coach) return <div className="text-white text-center py-20">Yükleniyor...</div>;

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white flex flex-col items-center px-6 py-16">
      <div className="max-w-6xl w-full bg-transparent flex flex-col md:flex-row items-center relative">
        <div className="w-full md:w-1/2 relative z-10">
          <img
            src="https://max-themes.net/demos/gym/gym/gym/upload/iStock-1149242325-1-600x800.jpg"
            alt="coach"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full md:w-1/2 text-left px-6 md:pl-12 relative z-10">
          <p className="italic text-gray-300 text-xl mb-2">Your Trainer</p>
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-0">
            <span className="text-white block">{coach.firstname.toUpperCase()}</span>
            <span className="text-[#4c00ff] block">{coach.lastname.toUpperCase()}</span>
          </h1>
          <p className="mt-6 text-gray-300 text-sm md:text-base max-w-md">
            My passion and desire to explore the capabilities of the human body continue to evolve as I learn more and more.
          </p>
          <button
            onClick={() => navigate("/select-program", { state: { coachId: coach.id } })}
            className="mt-6 flex items-center gap-2 bg-[#4c00ff] cursor-pointer text-white px-6 py-3 -skew-x-12 font-medium transition-all"
          >
            Join me! <FaArrowRight />
          </button>
          <h2 className="absolute text-[110px] font-black opacity-5 left-6 bottom-0 pointer-events-none hidden md:block">
            {coach.firstname.toUpperCase()} {coach.lastname.toUpperCase()}
          </h2>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <div className="flex gap-8 text-2xl text-white">
          <FaFacebookF />
          <FaPinterest />
          <FaTwitter />
          <FaInstagram />
        </div>
        <div className="w-48 h-[3px] bg-purple-600 mt-4 rounded-full"></div>
      </div>
      <div className="max-w-6xl w-full mt-24">
        <div className="text-left mb-12">
          <p className="uppercase text-purple-500 tracking-widest text-sm">—</p>
          <h2 className="text-6xl font-extrabold italic -skew-x-12">THE <br /> CLASSES</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="relative w-full md:w-[300px] h-[400px] bg-cover bg-center rounded-lg overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(76, 0, 255, 0.7), rgba(76, 0, 255, 0.7)), url('https://max-themes.net/demos/gym/gym/gym/upload/iStock-1149242325-1-600x800.jpg')`,
              }}
            >
              <div className="flex items-center justify-center h-full">
                <h3 className="text-2xl font-bold italic text-white">{program.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate("/all-classes")}
            className="bg-[#4c00ff] text-white px-8 py-3 font-semibold flex items-center gap-2"
          >
            All Classes <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachDetail;
