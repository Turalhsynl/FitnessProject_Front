// WorkoutContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fitnessCategory: "",
    age: "",
    gender: "",
    userId: "", // kullanıcı ID'si burada tutulacak
  });

  const updateData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // İlk renderda accessToken varsa decode et ve userId'yi al
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const userId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      if (userId) {
        updateData({ userId });
      }
    }
  }, []);

  return (
    <WorkoutContext.Provider value={{ formData, updateData }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => useContext(WorkoutContext);
