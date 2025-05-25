import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const AboutUs = () => {
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const accessToken = Cookies.get("accessToken");
    const decodedToken = jwt_decode(accessToken);
    const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    const fetchImageUrl = async (imageId) => {
      try {
        const response = await fetch(`https://localhost:7298/api/File/${imageId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();
        return data.url;
      } catch (error) {
        console.error("Failed to fetch image", error);
        return null;
      }
    };
  
useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch("https://localhost:7298/api/User/GetAll", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const result = await response.json();
        const coachList = result.filter(user => user.userRole === 4) || [];

        const coachesWithImages = await Promise.all(
          coachList.map(async (coach) => {
            const imageUrl = coach.profileImageId
              ? await fetchImageUrl(coach.profileImageId)
              : null;
            return { ...coach, imageUrl };
          })
        );

        setCoaches(coachesWithImages);
      } catch (error) {
        console.error("Failed to fetch coaches", error);
      }
    };

    fetchCoaches();
  }, [accessToken]);

  return (
    <div className="bg-white text-gray-800 mt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 py-20 text-white text-center">
        <h1 className="text-5xl font-bold italic mb-4">About Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          At FITZONE, we’re committed to transforming lives through fitness, healthy habits, and community support.
        </p>
      </div>

      {/* Mission & Values */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              We aim to empower individuals of all fitness levels to achieve their goals by providing tailored programs, expert guidance, and unwavering motivation.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
              <li>Health & Wellness First</li>
              <li>Inclusivity & Respect</li>
              <li>Progress Over Perfection</li>
              <li>Science-Backed Training</li>
              <li>Building Stronger Communities</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
             <div
             key={index}
             className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
             onClick={() => navigate(`/coach1/${coach.id}`)}
           >
             <img
               src={coach.imageUrl || 'https://via.placeholder.com/150'}
               alt={coach.fullName}
               className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
             />
             <h3 className="text-xl font-semibold">{coach.firstname} {coach.lastname}</h3>
             <p className="text-gray-400 text-sm mt-1">Senior Trainer & Instructor</p>
           </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
        <p className="text-gray-600 mb-6">Join us today and let’s build a healthier future together.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
