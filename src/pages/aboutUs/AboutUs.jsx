import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

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
            {[
              {
                name: "Aysel Həsənova",
                role: "Personal Trainer",
                img: "https://randomuser.me/api/portraits/women/68.jpg",
              },
              {
                name: "Murad Əliyev",
                role: "Nutrition Expert",
                img: "https://randomuser.me/api/portraits/men/75.jpg",
              },
              {
                name: "Leyla Qasımova",
                role: "Yoga Instructor",
                img: "https://randomuser.me/api/portraits/women/65.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
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
