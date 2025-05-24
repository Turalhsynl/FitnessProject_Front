import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { FaFacebookF, FaPinterest, FaTwitter, FaInstagram, FaArrowRight } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const CoachDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = Cookies.get("accessToken");
  const [coachImageUrl, setCoachImageUrl] = useState(null);
const [programImages, setProgramImages] = useState({});

  const [coach, setCoach] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState(() => {
    const saved = localStorage.getItem("selectedPrograms");
    return saved ? JSON.parse(saved) : [];
  });

  const { maxProgramsAllowed, selectedPlanId } = location.state || {};
  const [allowedProgramsCount] = useState(maxProgramsAllowed || 1);

const fetchCoachImage = async (imageId) => {
  try {
    const res = await fetch(`https://localhost:7298/api/File/${imageId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await res.json();
    setCoachImageUrl(data.url);
  } catch (err) {
    console.error("Coach image fetch error", err);
  }
};

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


  useEffect(() => {
    const fetchCoach = async () => {
  try {
    const res = await fetch("https://localhost:7298/api/User/GetAll", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await res.json();
    const selected = data.find((u) => u.id === parseInt(id));
    setCoach(selected);
    if (selected?.profileImageId) {
      fetchCoachImage(selected.profileImageId);
    }
  } catch (err) {
    console.error("Coach fetch error", err);
  }
};


    fetchCoach();
  }, [id]);

  useEffect(() => {
  const fetchPrograms = async () => {
    if (!id) return;
    try {
      const response = await fetch(
        `https://localhost:7298/api/FitnessProgram/GetMyFitnessPrograms/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const result = await response.json();
      const fetchedPrograms = result.data || [];
      setPrograms(fetchedPrograms);

      fetchedPrograms.forEach((program) => {
        if (program.imageId) {
          fetchProgramImage(program.imageId, program.id);
        }
      });
    } catch (error) {
      console.error("Failed to fetch programs", error);
    }
  };

  fetchPrograms();
}, [id]);


  useEffect(() => {
    localStorage.setItem("selectedPrograms", JSON.stringify(selectedPrograms));
  }, [selectedPrograms]);

  const toggleProgramSelection = (programId) => {
    if (selectedPrograms.includes(programId)) {
      setSelectedPrograms((prev) => prev.filter((id) => id !== programId));
    } else {
      if (selectedPrograms.length < allowedProgramsCount) {
        setSelectedPrograms((prev) => [...prev, programId]);
      } else {
        alert(`You can select a maximum of ${allowedProgramsCount} programs`);
      }
    }
  };

  const handleNext = () => {
    if (selectedPrograms.length === 0) {
      alert("Please select at least one program.");
      return;
    }
    navigate("/checkout", { state: { selectedPrograms, selectedPlanId } });
  };

  if (!coach) return <div className="text-white text-center py-20">Loading...</div>;

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white flex flex-col items-center px-6 py-16">
      <div className="max-w-6xl w-full bg-transparent flex flex-col md:flex-row items-center relative">
        <div className="w-full md:w-1/2 relative z-10">
          <img
            src={coachImageUrl}
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
      
    </div>
  );
};

export default CoachDetail;