// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { useLocation, useNavigate } from "react-router-dom";

// const SelectCoach = () => {
//   const [coaches, setCoaches] = useState([]);
//   const [selectedCoachId, setSelectedCoachId] = useState(null);
//   const [programs, setPrograms] = useState([]);
//   const [selectedPrograms, setSelectedPrograms] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { maxProgramsAllowed, selectedPlanId } = location.state || {};
//   const [allowedProgramsCount, setAllowedProgramsCount] = useState(maxProgramsAllowed || 1);
//   const accessToken = Cookies.get("accessToken");

//   useEffect(() => {
//     const fetchCoaches = async () => {
//       try {
//         const response = await fetch("https://localhost:7298/api/User/GetAll", {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         const result = await response.json();
//         const coachList = result.filter(user => user.userRole === 4) || [];
//         setCoaches(coachList);
//       } catch (error) {
//         console.error("Failed to fetch coaches", error);
//       }
//     };

//     fetchCoaches();
//   }, []);

//   useEffect(() => {
//     const fetchPrograms = async () => {
//       if (!selectedCoachId) return;
//       try {
//         const response = await fetch(`https://localhost:7298/api/FitnessProgram/GetMyFitnessPrograms/${selectedCoachId}`, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         const result = await response.json();
//         setPrograms(result.data || []);
//       } catch (error) {
//         console.error("Failed to fetch programs", error);
//       }
//     };

//     fetchPrograms();
//   }, [selectedCoachId]);

//   const toggleProgramSelection = (programId) => {
//     if (selectedPrograms.includes(programId)) {
//       setSelectedPrograms(prev => prev.filter(id => id !== programId));
//     } else {
//       if (selectedPrograms.length < allowedProgramsCount) {
//         setSelectedPrograms(prev => [...prev, programId]);
//       } else {
//         alert(`Siz maksimum ${allowedProgramsCount} proqram seçə bilərsiniz`);
//       }
//     }
//   };

//   const handleNext = () => {
//     if (selectedPrograms.length === 0) {
//       alert("Ən azı bir proqram seçin.");
//       return;
//     }
//     navigate("/checkout", { state: { selectedPrograms } });
//   };

//   return (
//     <div>
//       <h2>Meet Our Trainers</h2>
//       <div>
//         {coaches.map((coach) => (
//           <div key={coach.id} onClick={() => setSelectedCoachId(coach.id)}>
//             <img
//               src="https://max-themes.net/demos/gym/gym/gym/upload/iStock-1149242325-1-600x800.jpg"
//               alt={coach.firstname}
//             />
//             <div>
//               <p>{coach.firstname} {coach.lastname}</p>
//               <p>Senior Trainer & Instructor</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedCoachId && (
//         <div>
//           <h3>Coach’s Programs</h3>
//           <div>
//             {programs.map((program) => (
//               <div
//                 key={program.id}
//                 onClick={() => toggleProgramSelection(program.id)}
//               >
//                 <p>{program.name}</p>
//                 <p>{program.description}</p>
//               </div>
//             ))}
//           </div>
//           <button onClick={handleNext}>
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectCoach;

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaVimeoV } from "react-icons/fa";

const SelectCoach = () => {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoachId, setSelectedCoachId] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { maxProgramsAllowed, selectedPlanId } = location.state || {};
  const [allowedProgramsCount, setAllowedProgramsCount] = useState(maxProgramsAllowed || 1);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch("https://localhost:7298/api/User/GetAll", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const result = await response.json();
        const coachList = result.filter(user => user.userRole === 4) || [];
        setCoaches(coachList);
      } catch (error) {
        console.error("Failed to fetch coaches", error);
      }
    };

    fetchCoaches();
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (!selectedCoachId) return;
      try {
        const response = await fetch(`https://localhost:7298/api/FitnessProgram/GetMyFitnessPrograms/${selectedCoachId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const result = await response.json();
        setPrograms(result.data || []);
      } catch (error) {
        console.error("Failed to fetch programs", error);
      }
    };

    fetchPrograms();
  }, [selectedCoachId]);

  const toggleProgramSelection = (programId) => {
    if (selectedPrograms.includes(programId)) {
      setSelectedPrograms(prev => prev.filter(id => id !== programId));
    } else {
      if (selectedPrograms.length < allowedProgramsCount) {
        setSelectedPrograms(prev => [...prev, programId]);
      } else {
        alert(`Siz maksimum ${allowedProgramsCount} proqram seçə bilərsiniz`);
      }
    }
  };

  const handleNext = () => {
    if (selectedPrograms.length === 0) {
      alert("Ən azı bir proqram seçin.");
      return;
    }
    navigate("/checkout", { state: { selectedPrograms } });
  };

  return (
    <div className="bg-black min-h-screen px-6 py-12 text-white">
      <h2 className="text-3xl font-bold text-center mb-10">Meet Our Trainers</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="relative w-[300px] h-[400px] cursor-pointer group"
            onClick={() => navigate(`/coach/${coach.id}`)}

          >
            <div className="w-full h-full overflow-hidden  shadow-lg relative">
              <img
                src="https://max-themes.net/demos/gym/gym/gym/upload/iStock-1149242325-1-600x800.jpg"
                alt={`${coach.firstname} ${coach.lastname}`}
                className="w-full h-full object-cover "
              />
              <div className="absolute inset-0 bg-purple-700/70 bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <div className="flex flex-col items-center space-y-4 text-white text-xl">
                  <FaFacebookF />
                  <FaTwitter />
                  <FaVimeoV />
                </div>
              </div>
            </div>
            <div className="mt-4 text-left pl-2">
              <p className="text-white font-bold uppercase text-lg">
                {coach.firstname} {coach.lastname}
              </p>
              <p className="text-gray-400 text-sm mt-1">Senior Trainer & Instructor</p>
              <div className="h-1 w-6 bg-purple-600 mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCoach;
