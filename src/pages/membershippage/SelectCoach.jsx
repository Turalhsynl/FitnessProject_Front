import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div className="bg-black text-white min-h-screen p-8 mt-20">
      <h2 className="text-3xl font-bold italic mb-4">Select a Coach</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedCoachId === coach.id ? "border-purple-500" : "border-gray-700"
            }`}
            onClick={() => setSelectedCoachId(coach.id)}
          >
            <p className="font-semibold text-white">{coach.firstname} {coach.lastname}</p>
            <p className="text-gray-400 text-sm">Email: {coach.email}</p>
          </div>
        ))}
      </div>

      {selectedCoachId && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Coach’s Programs</h3>
          <div className="space-y-4">
            {programs.map((program) => (
              <div
                key={program.id}
                onClick={() => toggleProgramSelection(program.id)}
                className={`p-4 bg-gray-900 rounded-lg border cursor-pointer ${
                  selectedPrograms.includes(program.id)
                    ? "border-green-500"
                    : "border-gray-700"
                }`}
              >
                <p className="text-lg font-semibold">{program.name}</p>
                <p className="text-gray-400 text-sm">{program.description}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectCoach;
